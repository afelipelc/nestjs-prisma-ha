import { Injectable } from "@nestjs/common";
import { Project } from "../../domain/entities/project";
import { IProjectRepository } from "../../domain/interfaces/project-repository.interface";

/**
 * Caso de uso para obtener un proyecto
 */
@Injectable()
export class GetProjectUseCase{
  constructor(private readonly projectRepository: IProjectRepository){}
  /**
   * Método para ejecutar el caso de uso
   * @param id del proyecto
   * @returns Proyecto o null
   */
  async execute(id: string,): Promise<Project | null> {
    // pedir los proyectos al repositorio
    return this.projectRepository.getById(id);
  }
}