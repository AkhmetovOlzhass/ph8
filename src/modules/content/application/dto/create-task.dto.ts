import { IsString, IsEnum, IsOptional, IsArray } from 'class-validator';
import { Difficulty } from '@prisma/client';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  bodyMd: string;

  @IsEnum(Difficulty)
  difficulty: Difficulty;

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsString()
  topicId: string;
}
