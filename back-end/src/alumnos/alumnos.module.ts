import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlumnosController } from './alumnos.controller';
import { AlumnosService } from './alumnos.service';
import { Alumno, AlumnoSchema } from './schemas/alumno.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Alumno.name, schema: AlumnoSchema }
    ])
  ],
  controllers: [AlumnosController],
  providers: [AlumnosService]
})
export class AlumnosModule {}
