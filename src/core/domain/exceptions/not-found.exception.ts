export class NotFoundException extends Error {
  constructor(message: string = 'Recurso no encontrado.') {
    super(message);
    this.name = 'NotFoundException'; // Un nombre para identificar el tipo de excepción
  }
}
