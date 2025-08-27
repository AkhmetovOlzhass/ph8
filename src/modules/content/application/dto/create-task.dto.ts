import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, IsArray } from 'class-validator';
import { Difficulty } from '@prisma/client';

export class CreateTaskDto {
  @ApiProperty({ example: 'Physics basics' })
  @IsString()
  title: string;

  @ApiProperty({ example: '## Markdown body\nSome details...' })
  @IsString()
  bodyMd: string;

  @ApiProperty({ enum: Difficulty, example: Difficulty.EASY })
  @IsEnum(Difficulty)
  difficulty: Difficulty;

  @ApiProperty({ example: ['mechanics', 'math'], required: false })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiProperty({ example: 'topic-uuid-1234' })
  @IsString()
  topicId: string;
}
