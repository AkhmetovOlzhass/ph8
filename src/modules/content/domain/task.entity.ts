import { Difficulty, TaskStatus } from '@prisma/client';

export class Task {
  constructor(
    public readonly id: string,
    public title: string,
    public bodyMd: string,
    public difficulty: Difficulty,
    public status: TaskStatus,
    public tags: string[],
    public topicId: string,
    public authorId: string,
  ) {}

  publish() {
    if (this.status !== 'DRAFT') {
      throw new Error('Only draft tasks can be published');
    }
    this.status = 'PUBLISHED';
  }
}
