import { ITask } from './task';

export interface ITaskSearchByUserIdResponse {
  status: number;
  message: string;
  tasks: ITask[];
  errors: { [key: string]: any };
}
