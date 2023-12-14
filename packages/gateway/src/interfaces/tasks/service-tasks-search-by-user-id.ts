import { ITask } from './task';

export interface IServiceTaskSearchByUserIdResponse {
  status: number;
  message: string;
  tasks: ITask[];
  errors: { [key: string]: any };
}
