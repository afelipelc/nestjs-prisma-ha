// definir los datos que vamos
// a recibir al registrar un Cat

export class CreateCatDto {
  // id será asignado por el sistema
  name: string;
  color: string;
  age: number;
}