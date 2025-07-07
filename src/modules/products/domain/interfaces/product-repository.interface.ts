import { UpdateProductDto } from "../../application/dtos/update-product.dto";
import { Product } from "../entities/product";

export abstract class IProductRepository {
  abstract create(product: Product): Promise<Product | null>;
  abstract getAll(): Promise<Product[]>;
  abstract getById(id: string): Promise<Product | null>;

  // nuevos métodos para actualizar y eliminar
  abstract update(id: string, product: UpdateProductDto): Promise<Product | null>;
  abstract delete(id: string): Promise<boolean>;
}