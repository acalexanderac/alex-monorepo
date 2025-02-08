import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlumnosService } from './alumnos.service';
import { AlumnosController } from './alumnos.controller';
import { Alumno, AlumnoSchema } from './entities/alumno.entity';

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
