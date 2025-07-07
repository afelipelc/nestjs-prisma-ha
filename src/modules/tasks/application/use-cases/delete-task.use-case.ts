import { Injectable } from "@nestjs/common";
import { ITaskRepository } from "../../domain/interfaces/task-repository.interface";

/**
 * Caso de uso para actualizar tarea
 */
@Injectable()
export class DeleteTaskUseCase{
  constructor(private readonly taskRepository: ITaskRepository,){}

  /**
   * Método para ejecutar el caso de uso
   * @param dto 
   * @returns Tarea actualizada o null
   */
  async execute(id: string): Promise<boolean> {
    return this.taskRepository.delete(id);
  }
}