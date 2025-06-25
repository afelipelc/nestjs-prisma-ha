import { Injectable } from "@nestjs/common";
import { IProductRepository } from "../../domain/interfaces/product-repository.interface";
import { Product } from "../../domain/entities/product";
import { PrismaService } from "src/prisma.service";
import { ProductMapper } from "../mappers/product.mapper";

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
}