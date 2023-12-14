import { ITask } from './task';

export interface IServiceTaskCreateResponse {
  status: number;
  message: string;
  task: ITask | null;
  errors: { [key: string]: any };
}
