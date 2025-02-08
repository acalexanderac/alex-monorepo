import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { ApiKey } from '../auth/api-key.guard';

@Controller('alumnos')
@UseGuards(ApiKey)
export class AlumnosController {
  constructor(private readonly alumnosService: AlumnosService) {}

  @Post('crear-alumno')
  create(@Body() createAlumnoDto: CreateAlumnoDto) {
    return this.alumnosService.create(createAlumnoDto);
  }

  @Get('consultar-por-grado/:grado')
  findByGrado(@Param('grado') grado: number) {
    return this.alumnosService.findByGrado(+grado);
  }

  @Put('actualizar-alumno/:id')
  update(@Param('id') id: string, @Body() updateAlumnoDto: UpdateAlumnoDto) {
    return this.alumnosService.update(id, updateAlumnoDto);
  }

  @Delete('eliminar-alumno/:id')
  remove(@Param('id') id: string) {
    return this.alumnosService.remove(id);
  }

  @Get()
  findAll() {
    return this.alumnosService.findAll();
  }

  @Get('consultar-por-id/:id')
  findOne(@Param('id') id: string) {
    return this.alumnosService.findOne(id);
  }
}
