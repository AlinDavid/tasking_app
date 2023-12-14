import { ITask } from './task';

export interface ITaskCreateResponse {
  status: number;
  message: string;
  task: ITask | null;
  errors: { [key: string]: any };
}
