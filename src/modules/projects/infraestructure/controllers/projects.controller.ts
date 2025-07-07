import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateProjectUseCase } from '../../application/use-cases/create-project.use-case';
import { GetProjectsUseCase } from '../../application/use-cases/get-projects.use-case';
import { UpdateProjectUseCase } from '../../application/use-cases/update-project.use-case';
import { CreateProjectDto } from '../../application/dtos/create-project.dto';
import { Project } from '../../domain/entities/project';
import { UpdateProjectDto } from '../../application/dtos/update-project.dto';
import { GetProjectUseCase } from '../../application/use-cases/get-project.use-case';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly getProjectsUseCase: GetProjectsUseCase,
    private readonly updateProjectUseCase: UpdateProjectUseCase,
    private readonly getProjectUseCase: GetProjectUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProjectDto: CreateProjectDto): Promise<Project | null> {    
    return this.createProjectUseCase.execute(createProjectDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Project[]> {
    return this.getProjectsUseCase.execute();
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project | null> {
    return this.updateProjectUseCase.execute(id, updateProjectDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(
    @Param('id') id: string,
  ): Promise<Project | null> {
    return this.getProjectUseCase.execute(id);
  }
}
