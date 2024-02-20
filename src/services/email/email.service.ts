import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import 'dotenv/config';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    const transportOptions: any = {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT), // Ensure port is a number
        secure: false,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      };
  
      this.transporter = nodemailer.createTransport(transportOptions);
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    try {
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to,
        subject,
        text,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
