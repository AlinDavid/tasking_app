import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'test task' })
  title: string;
  @ApiProperty({ example: 'test task description' })
  description: string;
  @ApiProperty({ example: new Date() })
  dueDate: Date;
}
