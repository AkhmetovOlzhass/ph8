import { IsString, IsOptional } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsOptional()
  parentId?: string;
}
