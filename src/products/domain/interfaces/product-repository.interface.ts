import { Product } from "../entities/product";

export abstract class IProductRepository {
  abstract create(product: Product): Promise<Product | null>;
  abstract getAll(): Promise<Product[]>;
  abstract getById(id: string): Promise<Product | null>;
}