import { Injectable } from "@nestjs/common";
import { Task } from "../../domain/entities/task";
import { ITaskRepository } from "../../domain/interfaces/task-repository.interface";
import { CreateTaskDto } from "../dtos/create-task.dto";
import { IProjectRepository } from "../../../projects/domain/interfaces/project-repository.interface";
import { ProjectNotFoundException } from "../../../projects/domain/exceptions/project-not-found.exception";

/**
 * Caso de uso para registrar tarea
 */
@Injectable()
export class CreateTaskUseCase{
  constructor(
    private readonly taskRepository: ITaskRepository,
    private readonly projectRepository: IProjectRepository,
  ){}

  /**
   * Método para ejecutar el caso de uso
   * @param dto 
   * @returns Proyecto registrado o null
   */
  async execute(dto: CreateTaskDto): Promise<Task | null> {
    
    const project = await this.projectRepository.getById(dto.projectId);
    if (!project) {
      throw new ProjectNotFoundException(dto.projectId);
    }

    const taskData = new Task({
      id: '', // la generación del Id la implementará el repositorio
      name: dto.name,
      description: dto.description,
      projectId: dto.projectId,
      completed: false,
    });
    
    return this.taskRepository.create(taskData);
  }
}