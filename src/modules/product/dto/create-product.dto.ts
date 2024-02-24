import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateProductDto {

    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    categoryId: number;

    @ApiProperty({ example: 'product name' })
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    name: string;

    @ApiProperty({ example: 'product description' })
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(500)
    description: string;
}