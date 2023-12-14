import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITask, Status } from 'src/interfaces/task';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<ITask>) {}

  public async createTask(taskBody: ITask & { userId: string }) {
    const taskModel = new this.taskModel({
      ...taskBody,
      status: Status.Todo,
      createdBy: taskBody.userId,
    });

    return await taskModel.save();
  }

  public async getTasksByUserId(id: string): Promise<ITask[]> {
    return this.taskModel.find({ createdBy: id }).exec();
  }

  public async getTaskById(id: string): Promise<ITask> {
    return this.taskModel.findById(id);
  }

  public async deleteTaskById(id: string): Promise<void> {
    return this.taskModel.findOneAndDelete({ _id: id });
  }

  public async updateTaskById(
    id: string,
    taskBody: Partial<ITask>,
  ): Promise<ITask> {
    return this.taskModel.findOneAndUpdate({ _id: id }, taskBody);
  }
}
