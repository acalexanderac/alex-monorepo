import { IsString, IsNumber, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateAlumnoDto {
  @IsString()
  @IsNotEmpty()
  nombreAlumno: string;

  @IsDateString()
  @IsNotEmpty()
  fechaNacimiento: string;

  @IsString()
  @IsNotEmpty()
  nombrePadre: string;

  @IsString()
  @IsNotEmpty()
  nombreMadre: string;

  @IsNumber()
  @IsNotEmpty()
  grado: number;

  @IsString()
  @IsNotEmpty()
  seccion: string;
}
