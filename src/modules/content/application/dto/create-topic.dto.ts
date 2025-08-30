import { ApiProperty } from '@nestjs/swagger';
import { SchoolClass } from '@prisma/client';
import { IsString, IsOptional, IsEnum } from 'class-validator';

export class CreateTopicDto {
  @ApiProperty({ example: 'Mechanics' })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'TEN',
    enum: SchoolClass,
    description: 'Класс, для которого предназначен топик (SEVEN–ELEVEN)',
  })
  @IsEnum(SchoolClass)
  schoolClass: SchoolClass;
}
