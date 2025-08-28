import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateTopicDto {
  @ApiProperty({ example: 'Mechanics' })
  @IsString()
  title: string;
}
