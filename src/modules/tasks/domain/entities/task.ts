
/**
 * Entidad Task
 */
export class Task {
  readonly id: string;
  name: string;
  description: string;
  completed: boolean;
  readonly projectId: string;

  // campos automáticos
  readonly createdAt: Date;
  updatedAt?: Date;

  constructor (data: {
    id: string,
    name: string,
    description: string,
    completed: boolean,
    projectId: string,
    createdAt?: Date,
    updatedAt?: Date
  }){
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;

    this.completed = data.completed;
    this.projectId = data.projectId;

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
      completed: this.completed,
      projectId: this.projectId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

}