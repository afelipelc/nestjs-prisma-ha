import { Injectable } from "@nestjs/common";
import { IProjectRepository } from "../../domain/interfaces/project-repository.interface";
import { Project } from "../../domain/entities/project";
import { PrismaService } from "../../../../core/databases/prisma.service";
import { ProjectMapper } from "../mappers/project.mapper";
import { UpdateProjectDto } from "../../application/dtos/update-project.dto";

/**
 * Repositorio para proyectos que usa Prisma
 */
@Injectable()
export class PrismaProjectsRepository implements IProjectRepository {

  constructor(private readonly prismaService: PrismaService) {}

  async create(project: Project): Promise<Project | null> {

    // omitir ID y createdAt de los datos del nuevo proyecto
    const { id, createdAt, ...projectData } = project;
  
    const newProject = await this.prismaService.project.create({
      data: projectData
    });

    return ProjectMapper.toDomain(newProject);
  }

  async getAll(): Promise<Project[]> {
    const projects = await this.prismaService.project.findMany();

    return projects.map(ProjectMapper.toDomain);
  }

  async getById(id: string): Promise<Project | null> {
    const project = await this.prismaService.project.findUnique({
      where: {
        id
      }
    });

    return project ? ProjectMapper.toDomain(project) : null;
  }

  /**
   * Actualizar proyecto en la base de datos
   */
  async update(id: string, product: UpdateProjectDto): Promise<Project | null> {
    const updated = await this.prismaService.project.update({
      where: {
        id
      },
      data: product
    });

    return product ? ProjectMapper.toDomain(updated) : null;
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.prismaService.project.delete({
      where: {
        id
      }
    });

    return !!deleted; // deleted tiene valor ?
  }
}