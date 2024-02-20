import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccountKey from '../../../serviceAccountKey.json'

@Injectable()
export class FirebaseService {
  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),
      });
    }
  }
  async sendOTP(phoneNumber: string): Promise<void> {
    try {
      const otp = Math.floor(100000 + Math.random() * 900000); // Generate random 6-digit OTP
      const message = `Your OTP is: ${otp}`;

      // Send OTP SMS using Firebase Cloud Messaging (FCM)
      const response = await admin.messaging().send({
        notification: {
          title: 'OTP Verification',
          body: message,
        },
        token: phoneNumber, // Assuming phoneNumber is the registration token of the user's device
      });

      console.log('Successfully sent OTP SMS:', response);
    } catch (error) {
      console.error('Error sending OTP SMS:', error);
      throw new Error('Failed to send OTP');
    }
  }
}
