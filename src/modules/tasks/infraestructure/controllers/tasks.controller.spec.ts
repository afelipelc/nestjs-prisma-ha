import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { PrismaService } from '../../../../core/databases/prisma.service';
import { IProjectRepository } from '../../../projects/domain/interfaces/project-repository.interface';
import { PrismaProjectsRepository } from '../../../projects/infraestructure/repositories/prisma-projects.repository';
import { ITaskRepository } from '../../domain/interfaces/task-repository.interface';
import { PrismaTasksRepository } from '../repositories/prisma-tasks.repository';
import { CreateTaskUseCase } from '../../application/use-cases/create-task.use-case';
import { GetTasksByProjectUseCase } from '../../application/use-cases/get-tasks-by-project.use-case';
import { UpdateTaskUseCase } from '../../application/use-cases/update-task.use-case';
import { DeleteTaskUseCase } from '../../application/use-cases/delete-task.use-case';

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      controllers: [TasksController],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
