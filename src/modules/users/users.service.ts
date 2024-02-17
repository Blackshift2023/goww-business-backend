import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validate } from 'class-validator';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { IsNull, Not } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ){}

  async createUser(createUserDto: CreateUserDto): Promise<string> {
    const validationErrors = await validate(createUserDto);
    if (validationErrors.length > 0) {
      throw new HttpException(
        { message: 'Validation failed', errors: validationErrors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const {phone_number, email} = createUserDto;
    console.log(phone_number, email)
    const isDeletedUser = await this.userRepository.isCheckDeleteUser(phone_number, email);
    if (isDeletedUser) {
      throw new HttpException(
        { message: 'An archived user with that user name already exists' },
        HttpStatus.BAD_REQUEST,
      );
    }
    console.log(isDeletedUser)
    // const doesUserExist = await this.userRepository.isDoesUserExist(phone_number, email);
    // const doesUserExist = await this.userRepository
    //   .createQueryBuilder('user')
    //   .where('user.email = :userLogin', { userLogin })
    //   .select(['user.login'])
    //   .getOne();

    // if (doesUserExist) {
    //   throw new HttpException(
    //     { message: 'A user with that user name already exists' },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    // Check uniqueness of username
    return "user ";
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
