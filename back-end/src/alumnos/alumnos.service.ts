import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Alumno } from './schemas/alumno.schema';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { FindAlumnosDto } from './dto/find-alumnos.dto';

@Injectable()
export class AlumnosService {
  constructor(
    @InjectModel(Alumno.name) private readonly alumnoModel: Model<Alumno>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createAlumnoDto: CreateAlumnoDto): Promise<Alumno> {
    const createdAlumno = new this.alumnoModel(createAlumnoDto);
    return createdAlumno.save();
  }

  async findAll(findAlumnosDto: FindAlumnosDto) {
    const cacheKey = `alumnos_${JSON.stringify(findAlumnosDto)}`;
    const cachedData = await this.cacheManager.get(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }

    const { page = 1, limit = 10, search, grado, seccion } = findAlumnosDto;
    const skip = (page - 1) * limit;

    const query = this.alumnoModel.find();

    if (search) {
      query.or([
        { nombreAlumno: { $regex: search, $options: 'i' } },
        { nombrePadre: { $regex: search, $options: 'i' } },
        { nombreMadre: { $regex: search, $options: 'i' } },
      ]);
    }

    if (grado) {
      query.where('grado').equals(grado);
    }

    if (seccion) {
      query.where('seccion').equals(seccion);
    }

    const [alumnos, total] = await Promise.all([
      query.skip(skip).limit(limit).exec(),
      this.alumnoModel.countDocuments(query.getFilter()),
    ]);

    const result = {
      data: alumnos,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };

    await this.cacheManager.set(cacheKey, result);
    return result;
  }

  async findByGrado(grado: number): Promise<Alumno[]> {
    const alumnos = await this.alumnoModel.find({ grado }).exec();
    if (!alumnos.length) {
      throw new NotFoundException(`No se encontraron alumnos en el grado ${grado}`);
    }
    return alumnos;
  }

  async findOne(id: string) {
    const cacheKey = `alumno_${id}`;
    const cachedData = await this.cacheManager.get(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }

    const alumno = await this.alumnoModel.findById(id).exec();
    if (!alumno) {
      throw new NotFoundException(`Alumno con ID ${id} no encontrado`);
    }

    await this.cacheManager.set(cacheKey, alumno);
    return alumno;
  }

  async update(id: string, updateAlumnoDto: UpdateAlumnoDto): Promise<Alumno> {
    const alumnoActualizado = await this.alumnoModel
      .findByIdAndUpdate(id, updateAlumnoDto, { new: true })
      .exec();
    
    if (!alumnoActualizado) {
      throw new NotFoundException(`Alumno con ID ${id} no encontrado`);
    }
    return alumnoActualizado;
  }

  async remove(id: string): Promise<Alumno> {
    const alumnoEliminado = await this.alumnoModel.findByIdAndDelete(id).exec();
    if (!alumnoEliminado) {
      throw new NotFoundException(`Alumno con ID ${id} no encontrado`);
    }
    return alumnoEliminado;
  }
}
