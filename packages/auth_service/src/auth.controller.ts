import {
  BadRequestException,
  Controller,
  HttpStatus,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ClientProxy } from '@nestjs/microservices';
import { AuthService } from './services/auth.service';
import { IUser } from './interfaces/user/user';
import { ITokenResponse } from './interfaces/token/token-response';
import { ITokenDataResponse } from './interfaces/token/token-data-response';

@Controller()
export class AuthController {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersServiceClient: ClientProxy,
    private readonly authService: AuthService,
  ) {}

  @MessagePattern('token_create')
  public async createToken(user: IUser): Promise<ITokenResponse> {
    try {
      const accessToken = await this.authService.createToken(user);

      return {
        status: HttpStatus.OK,
        message: `Token created with success for ${user.email}`,
        accessToken,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
        accessToken: null,
        errors: new BadRequestException(),
      };
    }
  }

  @MessagePattern('token_decode')
  public async decodeToken(accessToken: string): Promise<ITokenDataResponse> {
    const tokenData = await this.authService.decodeToken(accessToken);

    if (!tokenData) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        message: 'Invalid Token',
        data: null,
        errors: new UnauthorizedException(),
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'Token decoded with success',
      data: { id: tokenData.id },
      errors: null,
    };
  }
}
