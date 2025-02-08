import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Alumno extends Document {
  @Prop({ required: true, minlength: 3, maxlength: 50 })
  nombreAlumno: string;

  @Prop({ required: true })
  fechaNacimiento: string;

  @Prop({ required: true, minlength: 3, maxlength: 50 })
  nombrePadre: string;

  @Prop({ required: true, minlength: 3, maxlength: 50 })
  nombreMadre: string;

  @Prop({ required: true, min: 1, max: 6 })
  grado: number;

  @Prop({ required: true, enum: ['A', 'B', 'C'] })
  seccion: string;

  @Prop({ default: Date.now })
  fechaIngreso: Date;
}

export const AlumnoSchema = SchemaFactory.createForClass(Alumno); 