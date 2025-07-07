import { Project } from '../../domain/entities/project';
// importa el tipo de Product desde prisma, y asigna un alias, ejemplo: PrismaProject
import { Project as PrismaProject} from "../../../../../generated/prisma";
import { ProjectStatus } from '../../domain/enums/project-status.enum';

export class ProjectMapper {
  static toDomain(prismaProject: PrismaProject): Project {
    return new Project({
      id: prismaProject.id,
      name: prismaProject.name,
      description: prismaProject.description || '',
      status: ProjectStatus[prismaProject.status?.toString()],
      createdAt: prismaProject.createdAt,
      updatedAt: prismaProject.updatedAt || undefined,
    });
  }

  static toPersistence(project: Project): PrismaProject {
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      status: project.status,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt || null,
    };
  }
}