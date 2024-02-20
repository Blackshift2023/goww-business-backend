import { DataSource, DeleteResult, FindManyOptions, Like, Repository } from "typeorm";
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
        const update: Category = await this.getByIdCategory(id);
        for (const key in update) {
            (Object.prototype.hasOwnProperty.call(update, key) && category[key]) &&
                (update[key] = category[key]);
        }
        const save: Category = await this.save(update);
        return save;
    }

    async getByIdCategory(id: number): Promise<Category> {
        const category: Category = await this.findOne({ where: { id } });
        return category;
    }

    async getAllCategory(qeury: QuertDto): Promise<Array<Category>> {
        const { keyword, sort } = qeury;
        const order = { updatedDate: sort || SortEnum.ASC };

        const options: FindManyOptions<Category> = {
            order,
        };

        if (keyword) {
            options.where = [
                { name: Like(`%${keyword}%`) },
                { description: Like(`%${keyword}%`) },
            ];
        }

        const allCategory: Array<Category> = await this.find(options);
        return allCategory;
    }

    async deleteCategory(id: number): Promise<boolean> {
        const isDelete: DeleteResult = await this.delete(id);
        return isDelete.affected > 0;
    }
}