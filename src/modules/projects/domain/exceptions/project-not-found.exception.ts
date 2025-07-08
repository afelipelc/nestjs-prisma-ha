import { NotFoundException } from "../../../../core/domain/exceptions/not-found.exception";

export class ProjectNotFoundException extends NotFoundException {
  constructor(projectId: string) {
    super(`El proyecto con ID "${projectId}" no ha sido encontrado.`);
    this.name = 'ProjectNotFoundException';
  }
}