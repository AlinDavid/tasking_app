import { ITask } from './task';

export interface IServiceTaskUpdateByIdResponse {
  status: number;
  message: string;
  task: ITask | null;
  errors: { [key: string]: any };
}
