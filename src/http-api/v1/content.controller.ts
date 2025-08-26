import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ContentService } from '../../modules/content/application/content.service';
import { CreateTaskDto } from '../../modules/content/application/dto/create-task.dto';
import { PublishTaskDto } from '../../modules/content/application/dto/publish-task.dto';
import { JwtAuthGuard } from '../../modules/auth/infra/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateTopicDto } from '../../modules/content/application/dto/create-topic.dto';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('topics')
  createTopic(@Body() dto: CreateTopicDto) {
    return this.contentService.createTopic(dto);
  }

  @Get('topics')
  getAllTopics() {
    return this.contentService.getAllTopics();
  }

  @Get('topics/:id')
  getTopicById(@Param('id') id: string) {
    return this.contentService.getTopicById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('tasks')
  createTask(@Body() dto: CreateTaskDto, @Request() req) {
    return this.contentService.createTask(dto, req.user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('tasks/publish')
  publishTask(@Body() dto: PublishTaskDto) {
    return this.contentService.publishTask(dto.taskId);
  }

  @Get('tasks/:id')
  getTask(@Param('id') taskId: string) {
    return this.contentService.getTask(taskId);
  }

  @Get('topics/:id/tasks')
  getTasksByTopic(@Param('id') topicId: string) {
    return this.contentService.getTasksByTopic(topicId);
  }
}
