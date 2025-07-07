import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';
import { CreateProductDto } from '../../application/dtos/create-product.dto';
import { Product } from '../../domain/entities/product';
import { GetProductsUseCase } from '../../application/use-cases/get-products.use-case';
import { UpdateProductDto } from '../../application/dtos/update-product.dto';
import { UpdateProductUseCase } from '../../application/use-cases/update-product.use-case';

@Controller('products')
export class ProductsController {

  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductsUseCase: GetProductsUseCase,
    // private readonly getProductByIdUseCase: GetProductByIdUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    // private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProductDto: CreateProductDto): Promise<Product | null> {
    console.log(createProductDto);
    
    return this.createProductUseCase.execute(createProductDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Product[]> {
    return this.getProductsUseCase.execute();
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    return this.updateProductUseCase.execute(id, updateProductDto);
  }


  /*
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string): Promise<Product | null> {
    return this.getProductByIdUseCase.execute(id);
  }

  

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteProductUseCase.execute(id);
  }

  */

}
