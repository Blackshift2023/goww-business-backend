// email.module.ts

import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { EmailQueueService } from './email.queue';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email',
    }),
  ],
  providers: [EmailQueueService],
  exports: [EmailQueueService], // Export the queue service
})
export class EmailModule {}
