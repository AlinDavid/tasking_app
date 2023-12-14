export interface ITokenDataResponse {
  status: number;
  message: string;
  data: { id: string } | null;
  errors: { [key: string]: any };
}
