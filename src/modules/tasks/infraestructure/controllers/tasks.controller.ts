import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateTaskUseCase } from '../../application/use-cases/create-task.use-case';
import { GetTasksByProjectUseCase } from '../../application/use-cases/get-tasks-by-project.use-case';
import { UpdateTaskUseCase } from '../../application/use-cases/update-task.use-case';
import { CreateTaskDto } from '../../application/dtos/create-task.dto';
import { Task } from '../../domain/entities/task';
import { UpdateTaskDto } from '../../application/dtos/update-task.dto';
import { DeleteTaskUseCase } from '../../application/use-cases/delete-task.use-case';

@Controller('projects/:projectId/tasks')
export class TasksController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly getTasksByProjectUseCase: GetTasksByProjectUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('projectId') projectId: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task | null> {    
    return await this.createTaskUseCase.execute({
      ...createTaskDto,
      projectId,
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllByProject(
    @Param('projectId') projectId: string,
  ): Promise<Task[]> {
    return await this.getTasksByProjectUseCase.execute(projectId);
  }

  @Put(':id') //   /projects/:projectId/tasks/:id
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task | null> {
    return await this.updateTaskUseCase.execute(id, updateTaskDto);
  }

  @Delete(':taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('taskId') taskId: string) {
    await this.deleteTaskUseCase.execute(taskId);
  }
}
