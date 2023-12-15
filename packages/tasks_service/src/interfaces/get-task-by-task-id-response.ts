import { ITask } from './task';

export interface ITaskGetByTaskId {
  status: number;
  message: string;
  task: ITask;
  errors: { [key: string]: any };
}
