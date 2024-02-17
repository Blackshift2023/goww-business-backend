import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserGenderEnum } from "../enum/user_gender.enum";
import { UserTypeEnum } from "../enum/user_type.enum";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  login: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  firstname: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lastname: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  phone_number: string;

  @Column({
    type: 'enum',
    nullable: true,
    enum: [UserGenderEnum.MALE, UserGenderEnum.FEMALE, UserGenderEnum.OTHER],
    default: null,
  })
  gender: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'datetime', nullable: true })
  last_login: Date;

  @Column({ type: 'text', nullable: true })
  token: string;

  @Column({ type: 'bool', nullable: true, default: () => 0 })
  status: boolean;

  @Column({ type: 'varchar', length: 255, unique: false, nullable: true })
  company_name: string;

  @Column({
    type: 'enum',
    nullable: true,
    enum: [UserTypeEnum.SUPER_OWNER, UserTypeEnum.ADMIN, UserTypeEnum.OWNER, UserTypeEnum.CUSTOMER],
    default: null,
  })
  user_type: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  public updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', default: () => null })
  public deleted_at: Date;
}
