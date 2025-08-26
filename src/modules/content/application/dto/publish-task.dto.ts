import { IsString } from 'class-validator';

export class PublishTaskDto {
  @IsString()
  taskId: string;
}
