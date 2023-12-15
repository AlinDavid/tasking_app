import { ITask } from './task';

export interface IServiceTaskGetByIdResponse {
  status: number;
  message: string;
  task: ITask | null;
  errors: { [key: string]: any };
}
