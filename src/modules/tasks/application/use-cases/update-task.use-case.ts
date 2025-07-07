import { Injectable } from "@nestjs/common";
import { Task } from "../../domain/entities/task";
import { ITaskRepository } from "../../domain/interfaces/task-repository.interface";
import { UpdateTaskDto } from "../dtos/update-task.dto";

/**
 * Caso de uso para actualizar tarea
 */
@Injectable()
export class UpdateTaskUseCase{
  constructor(private readonly taskRepository: ITaskRepository,){}

  /**
   * Método para ejecutar el caso de uso
   * @param dto 
   * @returns Tarea actualizada o null
   */
  async execute(id: string, dto: UpdateTaskDto): Promise<Task | null> {
    return this.taskRepository.update(id, dto);
  }
}