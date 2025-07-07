import { NotFoundException } from "../../../../core/domain/exceptions/not-found.exception";

export class ProjectNotFoundException extends NotFoundException {
  constructor(projectId: string) {
    super(`El projecto con ID "${projectId}" not ha sido encontrado.`);
    this.name = 'ProjectNotFoundException';
  }
}