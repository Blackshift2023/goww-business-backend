import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UrlConstant } from 'src/common/constant/UrlConstant';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Category } from './entities/category.entity';
import { QuertDto } from 'src/common/dtos/query.dto';
import { SortEnum } from 'src/common/enum/sort.enum';

@ApiTags(UrlConstant.CATEGORY)
@Controller(UrlConstant.CATEGORY)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    const save: Category = await this.categoryService.create(createCategoryDto);
    return save;
  }

  @Get()
  @ApiQuery({ name: 'sort', required: false, enum: SortEnum, description: 'Sort the results by column' })
  @ApiQuery({ name: 'keyword', required: false, description: 'Search keyword' })
  async findAll(@Query() queryDto: QuertDto): Promise<Array<Category>> {
    const getAllCategory: Array<Category> = await this.categoryService.findAll(queryDto);
    return getAllCategory;
  }

  @Get(UrlConstant.PARAM_ID)
  async findOne(@Param(UrlConstant.ID) id: string): Promise<Category> {
    const getCategory: Category = await this.categoryService.findOne(+id);
    return getCategory;
  }

  @Patch(UrlConstant.PARAM_ID)
  @UsePipes(new ValidationPipe())
  async update(@Param(UrlConstant.ID) id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const updateCategory: Category = await this.categoryService.update(+id, updateCategoryDto);
    return updateCategory;
  }

  @Delete(UrlConstant.PARAM_ID)
  async remove(@Param(UrlConstant.ID) id: string): Promise<boolean> {
    const isDelete: boolean = await this.categoryService.remove(+id);
    return isDelete;
  }
}