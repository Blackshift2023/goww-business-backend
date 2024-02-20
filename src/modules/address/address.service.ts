import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { validate } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressRepository } from './address.repository';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressRepository)
    private addressRepository: AddressRepository
  ) { }

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    await this.createAndUpdateAddressValidation(createAddressDto);
    const saveAddress = await this.addressRepository.createAddress(createAddressDto);
    return saveAddress;
  }

  async findAll(): Promise<Array<Address>> {
    const getByUserAllAddess: Array<Address> = await this.addressRepository.getByUserAllAddress();
    return getByUserAllAddess;
  }

  async findOne(id: number): Promise<Address> {
    const getAddress: Address = await this.addressRepository.getByIdAddress(id);
    return getAddress;
  }

  async update(id: number, updateAddressDto: UpdateAddressDto): Promise<Address> {
    await this.createAndUpdateAddressValidation(updateAddressDto);
    const updateAddress: Address = await this.addressRepository.updateAddress(id, updateAddressDto);
    return updateAddress;
  }

  async remove(id: number): Promise<boolean> {
    const isDelete: boolean = await this.addressRepository.deleteAddress(id);
    return isDelete;
  }

  async createAndUpdateAddressValidation(dto: UpdateAddressDto | CreateAddressDto) {
    const validationErrors = await validate(dto);
    if (validationErrors.length > 0) {
      throw new HttpException(
        { message: 'Validation failed', errors: validationErrors },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
