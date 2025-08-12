import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { IProjectRepository } from '../../domain/interfaces/project-repository.interface';
import { PrismaProjectsRepository } from '../repositories/prisma-projects.repository';
import { CreateProjectUseCase } from '../../application/use-cases/create-project.use-case';
import { GetProjectsUseCase } from '../../application/use-cases/get-projects.use-case';
import { UpdateProjectUseCase } from '../../application/use-cases/update-project.use-case';
import { GetProjectUseCase } from '../../application/use-cases/get-project.use-case';
import { PrismaService } from '../../../../core/databases/prisma.service';
import { Project } from '../../domain/entities/project';
import { ProjectStatus } from '../../domain/enums/project-status.enum';

describe('ProjectsController', () => {
  let controller: ProjectsController;

  // no tenemos un servicio, vamos a usar el caso de uso
  let getProjectUseCae: GetProjectUseCase;

  beforeEach(async () => {
    // se deben proporcionar todas las dependencias requeridas
    // en este caso, por el ProjectsController
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
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
      controllers: [ProjectsController],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);

    // acceder a la instancia del caso de uso
    getProjectUseCae = module.get<GetProjectUseCase>(GetProjectUseCase);
  });

  it('El controlador debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  // verificar que se tenga una instancia de GetProjectUseCase
  it('Debe tener instancia de GetProjectUseCase', () => {
    expect(getProjectUseCae).toBeDefined();
  });

  // caso de prueba:
  // -->>> El controlador en su método getProject(id: string) retorne un objeto 
  // Project, con la misma estructura que devuelve el 
  //  GetProjectUseCase.execute(id: string)

  describe("Interacción entre controlador y caso de uso", () => {

    it("Debe devolver un proyecto por ID", async() => {

      // ejemplo de estructura de proyecto (objeto Project)
      let project : Project = {
        id: "asdasd",
        name: "Proyecto prueba",
        description: "Descripción",
        status: ProjectStatus.PENDING,

        createdAt: new Date(),
        tasks: [],

        value: (): any => {}
      }

      // simular la ejecución del caso de uso
      jest.spyOn(getProjectUseCae, "execute").mockImplementation(async () => project);

      // ejecutar el controlador y comparar la respuesta obtenida
      // desde el caso de uso
      expect(await controller.findById("asdasd")).toBe(project);
    });
  });
});
