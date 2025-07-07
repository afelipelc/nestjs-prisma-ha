import { UpdateTaskDto } from "../../application/dtos/update-task.dto";
import { Task } from "../entities/task";

export abstract class ITaskRepository {
  abstract create(task: Task): Promise<Task | null>;
  abstract findById(id: string): Promise<Task | null>;
  abstract findByProjectId(projectId: string): Promise<Task[]>;
  // nuevos métodos para actualizar y eliminar
  abstract update(id: string, task: UpdateTaskDto): Promise<Task | null>;
  abstract delete(id: string): Promise<boolean>;
}