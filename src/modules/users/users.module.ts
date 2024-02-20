import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from 'src/custom-repository/typeorm-ex.module';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { OtpService } from 'src/utils/otp.service';
import { EmailModule } from 'src/services/email/email.module';
import { EmailService } from 'src/services/email/email.service';
import { FirebaseService } from 'src/services/firebase/firebase-admin.service';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository,OtpService, EmailService, FirebaseService],
})
export class UsersModule {}
