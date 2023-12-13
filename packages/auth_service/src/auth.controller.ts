import {
  BadRequestException,
  Controller,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ClientProxy } from '@nestjs/microservices';
import { AuthService } from './services/auth.service';
import { IUser } from './interfaces/user/user';

@Controller()
export class AuthController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    private readonly authService: AuthService,
  ) {}

  @MessagePattern('token_create')
  public async createToken(user: IUser) {
    try {
      const accessToken = await this.authService.createToken(user);

      return {
        status: HttpStatus.OK,
        message: `Token Created with success for ${user.email}`,
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
}
