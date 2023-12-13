import { IUser } from './user';

export interface IUserCreateResponse {
  status: number;
  message: string;
  user: IUser | null;
  errors: { [key: string]: any } | null;
}
