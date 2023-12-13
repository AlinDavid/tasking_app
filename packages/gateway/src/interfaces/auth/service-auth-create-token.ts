export interface IServiceAuthCreateToken {
  status: number;
  message: string;
  accessToken: string;
  errors: { [key: string]: any };
}
