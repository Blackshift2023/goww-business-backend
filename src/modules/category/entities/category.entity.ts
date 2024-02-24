import { Product } from "src/modules/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar' })
    description: string;

    @OneToMany(() => Product, product => product.category)
    product: Product[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedDate: Date;

    productCount: number;
}
