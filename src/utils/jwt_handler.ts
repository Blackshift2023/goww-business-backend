import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtHandler {
  constructor(private jwtService: JwtService) {}

  async jwtToken(payload) {
    const token = await this.jwtService.signAsync(payload);

    return token;
  }
}
