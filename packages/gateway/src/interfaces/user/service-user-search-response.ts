import { IUser } from './user';

export interface IServiceUserSearchResponse {
  status: number;
  message: string;
  user: IUser | null;
  errors: { [key: string]: any };
}
