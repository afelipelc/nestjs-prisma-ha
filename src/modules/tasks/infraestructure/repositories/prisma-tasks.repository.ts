import { Injectable } from "@nestjs/common";
import { ITaskRepository } from "../../domain/interfaces/task-repository.interface";
import { Task } from "../../domain/entities/task";
import { PrismaService } from "../../../../core/databases/prisma.service";
import { TaskMapper } from "../mappers/task.mapper";
import { UpdateTaskDto } from "../../application/dtos/update-task.dto";

/**
 * Repositorio para proyectos que usa Prisma
 */
@Injectable()
export class PrismaTasksRepository implements ITaskRepository {

  constructor(private readonly prismaService: PrismaService) {}

  async create(project: Task): Promise<Task | null> {
    // omitir ID y createdAt de los datos del nuevo proyecto
    const { id, createdAt, ...taskData } = project;
  
    const newTask = await this.prismaService.task.create({
      data: taskData,
    });

    return TaskMapper.toDomain(newTask);
  }

  async getAll(): Promise<Task[]> {
    const tasks = await this.prismaService.task.findMany();

    return tasks.map(TaskMapper.toDomain);
  }

  async findById(id: string): Promise<Task | null> {
    const task = await this.prismaService.task.findUnique({
      where: {
        id
      }
    });

    return task ? TaskMapper.toDomain(task) : null;
  }

  async findByProjectId(projectId: string): Promise<Task[]> {
    const tasks = await this.prismaService.task.findMany({
      where: {
        projectId,
      }
    });

    return tasks.map(TaskMapper.toDomain);
  }


  /**
   * Actualizar proyecto en la base de datos
   */
  async update(id: string, task: UpdateTaskDto): Promise<Task | null> {
    const updated = await this.prismaService.task.update({
      where: {
        id
      },
      data: task
    });

    return task ? TaskMapper.toDomain(updated) : null;
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.prismaService.task.delete({
      where: {
        id
      }
    });

    return !!deleted; // deleted tiene valor ?
  }
}