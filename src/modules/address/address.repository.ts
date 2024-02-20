import { DataSource, DeleteResult, Repository } from "typeorm";
import { Address } from "./entities/address.entity";
import { Injectable } from "@nestjs/common";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";

@Injectable()
export class AddressRepository extends Repository<Address> {
    constructor(private readonly dataSource: DataSource) {
        super(Address, dataSource.createEntityManager());
    }

    async createAddress(addressDto: CreateAddressDto): Promise<Address> {
        const address: Address = this.create({
            address: addressDto.address,
            city: addressDto.city,
            country: addressDto.country,
            fullName: addressDto.fullName,
            mobile: addressDto.mobile,
            state: addressDto.state,
            type: addressDto.type,
            zipCode: addressDto.zinCode
        });
        return await this.save(address);
    }

    async updateAddress(id: number, updateAddressDto: UpdateAddressDto): Promise<Address> {
        const address: Address = await this.getByIdAddress(id);
        for (const key in address) {
            (Object.prototype.hasOwnProperty.call(address, key) && updateAddressDto[key]) &&
                (address[key] = updateAddressDto[key]);
        }
        return await this.save(address);
    }

    async getByIdAddress(id: number): Promise<Address> {
        const address: Address = await this.findOne({ where: { id } });
        return address;
    }

    async getByUserAllAddress(): Promise<Array<Address>> {
        const addresses: Array<Address> = await this.find();
        return addresses;
    }

    async deleteAddress(id: number): Promise<boolean> {
        const isdelete: DeleteResult = await this.delete(id);
        return isdelete.affected > 0;
    }

}