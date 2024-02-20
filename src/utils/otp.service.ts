// otp.service.ts
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/services/email/email.service';
@Injectable()
export class OtpService {
  // static generateOtp(): any {
  //   throw new Error('Method not implemented.');
  // }

  constructor(private readonly emailService: EmailService) {}

  private async sendOtpEmail(email: string, otp: string): Promise<void> {
    const subject = 'OTP Verification';
    const text = `Your OTP is: ${otp}`;
    this.emailService.sendEmail(email, subject, text); // Send the email
  }
  private generateRandomOtp(): string {
    const randomBytes = crypto.randomBytes(3); // Generate 3 random bytes
    const otp = (randomBytes[0] << 16) + (randomBytes[1] << 8) + randomBytes[2]; // Combine bytes into a single number
    const otpDigits = otp % 1000000; // Ensure OTP is 6 digits by taking modulo 1000000
    return otpDigits.toString();
  }

  async generateOtp(email: string): Promise<string> {
    const otp = this.generateRandomOtp(); // Await the result of bcrypt.hash
    this.sendOtpEmail(email, otp);
    const hashedToken = await bcrypt.hash(email+otp, 10); // Adjust the salt rounds as needed
    return hashedToken;
  }

  verifyOtp(email: string,otp: string, hashedToken: string): boolean {
    console.log(email, otp,hashedToken)
    return bcrypt.compare(email+otp, hashedToken);
  }
  
}
