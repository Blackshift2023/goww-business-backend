import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCategoryDto {

    @ApiProperty({ example: 'category name' })
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    name: string;

    @ApiProperty({ example: 'category description' })
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(500)
    description: string;
}
