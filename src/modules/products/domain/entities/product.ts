
/**
 * Entidad Product
 */
export class Product {
  
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  publicPrice: number;

  constructor (
    id: string,
    name: string,
    sku: string,
    description: string,
    price: number,
    publicPrice: number,
  ){
    this.id = id;
    this.name = name;
    this.sku = sku;
    this.description = description;
    this.price = price;
    this.publicPrice = publicPrice;
  }

  setId(id: string) {
    this.id = id;
  }

  /**
   * 
   * @returns Estructura primitiva (sin instancia de Product)
   */
  value() {
    return {
      id: this.id,
      name: this.name,
      sku: this.sku,
      description: this.description,
      price: this.price,
      publicPrice: this.publicPrice,
    }
  }

}