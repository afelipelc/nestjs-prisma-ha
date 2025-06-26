import { Injectable } from "@nestjs/common";
import { Product } from "../../domain/entities/product";
import { IProductRepository } from "../../domain/interfaces/product-repository.interface";

/**
 * Caso de uso para listar todos los productos
 */
@Injectable()
export class GetProductsUseCase{
  // requerir como provider el ProductRepository
  constructor(private readonly productRepository: IProductRepository){}

  /**
   * Método para ejecutar el caso de uso
   * @param dto 
   * @returns Producto registrado o null
   */
  async execute(): Promise<Product[]> {
    
    // pedir los productos al repositorio
    return this.productRepository.getAll();
  }
}