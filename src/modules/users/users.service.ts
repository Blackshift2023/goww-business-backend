import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validate } from 'class-validator';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { IsNull, Not } from 'typeorm';
import { OtpService } from 'src/utils/otp.service';
import { CreateAuthDto } from '../auth/dto/sign-in.dto';
import { RecaptchaVerifier } from 'firebase/auth';
import { FirebaseService } from 'src/services/firebase/firebase-admin.service';
const containerId = 'recaptcha-container';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private readonly otpService: OtpService,
    private readonly firebaseService: FirebaseService
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const validationErrors = await validate(createUserDto);
    if (validationErrors.length > 0) {
      throw new HttpException(
        { message: 'Validation failed', errors: validationErrors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const { phone_number, email } = createUserDto;
    console.log(phone_number, email)
    const isCheckUser = await this.userRepository.isDeletedUser(phone_number, email);
    if (isCheckUser?.deleted_at) {
      throw new HttpException(
        { message: 'An archived user with that user name already exists' },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (email) {
      const otpToken = await this.otpService.generateOtp(email);
      return otpToken
    } else if (phone_number) {
      try {
        return this.firebaseService.sendOTP(phone_number);
      } catch (error) {
        throw new Error('Failed to send verification code');
      }
    }
  }

  async verify(createAuthDto: CreateAuthDto): Promise<any> {
    const { otp, token, email, phone_number, company_name, status, user_type } = createAuthDto
    const verifyToken = await this.otpService.verifyOtp(email, otp, token)
    if (!verifyToken) {
      throw new HttpException(
        { message: 'Please valid OTP Enter' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const doesUserExist = await this.userRepository.doesUserExist(phone_number, email);
    if (doesUserExist) {
      return doesUserExist;
    }

    const newUser = new User();
    newUser.email = email;
    newUser.phone_number = phone_number;
    newUser.status = status;
    newUser.company_name = company_name;
    newUser.user_type = user_type;
    const errors = await validate(newUser);
    if (errors.length > 0) {
      const _errors = { username: 'Userinput is not valid.' };
      throw new HttpException(
        { message: 'User data is not valid', _errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const savedUser = this.userRepository.create(newUser);
    await this.userRepository.save(savedUser);
    return savedUser;
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
