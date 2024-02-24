import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { validate } from 'class-validator';
import { QuertDto } from 'src/common/dtos/query.dto';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository
  ) { }
  async create(createProduct: CreateProductDto): Promise<Product> {
    await this.createAndUpdateProductValidation(createProduct);
    const save: Product = await this.productRepository.careteProduct(createProduct);
    return save;
  }

  async findAll(query: QuertDto): Promise<Pagination<Product, IPaginationMeta>> {
    const getAllProduct: Pagination<Product, IPaginationMeta> = await this.productRepository.getAllProduct(query);
    return getAllProduct;
  }

  async findOne(id: number, queryDto: QuertDto): Promise<Product> {
    const getCategory: Product = await this.productRepository.getByIdProduct(id, queryDto);
    return getCategory;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const update: Product = await this.productRepository.updateProduct(id, updateProductDto);
    return update;
  }

  async remove(id: number): Promise<boolean> {
    const isDelete = await this.productRepository.deleteProduct(id);
    return isDelete;
  }

  async createAndUpdateProductValidation(dto: CreateProductDto | UpdateProductDto) {
    const validationErrors = await validate(dto);
    if (validationErrors.length > 0) {
      throw new HttpException(
        { message: 'Validation failed', errors: validationErrors },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
