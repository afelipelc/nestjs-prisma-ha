import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CatsService } from "./cats.service";
import { Cat } from "./types/cat.type";
import { CreateCatDto } from "./dtos/create-cat.dto";
import { UpdateCatDto } from "./dtos/update-cat.dto";

@Controller('cats') // recurso   /cats
export class CatsController {
  // (private readonly catsService: CatsService)
  // significa que es un atributo privado inicializado
  // con una instancia de CatsService
  constructor(private readonly catsService: CatsService) {
  }

  // implementar el index
  // retorna la lista de todos los gatos
  @Get()
  allCats(): Cat[] {
    // de donde tomo la lista ???
    return this.catsService.allCats();
  }

  // método que de retorne un Cat por su ID
  @Get(':id')  //  /cats/:id   -> /cats/56
  getById(@Param('id', new ParseIntPipe()) id: number): Cat | undefined {    
    // retornar desde el servicio, el Cat por Id    
    return this.catsService.getById( id );
  }

  @Post() //  /cats
  create(@Body() createCatDto: CreateCatDto): Cat {
    // guardar el registro en el servicio

    return this.catsService.create(createCatDto);
  }

  // actualizar registro
  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateCatDto: UpdateCatDto,
  ): string {

    // llamar al servicio para actualizar
    // el registro
    return this.catsService.update(id, updateCatDto);
  }

  // implementar el delete: solo recibe el id
  //   invoca al servicio para eliminar
  // @Delete(':id')
  // delete(...

}
