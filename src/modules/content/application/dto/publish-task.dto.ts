import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PublishTaskDto {
  @ApiProperty({ example: 'task-uuid-1234' })
  @IsString()
  taskId: string;
}
