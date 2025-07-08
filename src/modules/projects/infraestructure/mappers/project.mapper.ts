import { Project } from '../../domain/entities/project';
// importa el tipo de Product desde prisma, y asigna un alias, ejemplo: PrismaProject
import { Project as PrismaProject, Task as PrismaTask} from "../../../../../generated/prisma";
import { ProjectStatus } from '../../domain/enums/project-status.enum';
import { Task } from '../../../tasks/domain/entities/task';

export class ProjectMapper {
  static toDomain(prismaProject: PrismaProject & {tasks?: PrismaTask[]}): Project {
    return new Project({
      id: prismaProject.id,
      name: prismaProject.name,
      description: prismaProject.description || '',
      status: ProjectStatus[prismaProject.status?.toString()],
      createdAt: prismaProject.createdAt,
      updatedAt: prismaProject.updatedAt || undefined,
      tasks: prismaProject.tasks as Task[] || [],
    });
  }

  static toPersistence(project: Project): PrismaProject & {tasks?: PrismaTask[]} {
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      status: project.status,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt || null,
      tasks: project.tasks as PrismaTask[],
    };
  }
}