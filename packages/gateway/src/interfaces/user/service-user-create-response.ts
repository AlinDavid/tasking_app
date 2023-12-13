import { IUser } from './user';

export interface IServiceUserCreateResponse {
  status: number;
  message: string;
  user: IUser | null;
  errors: { [key: string]: any };
}
