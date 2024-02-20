import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/sign-in.dto';
import { UsersService } from '../users/users.service';
import { JwtHandler } from 'src/utils/jwt_handler';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtHandler: JwtHandler,
  ) {}

  async verfiy(createAuthDto: CreateAuthDto) {
    const user = await this.usersService.verify(createAuthDto);
    const payload = { userId: user.id, sub: user };
    return {
      access_token: await this.jwtHandler.jwtToken(payload),
    };
  }
}
