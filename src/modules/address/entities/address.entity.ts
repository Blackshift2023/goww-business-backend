import { AddressEnum } from 'src/common/enum/address.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 15, nullable: true })
    mobile: string;

    @Column({ length: 100 })
    fullName: string;

    @Column({ length: 200 })
    address: string;

    @Column({ length: 40 })
    city: string;

    @Column({ length: 40 })
    state: string;

    @Column({ length: 40 })
    country: string;

    @Column({ type: 'enum', enum: AddressEnum, default: AddressEnum.Shipping })
    type: AddressEnum;

    @Column({ type: 'int' })
    zipCode: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedDate: Date;
}