import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Alumno extends Document {
  @Prop({ required: true })
  nombreAlumno: string;

  @Prop({ required: true })
  fechaNacimiento: Date;

  @Prop({ required: true })
  nombrePadre: string;

  @Prop({ required: true })
  nombreMadre: string;

  @Prop({ required: true })
  grado: number;

  @Prop({ required: true })
  seccion: string;

  @Prop({ default: Date.now })
  fechaIngreso: Date;
}

export const AlumnoSchema = SchemaFactory.createForClass(Alumno);
