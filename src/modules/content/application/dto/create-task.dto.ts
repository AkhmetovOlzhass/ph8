import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, IsArray } from 'class-validator';
import { Difficulty, AnswerType } from '@prisma/client';

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

  @ApiProperty({ example: 'topic-uuid-1234' })
  @IsString()
  topicId: string;

  @ApiProperty({ example: '## Markdown body\nSome details...' })
  @IsString()
  officialSolution: string;

  @ApiProperty({ example: '## Markdown body\nSome details...' })
  @IsString()
  correctAnswer: string;

  @ApiProperty({ enum: AnswerType, example: AnswerType.TEXT })
  @IsEnum(AnswerType)
  answerType: AnswerType;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
