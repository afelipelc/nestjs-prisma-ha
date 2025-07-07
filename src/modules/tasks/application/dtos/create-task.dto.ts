import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  name: string;

  @IsNotEmpty({ message: 'La descripción es obligatoria.' })
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  description: string;

  // @IsNotEmpty({ message: 'El id del proyecto es obligatorio.' })
  @IsOptional()
  @IsString({ message: 'El id del proyecto debe ser una cadena de texto.' })
  projectId: string;
}