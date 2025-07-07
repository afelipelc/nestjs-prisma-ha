import { Module } from '@nestjs/common';
import { TasksController } from './infraestructure/controllers/tasks.controller';
import { PrismaService } from '../../core/databases/prisma.service';
import { ITaskRepository } from './domain/interfaces/task-repository.interface';
import { PrismaTasksRepository } from './infraestructure/repositories/prisma-tasks.repository';
import { CreateTaskUseCase } from './application/use-cases/create-task.use-case';
import { GetTasksByProjectUseCase } from './application/use-cases/get-tasks-by-project.use-case';
import { UpdateTaskUseCase } from './application/use-cases/update-task.use-case';
import { DeleteTaskUseCase } from './application/use-cases/delete-task.use-case';
import { IProjectRepository } from '../projects/domain/interfaces/project-repository.interface';
import { PrismaProjectsRepository } from '../projects/infraestructure/repositories/prisma-projects.repository';

@Module({
  providers: [
    PrismaService,
    // proveedor de almacen, especificando la clase a utilizar
    {
      provide: IProjectRepository,
      useClass: PrismaProjectsRepository,
    },
    {
      provide: ITaskRepository,
      useClass: PrismaTasksRepository,
    },
    // casos de uso
    CreateTaskUseCase,
    GetTasksByProjectUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
  ],
  controllers: [TasksController]
})
export class TasksModule {}
