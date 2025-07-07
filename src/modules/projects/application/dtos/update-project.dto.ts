import { IsEnum, IsOptional, IsString } from "class-validator";
import { ProjectStatus } from "../../domain/enums/project-status.enum";

export class UpdateProjectDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  description?: string;

  @IsOptional()
  @IsEnum(ProjectStatus, { message: 'Estatus de proyecto no válido.' })
  status?: ProjectStatus
}