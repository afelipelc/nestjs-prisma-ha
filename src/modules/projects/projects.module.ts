import { Module } from '@nestjs/common';
import { ProjectsController } from './infraestructure/controllers/projects.controller';
import { PrismaService } from '../../core/databases/prisma.service';
import { IProjectRepository } from './domain/interfaces/project-repository.interface';
import { PrismaProjectsRepository } from './infraestructure/repositories/prisma-projects.repository';
import { CreateProjectUseCase } from './application/use-cases/create-project.use-case';
import { GetProjectsUseCase } from './application/use-cases/get-projects.use-case';
import { UpdateProjectUseCase } from './application/use-cases/update-project.use-case';
import { GetProjectUseCase } from './application/use-cases/get-project.use-case';

@Module({
  providers: [
    // agregamos PrismaService
    PrismaService,
    // proveedor de almacen, especificando la clase a utilizar
    {
      provide: IProjectRepository,
      useClass: PrismaProjectsRepository,
    },
    // casos de uso
    CreateProjectUseCase,
    GetProjectsUseCase,
    UpdateProjectUseCase,
    GetProjectUseCase,
  ],
  controllers: [ProjectsController]
})
export class ProjectsModule {}
