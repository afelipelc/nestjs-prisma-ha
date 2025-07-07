import { Injectable } from "@nestjs/common";
import { Project } from "../../domain/entities/project";
import { IProjectRepository } from "../../domain/interfaces/project-repository.interface";
import { UpdateProjectDto } from "../dtos/update-project.dto";

/**
 * Caso de uso para actualizar proyecto
 */
@Injectable()
export class UpdateProjectUseCase{
  constructor(private readonly projectRepository: IProjectRepository){}

  /**
   * Método para ejecutar el caso de uso
   * @param dto 
   * @returns Proyecto actualizado o null
   */
  async execute(id: string, dto: UpdateProjectDto): Promise<Project | null> {
    // enviar a guardar el producto a través del repositorio de productos
    
    // si se requiere alguna lógica para determinar si se actualiza o no
    // debe implementarse aquí antes de llamar a la actualización

    return this.projectRepository.update(id, dto);
  }
}