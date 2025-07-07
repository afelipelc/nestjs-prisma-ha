import { Injectable } from "@nestjs/common";
import { IProductRepository } from "../../domain/interfaces/product-repository.interface";
import { Product } from "../../domain/entities/product";
import { PrismaService } from "../../../../core/databases/prisma.service";
import { ProductMapper } from "../mappers/product.mapper";
import { UpdateProductDto } from "../../application/dtos/update-product.dto";

/**
 * Repositorio para productos que usa Prisma
 */
@Injectable()
export class PrismaProductsRepository implements IProductRepository {

  constructor(private readonly prismaService: PrismaService) {}

  async create(product: Product): Promise<Product | null> {
  
    const newProduct = await this.prismaService.product.create({
      data: {
        ...product,
        id: undefined, // dejamos que Prisma genere su ID
      }
    });

    return ProductMapper.toDomain(newProduct);
  }

  async getAll(): Promise<Product[]> {
    const products = await this.prismaService.product.findMany();

    return products.map(ProductMapper.toDomain);
  }

  async getById(id: string): Promise<Product | null> {
    const product = await this.prismaService.product.findUnique({
      where: {
        id
      }
    });

    return product ? ProductMapper.toDomain(product) : null;
  }

  /**
   * Actualizar producto en la base de datos
   */
  async update(id: string, product: UpdateProductDto): Promise<Product | null> {
    const updated = await this.prismaService.product.update({
      where: {
        id
      },
      data: product
    });

    return product ? ProductMapper.toDomain(updated) : null;
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.prismaService.product.delete({
      where: {
        id
      }
    });

    return !!deleted; // deleted tiene valor ?
  }
}