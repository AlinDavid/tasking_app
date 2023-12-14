import { IUser } from '../user/user';

export interface IAuthorizedRequest extends Request {
  user?: IUser;
}
