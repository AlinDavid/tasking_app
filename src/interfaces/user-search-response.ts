import { IUser } from './user';

export interface IUserSearchResponse {
  status: number;
  message: string;
  user: IUser | null;
  errors: { [key: string]: any } | null;
}
