import { Injectable } from "@nestjs/common";
import { Project } from "../../domain/entities/project";
import { IProjectRepository } from "../../domain/interfaces/project-repository.interface";
import { CreateProjectDto } from "../dtos/create-project.dto";

/**
 * Caso de uso para registrar proyecto
 */
@Injectable()
export class CreateProjectUseCase{
  constructor(private readonly projectRepository: IProjectRepository){}

  /**
   * Método para ejecutar el caso de uso
   * @param dto 
   * @returns Proyecto registrado o null
   */
  async execute(dto: CreateProjectDto): Promise<Project | null> {
    
    const projectData = new Project({
      id: '', // la generación del Id la implementará el repositorio
      name: dto.name,
      description: dto.description
    });
    
    return this.projectRepository.create(projectData);
  }
}