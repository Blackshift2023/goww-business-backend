import { DataSource, DeleteResult, FindManyOptions, Repository, SelectQueryBuilder } from "typeorm";
import { Category } from "./entities/category.entity";
import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { SortEnum } from "src/common/enum/sort.enum";
import { QuertDto } from "src/common/dtos/query.dto";

@Injectable()
export class CategoryRepository extends Repository<Category> {
    constructor(private readonly dataSource: DataSource) {
        super(Category, dataSource.createEntityManager());
    }

    async careteCategory(category: CreateCategoryDto): Promise<Category> {
        const create: Category = this.create({
            name: category.name,
            description: category.description
        });
        const save: Category = await this.save(create);
        return save;
    }

    async updateCategory(id: number, category: UpdateCategoryDto): Promise<Category> {
        const getCategory: Category = await this.findOne({ where: { id } });
        const update: Category = Object.assign(getCategory, category);
        const save: Category = await this.save(update);
        return save;
    }

    async getByIdCategory(id: number, query: QuertDto): Promise<Category> {
        const options: FindManyOptions<Category> = {
            where: { id }
        };
        query && (typeof query.includes === 'string') ? (options.relations = [query.includes]) : query.includes && (options.relations = query.includes);
        const category: Category = await this.findOne(options);
        return category;
    }

    async getAllCategory(query: QuertDto): Promise<Array<Category>> {
        const { keyword, sort } = query;

        const qb: SelectQueryBuilder<Category> = this.createQueryBuilder('category');

        qb.orderBy('category.updatedDate', sort || SortEnum.ASC);

        keyword && qb.andWhere('(category.name LIKE :keyword OR category.description LIKE :keyword)', { keyword: `%${keyword}%` })

        qb.loadRelationCountAndMap('category.productCount', 'category.product');

        const allCategory: Array<Category> = await qb.getMany();
        return allCategory;
    }

    async deleteCategory(id: number): Promise<boolean> {
        const isDelete: DeleteResult = await this.delete(id);
        return isDelete.affected > 0;
    }
}