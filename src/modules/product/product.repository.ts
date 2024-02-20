import { DataSource, DeleteResult, FindManyOptions, Like, Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { SortEnum } from "src/common/enum/sort.enum";
import { QuertDto } from "src/common/dtos/query.dto";

export class ProductRepository extends Repository<Product> {
    constructor(private readonly dataSource: DataSource) {
        super(Product, dataSource.createEntityManager());
    }

    async careteProduct(product: CreateProductDto): Promise<Product> {
        const create: Product = this.create({
            name: product.name,
            description: product.description
        });
        const save: Product = await this.save(create);
        return save;
    }

    async updateProduct(id: number, product: UpdateProductDto): Promise<Product> {
        const update: Product = await this.getByIdProduct(id);
        for (const key in update) {
            (Object.prototype.hasOwnProperty.call(update, key) && product[key]) &&
                (update[key] = product[key]);
        }
        const save: Product = await this.save(update);
        return save;
    }

    async getByIdProduct(id: number): Promise<Product> {
        const category: Product = await this.findOne({ where: { id } });
        return category;
    }

    async getAllProduct(qeury: QuertDto): Promise<Array<Product>> {
        const { keyword, sort } = qeury;
        const order = { updatedDate: sort || SortEnum.ASC };

        const options: FindManyOptions<Product> = {
            order,
        };

        if (keyword) {
            options.where = [
                { name: Like(`%${keyword}%`) },
                { description: Like(`%${keyword}%`) },
            ];
        }

        const allProduct: Array<Product> = await this.find(options);
        return allProduct;
    }

    async deleteProduct(id: number): Promise<boolean> {
        const isDelete: DeleteResult = await this.delete(id);
        return isDelete.affected > 0;
    }
}