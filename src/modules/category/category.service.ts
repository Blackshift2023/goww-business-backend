import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { validate } from 'class-validator';
import { CategoryRepository } from './category.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { QuertDto } from 'src/common/dtos/query.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private readonly categoryRepository: CategoryRepository
  ) { }

  async create(createCategory: CreateCategoryDto): Promise<Category> {
    await this.createAndUpdateCategoryValidation(createCategory);
    const save: Category = await this.categoryRepository.careteCategory(createCategory);
    return save;
  }

  async findAll(query: QuertDto): Promise<Array<Category>> {
    const getAllCategory: Array<Category> = await this.categoryRepository.getAllCategory(query);
    return getAllCategory;
  }

  async findOne(id: number, query: QuertDto): Promise<Category> {
    const getCategory: Category = await this.categoryRepository.getByIdCategory(id, query);
    return getCategory;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const update: Category = await this.categoryRepository.updateCategory(id, updateCategoryDto);
    return update;
  }

  async remove(id: number): Promise<boolean> {
    const isDelete = await this.categoryRepository.deleteCategory(id);
    return isDelete;
  }

  async createAndUpdateCategoryValidation(dto: CreateCategoryDto | UpdateCategoryDto) {
    const validationErrors = await validate(dto);
    if (validationErrors.length > 0) {
      throw new HttpException(
        { message: 'Validation failed', errors: validationErrors },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
