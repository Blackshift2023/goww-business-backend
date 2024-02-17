import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsIn, IsOptional, IsString, isString } from "class-validator";
import { UserTypeEnum } from "../enum/user_type.enum";

export class CreateUserDto {
    @ApiProperty({ example: 'groww@businuss.com' })
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiProperty({ example: '9876587432' })
    @IsString()
    @IsOptional()
    phone_number: string;

    @ApiProperty({
        enum: [UserTypeEnum.CUSTOMER, UserTypeEnum.ADMIN, UserTypeEnum.OWNER, UserTypeEnum.SUPER_OWNER],
    })
    @IsString()
    @IsOptional()
    @IsIn([UserTypeEnum.CUSTOMER, UserTypeEnum.ADMIN, UserTypeEnum.OWNER, UserTypeEnum.SUPER_OWNER])
    readonly user_type: string;

    @ApiProperty({ example: 'groww business' })
    @IsString()
    @IsOptional()
    readonly company_name: string;

    @ApiProperty({ example: 1 })
    @IsOptional()
    status: boolean;
}
