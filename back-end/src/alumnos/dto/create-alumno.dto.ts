import { IsString, IsNumber, IsDateString, MinLength, MaxLength, Min, Max, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidDate } from '../../common/decorators/is-valid-date.decorator';

export class CreateAlumnoDto {
  @ApiProperty({ 
    description: 'Nombre completo del alumno',
    minLength: 3,
    maxLength: 50,
    example: 'Juan Pérez González'
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios'
  })
  nombreAlumno: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del alumno',
    example: '2015-01-01'
  })
  @IsDateString()
  @IsValidDate({
    message: 'La fecha de nacimiento debe corresponder a una edad entre 3 y 18 años'
  })
  fechaNacimiento: string;

  @ApiProperty({
    description: 'Nombre completo del padre',
    minLength: 3,
    maxLength: 50,
    example: 'Pedro Pérez Martínez'
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  nombrePadre: string;

  @ApiProperty({
    description: 'Nombre completo de la madre',
    minLength: 3,
    maxLength: 50,
    example: 'María González López'
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  nombreMadre: string;

  @ApiProperty({
    description: 'Grado que cursa el alumno',
    minimum: 1,
    maximum: 6,
    example: 1
  })
  @IsNumber()
  @Min(1)
  @Max(6)
  grado: number;

  @ApiProperty({
    description: 'Sección del grado',
    enum: ['A', 'B', 'C'],
    example: 'A'
  })
  @IsString()
  @Matches(/^[A-C]$/, {
    message: 'La sección debe ser A, B o C'
  })
  seccion: string;
}
