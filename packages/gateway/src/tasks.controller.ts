import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { IAuthorizedRequest } from './interfaces/common/authorized-request';
import { Authorization } from './decorators/authorization.decorator';
import { GetTasksResponseDto } from './interfaces/tasks/dto/get-tasks-response';
import { IServiceTaskSearchByUserIdResponse } from './interfaces/tasks/service-tasks-search-by-user-id';
import { firstValueFrom } from 'rxjs';
import { CreateTaskResponseDto } from './interfaces/tasks/dto/create-task-response';
import { CreateTaskDto } from './interfaces/tasks/dto/create-task-payload';
import { IServiceTaskCreateResponse } from './interfaces/tasks/service-tasks-create-response';
import { TaskIdDto } from './interfaces/tasks/dto/task-id-dto';
import { DeleteTaskDto } from './interfaces/tasks/dto/delete-task-dto';
import { IServiceTaskDeleteResponse } from './interfaces/tasks/service-tasks-delete-response';

@Controller('tasks')
@ApiTags('tasks')
export class TasksController {
  constructor(
    @Inject('TASKS_SERVICE') private readonly tasksService: ClientProxy,
  ) {}

  @Get()
  @Authorization(true)
  @ApiOkResponse({
    type: GetTasksResponseDto,
    description: 'List of tasks for signed in user',
  })
  public async getTasks(
    @Req() request: IAuthorizedRequest,
  ): Promise<GetTasksResponseDto> {
    const userInfo = request.user;

    const tasksResponse: IServiceTaskSearchByUserIdResponse =
      await firstValueFrom(
        this.tasksService.send('task_search_by_user_id', userInfo.id),
      );

    if (tasksResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: tasksResponse.message,
          data: null,
          errors: tasksResponse.errors,
        },
        tasksResponse.status,
      );
    }

    return {
      message: tasksResponse.message,
      data: {
        tasks: tasksResponse.tasks,
      },
      errors: null,
    };
  }

  @Post()
  @Authorization(true)
  @ApiCreatedResponse({ type: CreateTaskResponseDto })
  public async createTask(
    @Req() request: IAuthorizedRequest,
    @Body() taskRequest: CreateTaskDto,
  ): Promise<CreateTaskResponseDto> {
    const userInfo = request.user;

    const createdTaskResponse: IServiceTaskCreateResponse =
      await firstValueFrom(
        this.tasksService.send(
          'task_create',
          Object.assign(taskRequest, { userId: userInfo.id }),
        ),
      );

    if (createdTaskResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: createdTaskResponse.message,
          data: null,
          errors: createdTaskResponse.errors,
        },
        createdTaskResponse.status,
      );
    }

    return {
      message: createdTaskResponse.message,
      data: {
        task: createdTaskResponse.task,
      },
      errors: null,
    };
  }

  @Delete(':id')
  @Authorization(true)
  @ApiOkResponse({ type: DeleteTaskDto })
  public async deleteTask(
    @Req() request: IAuthorizedRequest,
    @Param() params: TaskIdDto,
  ): Promise<DeleteTaskDto> {
    const userInfo = request.user;
    console.log(params);

    const deleteTaskResponse: IServiceTaskDeleteResponse = await firstValueFrom(
      this.tasksService.send('task_delete_by_id', {
        taskId: params.id,
        userId: userInfo.id,
      }),
    );

    if (deleteTaskResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: deleteTaskResponse.message,
          data: null,
          errors: deleteTaskResponse.errors,
        },
        deleteTaskResponse.status,
      );
    }

    return {
      message: deleteTaskResponse.message,
      data: null,
      errors: null,
    };
  }
}
