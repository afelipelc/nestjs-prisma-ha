import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  name: string;

  @IsNotEmpty({ message: 'El sku es obligatorio.' })
  @IsString({ message: 'El sku debe ser una cadena de texto.' })
  sku: string;

  @IsNotEmpty({ message: 'La descripción es obligatoria.' })
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  description: string;

  @IsNumber()
  @Min(0, {message: "El precio debe ser mayor o igual a 0"})
  price: number;

  @IsNumber()
  @Min(0, {message: "El precio al público debe ser mayor o igual a 0"})
  publicPrice: number;
}