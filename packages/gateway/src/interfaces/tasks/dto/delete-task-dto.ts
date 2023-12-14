import { ApiProperty } from '@nestjs/swagger';

export class DeleteTaskDto {
  @ApiProperty({ example: 'Succesfully delete task 657a864893f351cb744b1a9d' })
  message: string;
  @ApiProperty({ nullable: true, example: null, type: null })
  data: null;
  @ApiProperty({ nullable: true, example: null })
  errors: { [key: string]: any };
}
