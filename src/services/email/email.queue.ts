// email.queue.ts

import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class EmailQueueService {
  constructor(@InjectQueue('email') private readonly emailQueue: Queue) {}

  async addEmailJob(to: string, subject: string, text: string): Promise<void> {
    await this.emailQueue.add('send-email', { to, subject, text });
  }
}
