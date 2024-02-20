import { DataSource, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async isDeletedUser(phone_number, email) {
        return await this.createQueryBuilder('user')
            .where("(user.email = :email OR user.phone_number = :phone_number)", { email, phone_number })
            .andWhere("user.deleted_at IS NOT NULL")
            .withDeleted()
            .getOne();
    }

    async doesUserExist(phone_number, email) {
        return await this.createQueryBuilder('user')
            .where("(user.email = :email OR user.phone_number = :phone_number)", { email, phone_number })
            .andWhere("user.deleted_at IS NULL")
            .getOne();
    }
}