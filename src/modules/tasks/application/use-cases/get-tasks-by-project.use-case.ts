import { Injectable } from "@nestjs/common";
import { Task } from "../../domain/entities/task";
import { ITaskRepository } from "../../domain/interfaces/task-repository.interface";
import { IProjectRepository } from "../../../projects/domain/interfaces/project-repository.interface";
import { ProjectNotFoundException } from "../../../projects/domain/exceptions/project-not-found.exception";

/**
 * Caso de uso para listar todos los proyectos
 */
@Injectable()
export class GetTasksByProjectUseCase{
  constructor(
    private readonly taskRepository: ITaskRepository,
    private readonly projectRepository: IProjectRepository,
  ){}

  /**
   * Ejecuta el caso de uso para obtener todas las tareas de un proyecto.
   * @param projectId El ID del proyecto cuyas tareas se quieren recuperar.
   * @returns Promise <Task[]>.
   * @throws ProjectNotFoundException Si el proyecto con el ID dado no existe.
   */
  async execute(projectId: string): Promise<Task[]> {
    // validar la existencia del proyecto
    const project = await this.projectRepository.getById(projectId);
    if (!project) {
      throw new ProjectNotFoundException(projectId);
    }

    // pedir los proyectos al repositorio
    return this.taskRepository.findByProjectId(projectId);
  }
}