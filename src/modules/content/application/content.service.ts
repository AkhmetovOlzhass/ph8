import { Injectable, NotFoundException } from '@nestjs/common';
import { ContentRepository } from '../infra/content.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { OutboxPublisher } from '../infra/outbox.publisher';
import { CreateTopicDto } from './dto/create-topic.dto';

@Injectable()
export class ContentService {
  constructor(
    private readonly repo: ContentRepository,
    private readonly outbox: OutboxPublisher,
  ) {}

  createTopic(dto: CreateTopicDto) {
    return this.repo.createTopic(dto);
  }

  getTopicById(id: string) {
    return this.repo.getTopicById(id);
  }

  getAllTopics() {
    return this.repo.getAllTopics();
  }

  createTask(dto: CreateTaskDto, authorId: string) {
    return this.repo.createTask(dto, authorId);
  }

  async publishTask(taskId: string) {
    const task = await this.repo.publishTask(taskId);
    if (!task) throw new NotFoundException('Task not found');
    this.outbox.publishTaskPublishedEvent(task.id);
    return task;
  }

  getDraftTasks() {
    return this.repo.getDraftTasks();
  }

  getTask(taskId: string) {
    return this.repo.getTaskById(taskId);
  }

  getTasksByTopic(topicId: string) {
    return this.repo.getTasksByTopic(topicId);
  }
}
