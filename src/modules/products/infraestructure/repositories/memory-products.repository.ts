import { Injectable } from "@nestjs/common";
import { IProductRepository } from "../../domain/interfaces/product-repository.interface";
import { Product } from "../../domain/entities/product";

/**
 * Repositorio para productos que usa memoria temporal
 */
@Injectable()
export class MemoryProductsRepository implements IProductRepository {
  #products: Product[];

  constructor() {
    this.#products = [];
  }

  async create(product: Product): Promise<Product | null> {
  console.log(product);

    product.setId(`p-${this.#products.length + 1}`);
    this.#products.push(product);

    return product;
  }

  async getAll(): Promise<Product[]> {
    return this.#products;
  }

  async getById(id: string): Promise<Product | null> {
    return this.#products.find((item) => item.id === id) || null;
  }
}