import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { Alumno } from './entities/alumno.entity';

@Injectable()
export class AlumnosService {
  constructor(
    @InjectModel(Alumno.name) private readonly alumnoModel: Model<Alumno>,
  ) {}

  async create(createAlumnoDto: CreateAlumnoDto): Promise<Alumno> {
    const alumno = new this.alumnoModel(createAlumnoDto);
    return await alumno.save();
  }

  async findAll(): Promise<Alumno[]> {
    return await this.alumnoModel.find().exec();
  }

  async findByGrado(grado: number): Promise<Alumno[]> {
    const alumnos = await this.alumnoModel.find({ grado }).exec();
    if (!alumnos.length) {
      throw new NotFoundException(`No se encontraron alumnos en el grado ${grado}`);
    }
    return alumnos;
  }

  async findOne(id: string): Promise<Alumno> {
    const alumno = await this.alumnoModel.findById(id).exec();
    if (!alumno) {
      throw new NotFoundException(`Alumno con ID ${id} no encontrado`);
    }
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
