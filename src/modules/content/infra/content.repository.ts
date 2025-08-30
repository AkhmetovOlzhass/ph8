import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { CreateTaskDto } from '../application/dto/create-task.dto';
import { CreateTopicDto } from '../application/dto/create-topic.dto';
import { ProgressStatus } from "@prisma/client";

import slugify from "slugify";

@Injectable()
export class ContentRepository {
  constructor(private readonly prisma: PrismaService) {}

  createTopic(dto: CreateTopicDto) {
      const slug = slugify(dto.title, {
    lower: true,
    strict: true,
    trim: true,
  });
    return this.prisma.topic.create({
      data: {
        title: dto.title,
        slug,
        schoolClass: dto.schoolClass,
      },
    });
  }

  updateTopic(id: string, dto: CreateTopicDto) {
    const slug = slugify(dto.title, {
      lower: true,
      strict: true,
      trim: true,
    });
    return this.prisma.topic.update({
      where: { id },
      data: {
        title: dto.title,
        slug,
        schoolClass: dto.schoolClass
      },
    })
  }

async deleteTopic(id: string) {
  return this.prisma.topic.delete({
    where: { id }, 
  })
}

  getTopicById(id: string) {
    return this.prisma.topic.findUnique({ where: { id } });
  }

  getAllTopics() {
    return this.prisma.topic.findMany();
  }

getAllTasks() {
  return this.prisma.task.findMany({
    where: {
      NOT: {
        status: 'DRAFT',
      },
    },
  });
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

  updateTask(dto: CreateTaskDto, taskId: string) {
    return this.prisma.task.update({
      where: { id: taskId },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    });
  }

  deleteTask(taskId: string) {
    return this.prisma.task.delete({
      where: { id: taskId },
    });
  }

  publishTask(taskId: string) {
    return this.prisma.task.update({
      where: { id: taskId },
      data: { status: 'PUBLISHED' },
    });
  }

  getDraftTasks() {
    return this.prisma.task.findMany({
      where: { status: 'DRAFT' },
      include: { topic: true },
    });
  }

  getTaskById(taskId: string) {
    return this.prisma.task.findUnique({ where: { id: taskId } });
  }

  async upsertProgress(userId: string, taskId: string, answer: string, status: ProgressStatus) {
    return this.prisma.userTaskProgress.upsert({
      where: { userId_taskId: { userId, taskId } },
      update: { lastAnswer: answer, attempts: { increment: 1 }, status },
      create: { userId, taskId, lastAnswer: answer, attempts: 1, status },
    });
  }

  async getUserProgress(userId: string) {
    return this.prisma.userTaskProgress.findMany({
      where: { userId },
      include: { task: true },
    });
  }

  getTasksByTopic(topicId: string) {
    return this.prisma.task.findMany({
      where: { topicId, status: 'PUBLISHED' },
    });
  }
}
