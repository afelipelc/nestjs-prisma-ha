import { UpdateProjectDto } from "../../application/dtos/update-project.dto";
import { Project } from "../entities/project";

export abstract class IProjectRepository {
  abstract create(product: Project): Promise<Project | null>;
  abstract getAll(): Promise<Project[]>;
  abstract getById(id: string): Promise<Project | null>;

  // nuevos métodos para actualizar y eliminar
  abstract update(id: string, product: UpdateProjectDto): Promise<Project | null>;
  abstract delete(id: string): Promise<boolean>;
}