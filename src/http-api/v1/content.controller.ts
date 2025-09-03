import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Request,
  Put,
  Delete,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseFilePipeBuilder } from '@nestjs/common';
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Put('topics/:id')
  editTopic(@Param('id') id: string, @Body() dto: CreateTopicDto) {
    return this.contentService.updateTopic(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete('topics/:id')
  deleteTopic(@Param('id') id: string) {
    return this.contentService.deleteTopic(id);
  }

  @Get('topics')
  getAllTopics() {
    return this.contentService.getAllTopics();
  }

  @Get('topics/:id')
  getTopicById(@Param('id') id: string) {
    return this.contentService.getTopicById(id);
  }

  @Get('tasks')
  getAllTasks() {
    return this.contentService.getAllTasks();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('tasks')
  @UseInterceptors(FileInterceptor('image')) // ← ожидаем файл с именем "image" (необязательный)
  createTask(
    @Body() dto: CreateTaskDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 5 * 1024 * 1024 })
        .addFileTypeValidator({ fileType: /image\/(png|jpe?g|webp|gif)$/ })
        .build({ fileIsRequired: false }),
    )
    image: Express.Multer.File | undefined,
    @Request() req: any,
  ) {
    return this.contentService.createTask(dto, req.user.sub, image); // передаём файл в сервис
  }

  @UseGuards(JwtAuthGuard)
  @Get('tasks/progress')
  async getUserProgress(@Req() req: any) {
    const userId = req.user.sub;
    console.log(userId);
    return this.contentService.getUserProgress(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Put('tasks/:id')
  updateTask(@Param('id') id: string, @Body() dto: CreateTaskDto) {
    return this.contentService.updateTask(dto, id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete('tasks/:id')
  deleteTask(@Param('id') id: string) {
    return this.contentService.deleteTask(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('tasks/publish')
  publishTask(@Body() dto: PublishTaskDto) {
    return this.contentService.publishTask(dto.taskId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('tasks/drafts')
  getDraftTasks() {
    return this.contentService.getDraftTasks();
  }

  @Get('tasks/:id')
  getTask(@Param('id') taskId: string) {
    return this.contentService.getTask(taskId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('tasks/:id/submit')
  async submitAnswer(
    @Param('id') taskId: string,
    @Body('answer') answer: string,
    @Req() req: any,
  ) {
    const userId = req.user.sub;
    return this.contentService.checkAnswer(taskId, userId, answer);
  }

  @Get('topics/:id/tasks')
  getTasksByTopic(@Param('id') topicId: string) {
    return this.contentService.getTasksByTopic(topicId);
  }
}
