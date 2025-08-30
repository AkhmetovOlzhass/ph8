import { Injectable, NotFoundException } from '@nestjs/common';
import { ContentRepository } from '../infra/content.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { OutboxPublisher } from '../infra/outbox.publisher';
import { CreateTopicDto } from './dto/create-topic.dto';
import { ProgressStatus } from "@prisma/client";

@Injectable()
export class ContentService {
  constructor(
    private readonly repo: ContentRepository,
    private readonly outbox: OutboxPublisher,
  ) {}

  createTopic(dto: CreateTopicDto) {
    return this.repo.createTopic(dto);
  }

  updateTopic(id: string, dto: CreateTopicDto){
    return this.repo.updateTopic(id, dto);
  }

  deleteTopic(id: string){
    return this.repo.deleteTopic(id);
  }

  getTopicById(id: string) {
    return this.repo.getTopicById(id);
  }

  getAllTopics() {
    return this.repo.getAllTopics();
  }

  getAllTasks(){
    return this.repo.getAllTasks();
  }

  updateTask(dto: CreateTaskDto, taskId: string){
    return this.repo.updateTask(dto, taskId);
  }

  deleteTask(taskId: string){
    return this.repo.deleteTask(taskId);
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

  async checkAnswer(taskId: string, userId: string, answer: string) {
    const task = await this.repo.getTaskById(taskId);
    if (!task) throw new NotFoundException("Task not found");

    let status: ProgressStatus = "IN_PROGRESS";
    let isCorrect = false;

    switch (task.answerType) {
      case "TEXT":
        isCorrect =
          task.correctAnswer?.toLowerCase().trim() ===
          answer.toLowerCase().trim();
        break;
      case "NUMBER":
        const correct = parseFloat(task.correctAnswer || "0");
        const user = parseFloat(answer);
        isCorrect = Math.abs(correct - user) < 0.001;
        break;
      case "FORMULA":
        isCorrect =
          task.correctAnswer?.replace(/\s+/g, "") ===
          answer.replace(/\s+/g, "");
        break;
    }

    if (isCorrect) status = "SOLVED";

    const progress = await this.repo.upsertProgress(
      userId,
      taskId,
      answer,
      status,
    );
    return {
      correct: isCorrect,
      progress,
    };
  }

  async getUserProgress(userId: string) {
    return this.repo.getUserProgress(userId);
  }

  getTasksByTopic(topicId: string) {
    return this.repo.getTasksByTopic(topicId);
  }
}
