import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AlumnosService } from './alumnos.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { FindAlumnosDto } from './dto/find-alumnos.dto';
import { ParseMongoIdPipe } from './pipes/parse-mongo-id.pipe';
import { ApiKey } from '../auth/api-key.guard';

@ApiTags('Alumnos')
@ApiBearerAuth('x-api-key')
@Controller('alumnos')
@UseGuards(ApiKey)
export class AlumnosController {
  constructor(private readonly alumnosService: AlumnosService) {}

  @Post('crear-alumno')
  @ApiOperation({ summary: 'Crear un nuevo alumno' })
  @ApiResponse({ status: 201, description: 'Alumno creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createAlumnoDto: CreateAlumnoDto) {
    return this.alumnosService.create(createAlumnoDto);
  }

  @Get('consultar-por-grado/:grado')
  findByGrado(@Param('grado') grado: number) {
    return this.alumnosService.findByGrado(+grado);
  }

  @Put('actualizar-alumno/:id')
  @ApiOperation({ summary: 'Actualizar un alumno' })
  @ApiParam({ name: 'id', description: 'ID del alumno' })
  @ApiResponse({ status: 200, description: 'Alumno actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Alumno no encontrado' })
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateAlumnoDto: UpdateAlumnoDto,
  ) {
    return this.alumnosService.update(id, updateAlumnoDto);
  }

  @Delete('eliminar-alumno/:id')
  @ApiOperation({ summary: 'Eliminar un alumno' })
  @ApiParam({ name: 'id', description: 'ID del alumno' })
  @ApiResponse({ status: 200, description: 'Alumno eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Alumno no encontrado' })
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.alumnosService.remove(id);
  }

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false, description: 'Número de página' })
  @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Límite de resultados por página' })
  @ApiOperation({ summary: 'Obtener lista de alumnos' })
  @ApiResponse({ status: 200, description: 'Lista de alumnos obtenida exitosamente' })
  async findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    const options = {
      page: Math.max(1, page),
      limit: Math.max(1, limit)
    };

    return this.alumnosService.findAll(options);
  }

  @Get('consultar-por-id/:id')
  @ApiOperation({ summary: 'Obtener un alumno por ID' })
  @ApiParam({ name: 'id', description: 'ID del alumno' })
  @ApiResponse({ status: 200, description: 'Alumno encontrado' })
  @ApiResponse({ status: 404, description: 'Alumno no encontrado' })
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.alumnosService.findOne(id);
  }
}
