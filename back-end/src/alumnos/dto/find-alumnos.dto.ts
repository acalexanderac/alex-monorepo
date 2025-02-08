import { IsOptional, IsNumber, Min, IsString } from 'class-validator';

export class FindAlumnosDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  grado?: number;

  @IsOptional()
  @IsString()
  seccion?: string;
} 