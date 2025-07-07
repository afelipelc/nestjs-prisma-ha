import { Injectable } from "@nestjs/common";
import { Product } from "../../domain/entities/product";
import { IProductRepository } from "../../domain/interfaces/product-repository.interface";
import { UpdateProductDto } from "../dtos/update-product.dto";

/**
 * Caso de uso para actualizar producto
 */
@Injectable()
export class UpdateProductUseCase{
  // requerir como provider el ProductRepository
  constructor(private readonly productRepository: IProductRepository){}

  /**
   * Método para ejecutar el caso de uso
   * @param dto 
   * @returns Producto actualizado o null
   */
  async execute(id: string, dto: UpdateProductDto): Promise<Product | null> {
    // enviar a guardar el producto a través del repositorio de productos
    
    // si se requiere alguna lógica para determinar si se actualiza o no
    // debe implementarse aquí antes de llamar a la actualización

    return this.productRepository.update(id, dto);
  }
}