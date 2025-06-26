import { Injectable } from "@nestjs/common";
import { Product } from "../../domain/entities/product";
import { IProductRepository } from "../../domain/interfaces/product-repository.interface";
import { CreateProductDto } from "../dtos/create-product.dto";

/**
 * Caso de uso para registrar producto
 */
@Injectable()
export class CreateProductUseCase{
  // requerir como provider el ProductRepository
  constructor(private readonly productRepository: IProductRepository){}

  /**
   * Método para ejecutar el caso de uso
   * @param dto 
   * @returns Producto registrado o null
   */
  async execute(dto: CreateProductDto): Promise<Product | null> {
    
    // crear objeto de la entidad Product
    const productData = new Product(
      '', // la generación del Id la implementará el repositorio
      dto.name,
      dto.sku,
      dto.description,
      dto.price,
      dto.publicPrice
    );
    console.log(productData);
    

    // enviar a guardar el producto a través del repositorio de productos
    return this.productRepository.create(productData);
  }
}