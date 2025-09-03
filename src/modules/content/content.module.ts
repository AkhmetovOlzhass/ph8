import { Module } from '@nestjs/common';
import { ContentService } from './application/content.service';
import { ContentRepository } from './infra/content.repository';
import { OutboxPublisher } from './infra/outbox.publisher';
import { S3StorageService } from '../../infrastructure/storage/s3.service';

@Module({
  providers: [
    ContentService,
    ContentRepository,
    OutboxPublisher,
    S3StorageService,
  ],
  exports: [ContentService],
})
export class ContentModule {}
