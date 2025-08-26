import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { CreateTaskDto } from '../application/dto/create-task.dto';
import { CreateTopicDto } from '../application/dto/create-topic.dto';

@Injectable()
export class ContentRepository {
  constructor(private readonly prisma: PrismaService) {}

  createTopic(dto: CreateTopicDto) {
    return this.prisma.topic.create({
      data: {
        title: dto.title,
        slug: dto.slug,
        parentId: dto.parentId,
      },
    });
  }

  getTopicById(id: string) {
    return this.prisma.topic.findUnique({ where: { id } });
  }

  getAllTopics() {
    return this.prisma.topic.findMany();
  }

  createTask(dto: CreateTaskDto, authorId: string) {
    return this.prisma.task.create({
      data: {
        ...dto,
        status: 'DRAFT',
        authorId,
      },
    });
  }

  publishTask(taskId: string) {
    return this.prisma.task.update({
      where: { id: taskId },
      data: { status: 'PUBLISHED' },
    });
  }

  getTaskById(taskId: string) {
    return this.prisma.task.findUnique({ where: { id: taskId } });
  }

  getTasksByTopic(topicId: string) {
    return this.prisma.task.findMany({
      where: { topicId, status: 'PUBLISHED' },
    });
  }
}
