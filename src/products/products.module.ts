import { Module } from '@nestjs/common';
import { ProductsController } from './infraestructure/controllers/products.controller';
import { CreateProductUseCase } from './application/use-cases/create-product.use-case';
import { IProductRepository } from './domain/interfaces/product-repository.interface';
import { MemoryProductsRepository } from './infraestructure/repositories/memory-products.repository';
import { GetProductsUseCase } from './application/use-cases/get-products.use-case';

@Module({
  providers: [
    // proveedor de almacen, especificando la clase a utilizar
    {
      provide: IProductRepository,
      useClass: MemoryProductsRepository,
    },
    // casos de uso
    CreateProductUseCase,
    GetProductsUseCase,
  ],
  controllers: [ProductsController]
})
export class ProductsModule {}
