import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";
import { AddressEnum } from "src/common/enum/Address.enum";

export class CreateAddressDto {
    @ApiProperty({ example: '+91 1111111111' })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(15)
    mobile: string;

    @ApiProperty({ example: 'xyz xyz' })
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @ApiProperty({ example: '1234 Test Street' })
    @IsNotEmpty()
    @IsString()
    address: string;

    @ApiProperty({ example: 'City' })
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty({ example: 'state' })
    @IsNotEmpty()
    @IsString()
    state: string;

    @ApiProperty({ example: 'country' })
    @IsNotEmpty()
    @IsString()
    country: string;

    @ApiProperty({ example: AddressEnum.Billing })
    type: AddressEnum

    @ApiProperty({ example: 123123 })
    @IsNotEmpty()
    @IsNumber()
    zinCode: number;
}
