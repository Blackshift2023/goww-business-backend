import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { UrlConstant } from 'src/common/constant/UrlConstant';
import { QuertDto } from 'src/common/dtos/query.dto';
import { Public } from '../auth/auth.guard';

@ApiTags(UrlConstant.PRODUCT)
@Controller(UrlConstant.PRODUCT)
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Public()
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    const save: Product = await this.productService.create(createProductDto);
    return save;
  }

  @Get()
  async findAll(@Query() queryDto: QuertDto): Promise<Array<Product>> {
    const getAllCategory: Array<Product> = await this.productService.findAll(queryDto);
    return getAllCategory;
  }

  @Get(UrlConstant.PARAM_ID)
  async findOne(@Param(UrlConstant.ID) id: string): Promise<Product> {
    const getCategory: Product = await this.productService.findOne(+id);
    return getCategory;
  }

  @Patch(UrlConstant.PARAM_ID)
  @UsePipes(new ValidationPipe())
  async update(@Param(UrlConstant.ID) id: string, @Body() updateCategoryDto: UpdateProductDto): Promise<Product> {
    const updateCategory: Product = await this.productService.update(+id, updateCategoryDto);
    return updateCategory;
  }

  @Delete(UrlConstant.PARAM_ID)
  async remove(@Param(UrlConstant.ID) id: string): Promise<boolean> {
    const isDelete: boolean = await this.productService.remove(+id);
    return isDelete;
  }
}
