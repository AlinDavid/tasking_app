import {
  BadRequestException,
  Controller,
  ForbiddenException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { TaskService } from './services/tasks.service';
import { MessagePattern } from '@nestjs/microservices';
import { ITask } from './interfaces/task';
import { ITaskCreateResponse } from './interfaces/create-task-response';
import { ITaskSearchByUserIdResponse } from './interfaces/get-tasks-by-user-id-response';
import { IDeleteTaskResponse } from './interfaces/delete-task-response';
import { IUpdateTaskResponse } from './interfaces/update-task-response';
import { ITaskGetByTaskId } from './interfaces/get-task-by-task-id-response';

@Controller('task')
export class TaskController {
  constructor(private readonly tasksService: TaskService) {}

  @MessagePattern('task_create')
  public async createTask(
    taskBody: ITask & { userId: string },
  ): Promise<ITaskCreateResponse> {
    try {
      const createdTask = await this.tasksService.createTask(taskBody);

      return {
        status: HttpStatus.CREATED,
        message: 'Task created succesfully',
        task: createdTask,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
        task: null,
        errors: new BadRequestException(),
      };
    }
  }

  @MessagePattern('task_search_by_user_id')
  public async getTasksByUserId(
    id: string,
  ): Promise<ITaskSearchByUserIdResponse> {
    try {
      const tasks = await this.tasksService.getTasksByUserId(id);

      return {
        status: HttpStatus.OK,
        message: `Retrieved succesfully tasks for ${id}`,
        tasks,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: `Error while retrieving tasks for ${id}`,
        tasks: null,
        errors: new BadRequestException(),
      };
    }
  }

  @MessagePattern('task_search_by_task_id')
  public async getTaskByTaskId({
    taskId,
    userId,
  }: {
    taskId: string;
    userId: string;
  }): Promise<ITaskGetByTaskId> {
    try {
      const existentTask = await this.tasksService.getTaskById(taskId);

      if (!existentTask) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: `Task not found with id ${taskId}`,
          task: null,
          errors: new NotFoundException(),
        };
      }

      if (existentTask.createdBy === userId) {
        return {
          status: HttpStatus.OK,
          message: `Succesfully retrieved task ${taskId}`,
          task: existentTask,
          errors: null,
        };
      } else {
        return {
          status: HttpStatus.FORBIDDEN,
          message: 'Not allowed to get this task',
          task: null,
          errors: new ForbiddenException(),
        };
      }
    } catch (error) {
      return {
        status: HttpStatus.FORBIDDEN,
        message: 'Not allowed to get this task',
        task: null,
        errors: new ForbiddenException(),
      };
    }
  }

  @MessagePattern('task_delete_by_id')
  public async deleteTaskForId({
    taskId,
    userId,
  }: {
    taskId: string;
    userId: string;
  }): Promise<IDeleteTaskResponse> {
    try {
      const existentTask = await this.tasksService.getTaskById(taskId);

      if (!existentTask) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: `Task not found with id ${taskId}`,
          data: null,
          errors: new NotFoundException(),
        };
      }

      if (existentTask.createdBy === userId) {
        await this.tasksService.deleteTaskById(taskId);

        return {
          status: HttpStatus.OK,
          message: `Succesfully deleted task ${taskId}`,
          data: null,
          errors: null,
        };
      } else {
        return {
          status: HttpStatus.FORBIDDEN,
          message: 'Not allowed to delete this task',
          data: null,
          errors: new ForbiddenException(),
        };
      }
    } catch (error) {
      return {
        status: HttpStatus.FORBIDDEN,
        message: 'Not allowed to delete this task',
        data: null,
        errors: new ForbiddenException(),
      };
    }
  }

  @MessagePattern('update_task_by_id')
  public async updateTask(
    taskBody: ITask & { userId: string; taskId: string },
  ): Promise<IUpdateTaskResponse> {
    try {
      const existentTask = await this.tasksService.getTaskById(taskBody.taskId);

      if (!existentTask) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: `Couldn't find any task with id ${taskBody.taskId}`,
          task: null,
          errors: new NotFoundException(),
        };
      }

      if (existentTask.createdBy === taskBody.userId) {
        const { taskId, userId, ...updatedTaskPayload } = taskBody;

        const updatedTask = await this.tasksService.updateTaskById(
          taskId,
          updatedTaskPayload,
        );

        return {
          status: HttpStatus.OK,
          message: 'Updated task succesfully',
          task: updatedTask,
          errors: null,
        };
      } else {
        return {
          status: HttpStatus.FORBIDDEN,
          message: 'Not allowed to update this task',
          task: null,
          errors: new ForbiddenException(),
        };
      }
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
        task: null,
        errors: new BadRequestException(),
      };
    }
  }
}
