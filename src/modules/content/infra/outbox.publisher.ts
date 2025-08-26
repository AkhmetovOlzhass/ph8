import { Injectable } from '@nestjs/common';

@Injectable()
export class OutboxPublisher {
  publishTaskPublishedEvent(taskId: string) {
    console.log(`[OUTBOX] Task published: ${taskId}`);
  }
}
