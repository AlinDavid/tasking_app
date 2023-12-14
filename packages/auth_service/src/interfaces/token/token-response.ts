export interface ITokenResponse {
  status: number;
  message: string;
  accessToken: string | null;
  errors: { [key: string]: any };
}
