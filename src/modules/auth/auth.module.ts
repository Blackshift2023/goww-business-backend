import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { JwtHandler } from '../../utils/jwt_handler';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { OtpService } from 'src/utils/otp.service';
import { EmailService } from 'src/services/email/email.service';
import { UserRepository } from '../users/user.repository';
import { FirebaseService } from 'src/services/firebase/firebase-admin.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_KEY'),
        };
      },
      inject: [ConfigService],
      global: true,
    }),
    JwtModule.register({
      signOptions: { expiresIn: '7d' },
    }),
    ConfigModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
    JwtHandler,
    UserRepository,
    UsersService,
    OtpService,
    EmailService,
    FirebaseService
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
