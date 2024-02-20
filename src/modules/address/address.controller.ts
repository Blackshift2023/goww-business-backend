import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiTags } from '@nestjs/swagger';
import { UrlConstant } from 'src/common/constant/UrlConstant';
import { Address } from './entities/address.entity';

@ApiTags(UrlConstant.ADDRESS)
@Controller(UrlConstant.ADDRESS)
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
    const createAddress: Address = await this.addressService.create(createAddressDto);
    return createAddress;
  }

  @Get()
  async findAll(): Promise<Array<Address>> {
    const getUserByAllAddress: Array<Address> = await this.addressService.findAll();
    return getUserByAllAddress;
  }

  @Get(UrlConstant.PARAM_ID)
  async findOne(@Param(UrlConstant.ID) id: string): Promise<Address> {
    const getAddress: Address = await this.addressService.findOne(+id);
    return getAddress;
  }

  @Patch(UrlConstant.PARAM_ID)
  @UsePipes(new ValidationPipe())
  async update(@Param(UrlConstant.ID) id: string, @Body() updateAddressDto: UpdateAddressDto): Promise<Address> {
    const updateAddress: Address = await this.addressService.update(+id, updateAddressDto);
    return updateAddress;
  }

  @Delete(UrlConstant.PARAM_ID)
  async remove(@Param(UrlConstant.ID) id: string): Promise<boolean> {
    const isDetele: boolean = await this.addressService.remove(+id);
    return isDetele;
  }
}
