import { ProjectStatus } from "../enums/project-status.enum";

/**
 * Entidad Project
 */
export class Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;

  // campos automáticos
  createdAt: Date;
  updatedAt?: Date;

  constructor (data: {
    id: string,
    name: string,
    description: string,
    status?: ProjectStatus,
    createdAt?: Date,
    updatedAt?: Date
  }){
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;

    // PENDING es el estatus por defecto
    this.status = data.status ?? ProjectStatus.PENDING;

    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt;
  }

  /**
   * 
   * @returns Estructura primitiva (sin instancia de Project)
   */
  value() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

}