import { ITask } from './task';

export interface IUpdateTaskResponse {
  status: number;
  message: string;
  task: ITask | null;
  errors: { [key: string]: any };
}
