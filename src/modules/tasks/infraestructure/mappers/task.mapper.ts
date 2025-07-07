import { Task } from '../../domain/entities/task';
// importa el tipo de Product desde prisma, y asigna un alias, ejemplo: PrismaProject
import { Task as PrismaTask} from "../../../../../generated/prisma";

export class TaskMapper {
  static toDomain(prismaTask: PrismaTask): Task {
    return new Task({
      id: prismaTask.id,
      projectId: prismaTask.projectId,
      name: prismaTask.name,
      description: prismaTask.description || '',
      completed: prismaTask.completed,
      createdAt: prismaTask.createdAt,
      updatedAt: prismaTask.updatedAt || undefined,
    });
  }

  static toPersistence(task: Task): PrismaTask {
    return {
      id: task.id,
      projectId: task.projectId,
      name: task.name,
      description: task.description,
      completed: task.completed,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt || null,
    };
  }
}