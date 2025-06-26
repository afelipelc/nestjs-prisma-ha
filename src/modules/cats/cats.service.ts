import { Injectable } from '@nestjs/common';
import { Cat } from './types/cat.type';
import { CreateCatDto } from './dtos/create-cat.dto';
import { UpdateCatDto } from './dtos/update-cat.dto';

@Injectable()
export class CatsService {
  cats: Cat[];

  constructor() {
    // crear un gato al inicio
    this.cats = [
      {
        id: 1,
        name: "Papasito",
        color: "gris",
        age: 1,
      }
    ];
  }

  // método que devuelva todos los gatos
  allCats(): Cat[] {
    return this.cats;
  }

  // método para leer un cat por su ID
  getById(id: number): Cat | undefined {
    // cómo encuentro en el array, el registro
    // con ese ID    
    return this.cats.find((cat) => cat.id === id);
  }

  // método para guardar nuevo registro
  create(cat: CreateCatDto): Cat {
    // crear nuevo registro y asignar su ID
    const newCat: Cat = {
      id: (this.cats.findLast((item) => item.id > 0)?.id || 1) + 1,
      ...cat, // toma los datos del parámetro cat
    };

    // agregar el registro al array
    this.cats.push(newCat);

    return newCat;
  }

  update(id: number, cat: UpdateCatDto ) {

    // encontrar el registro en el array this.cats.

    // actualizar sus datos

    // reemplar el objeto en el array

    // retornar mensaje
    return "Registro actualizado";
  }

  delete(id: number) {
    // quitar del array this.cats el objeto con ese id
    // retornar mensaje
  }

}
