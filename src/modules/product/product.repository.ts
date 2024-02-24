import { DataSource, DeleteResult, FindManyOptions, Like, Repository, SelectQueryBuilder } from "typeorm";
import { Product } from "./entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { SortEnum } from "src/common/enum/sort.enum";
import { QuertDto } from "src/common/dtos/query.dto";
import { Injectable } from "@nestjs/common";
import { IPaginationMeta, IPaginationOptions, Pagination, paginate } from "nestjs-typeorm-paginate";
import { DatabaseConatant } from "src/common/constant/database.constant";

@Injectable()
export class ProductRepository extends Repository<Product> {
    constructor(private readonly dataSource: DataSource) {
        super(Product, dataSource.createEntityManager());
    }

    async careteProduct(product: CreateProductDto): Promise<Product> {
        const create: Product = this.create({
            name: product.name,
            description: product.description,
            categoryId: product.categoryId
        });
        const save: Product = await this.save(create);
        return save;
    }

    async updateProduct(id: number, product: UpdateProductDto): Promise<Product> {
        const getProduct: Product = await this.findOne({ where: { id } });
        const update: Product = Object.assign(getProduct, product);
        const save: Product = await this.save(update);
        return save;
    }

    async getByIdProduct(id: number, query: QuertDto): Promise<Product> {
        const options: FindManyOptions<Product> = {
            where: { id }
        };
        query && (typeof query.includes === 'string') ? (options.relations = [query.includes]) : query.includes && (options.relations = query.includes);
        const category: Product = await this.findOne(options);
        return category;
    }

    async getAllProduct(query: QuertDto): Promise<Pagination<Product, IPaginationMeta>> {
        const { keyword, sort, limit, page } = query;

        const option: IPaginationOptions = {
            limit: limit || DatabaseConatant.LIMIT,
            page: page || DatabaseConatant.PAGE
        };

        const qb: SelectQueryBuilder<Product> = this.createQueryBuilder('product');
        qb.orderBy('product.updatedDate', sort || SortEnum.ASC);
        keyword && qb.andWhere('(product.name LIKE :keyword OR product.description LIKE :keyword)', { keyword: `%${keyword}%` })
        qb.loadRelationCountAndMap('product.variantCount', 'product.variant');

        const allProduct: Pagination<Product, IPaginationMeta> = await paginate<Product>(qb, option);

        return allProduct;
    }

    async deleteProduct(id: number): Promise<boolean> {
        const isDelete: DeleteResult = await this.delete(id);
        return isDelete.affected > 0;
    }
}