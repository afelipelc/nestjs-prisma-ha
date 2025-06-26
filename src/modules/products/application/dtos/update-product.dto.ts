import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'El sku debe ser una cadena de texto.' })
  sku?: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0, {message: "El precio debe ser mayor o igual a 0"})
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, {message: "El precio al público debe ser mayor o igual a 0"})
  publicPrice?: number;
}