import { Product } from '../../domain/entities/product';
// importa el tipo de Product desde prisma, y asigna un alias, ejemplo: PrismaProduct
import { Prisma, Product as PrismaProduct} from "../../../../../generated/prisma";

export class ProductMapper {
  static toDomain(prismaProduct: PrismaProduct): Product {
    return new Product(
      prismaProduct.id,
      prismaProduct.name,
      prismaProduct.sku,
      prismaProduct.description,
      prismaProduct.price.toNumber(), // convertir de Decimal a number
      prismaProduct.publicPrice.toNumber(), // convertir de Decimal a number
    );
  }

  static toPersistence(product: Product): PrismaProduct {
    return {
      id: product.id,
      name: product.name,
      sku: product.sku,
      description: product.description,
      price: new Prisma.Decimal(product.price), // convertir de number a Decimal
      publicPrice: new Prisma.Decimal(product.publicPrice), // convertir de number a Decimal
    };
  }
}