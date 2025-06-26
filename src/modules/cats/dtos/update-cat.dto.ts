// definir los datos que vamos
// a recibir al actualizar un Cat

export class UpdateCatDto {
// podemos dejar propiedades como opcionales
// (que pueden no venir en el update)
  name?: string;
  color?: string;
  age?: number;
}