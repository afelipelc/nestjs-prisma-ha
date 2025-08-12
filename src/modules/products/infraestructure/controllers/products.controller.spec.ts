import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { PrismaService } from '../../../../core/databases/prisma.service';
import { IProductRepository } from '../../domain/interfaces/product-repository.interface';
import { PrismaProductsRepository } from '../repositories/prisma-products.repository';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';
import { GetProductsUseCase } from '../../application/use-cases/get-products.use-case';
import { UpdateProductUseCase } from '../../application/use-cases/update-product.use-case';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
        UpdateProductUseCase,
      ],
      controllers: [ProductsController],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
