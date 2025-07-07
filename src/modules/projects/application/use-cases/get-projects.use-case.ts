import { Injectable } from "@nestjs/common";
import { Project } from "../../domain/entities/project";
import { IProjectRepository } from "../../domain/interfaces/project-repository.interface";

/**
 * Caso de uso para listar todos los proyectos
 */
@Injectable()
export class GetProjectsUseCase{
  constructor(private readonly projectRepository: IProjectRepository){}

  /**
   * Método para ejecutar el caso de uso
   * @param dto 
   * @returns Proyectos registrado o array vacío
   */
  async execute(): Promise<Project[]> {
    // pedir los proyectos al repositorio
    return this.projectRepository.getAll();
  }
}