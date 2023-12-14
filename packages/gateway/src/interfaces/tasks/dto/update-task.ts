import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../task';

export class UpdateTaskDto {
  @ApiProperty({ required: false, example: 'test task' })
  title: string;
  @ApiProperty({ required: false, example: 'test task description' })
  description: string;
  @ApiProperty({ required: false, example: Status.InProgress })
  status: Status;
  @ApiProperty({ required: false, example: new Date() })
  dueDate: Date;
}
