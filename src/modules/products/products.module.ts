import { Module } from '@nestjs/common';
import { ProductsController } from './infraestructure/controllers/products.controller';
import { CreateProductUseCase } from './application/use-cases/create-product.use-case';
import { IProductRepository } from './domain/interfaces/product-repository.interface';
import { GetProductsUseCase } from './application/use-cases/get-products.use-case';
// import { MemoryProductsRepository } from './infraestructure/repositories/memory-products.repository';
import { PrismaProductsRepository } from './infraestructure/repositories/prisma-products.repository';
import { PrismaService } from '../../core/databases/prisma.service';
import { UpdateProductUseCase } from './application/use-cases/update-product.use-case';

@Module({
  providers: [
    // agregamos PrismaService
    PrismaService,
    // proveedor de almacen, especificando la clase a utilizar
    {
      provide: IProductRepository,
      useClass: PrismaProductsRepository, // Reemplazamos MemoryProductsRepository,
    },
    // casos de uso
    CreateProductUseCase,
    GetProductsUseCase,
    UpdateProductUseCase
  ],
  controllers: [ProductsController]
})
export class ProductsModule {}
