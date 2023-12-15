import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('USERS_SERVICE') private readonly usersService: ClientProxy,
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const secured = this.reflector.get('secured', context.getHandler());

    if (!secured) return true;

    const request = context.switchToHttp().getRequest();
    const userTokenInfo = await firstValueFrom(
      this.authService.send(
        'token_decode',
        request.headers.authorization.split(' ')[1],
      ),
    );

    if (userTokenInfo.status === HttpStatus.UNAUTHORIZED) {
      throw new HttpException(
        {
          message: userTokenInfo.message,
          data: null,
          errors: userTokenInfo.errors,
        },
        userTokenInfo.status,
      );
    }

    const userInfo = await firstValueFrom(
      this.usersService.send('user_get_by_id', userTokenInfo.data.id),
    );

    if (!userInfo.user) {
      throw new HttpException(
        {
          message: 'Invalid token',
          data: null,
          errors: new UnauthorizedException(),
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    request.user = userInfo.user;
    return true;
  }
}
