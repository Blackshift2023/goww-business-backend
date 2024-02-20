import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsIn, IsOptional, IsString, isString } from "class-validator";
import { UserTypeEnum } from "src/modules/users/enum/user_type.enum";

export class CreateAuthDto {
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
    @IsIn([UserTypeEnum.CUSTOMER, UserTypeEnum.ADMIN, UserTypeEnum.OWNER, UserTypeEnum.SUPER_OWNER])
    readonly user_type: string;

    @ApiProperty({ example: 'groww business' })
    @IsString()
    @IsOptional()
    readonly company_name: string;

    @ApiProperty({ example: 1 })
    status: boolean;    

    @ApiProperty({ example: '556655' })
    @IsString()
    otp: string;

    @ApiProperty({ example: '$2b$20$cQ25ot5TqAIGn1Pic2rCNenN2aDrFAxk83OKlvioKFskwVwcJ5R8O' })
    @IsString()
    token: string;
    
}
