import { Category } from "src/modules/category/entities/category.entity";
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'int', name: 'categoryId' })
    categoryId: number;

    @Column({ type: 'varchar' })
    description: string;

    @ManyToOne(() => Category, category => category.product)
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedDate: Date;

    variantCount: number;
}
