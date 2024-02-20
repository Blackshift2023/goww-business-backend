import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateProductDto {
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