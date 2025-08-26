import { Module } from '@nestjs/common';
import { ContentService } from './application/content.service';
import { ContentRepository } from './infra/content.repository';
import { OutboxPublisher } from './infra/outbox.publisher';

@Module({
  providers: [ContentService, ContentRepository, OutboxPublisher],
  exports: [ContentService],
})
export class ContentModule {}
