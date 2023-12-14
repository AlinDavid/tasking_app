import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { ITask, Status } from '../task';

export class UpdateTaskResposeDto {
  @ApiProperty({ example: 'Task updated with success' })
  message: string;
  @ApiProperty({
    example: {
      task: {
        id: '5d987c3bfb881ec86b476bcc',
        title: 'test task',
        description: 'test task description',
        assignee: '5d987c3bfb881ec86b476bca',
        status: Status.InProgress,
        dueDate: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: '5d987c3bfb881ec86b476bcd',
      },
    },
    nullable: true,
  })
  data: {
    task: ITask;
  };
  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any };
}
