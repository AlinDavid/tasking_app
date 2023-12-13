import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto } from './interfaces/user/dto/create-user';
import { CreateUserResponseDto } from './interfaces/user/dto/create-user-response';
import { IServiceUserCreateResponse } from './interfaces/user/service-user-create-response';
import { LoginUserDto } from './interfaces/auth/dto/login-user';
import { LoginUserResponseDto } from './interfaces/auth/dto/login-user-response';
import { IServiceUserSearchResponse } from './interfaces/user/service-user-search-response';
import { IServiceAuthCreateToken } from './interfaces/auth/service-auth-create-token';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    @Inject('USERS_SERVICE') private readonly userServiceClient: ClientProxy,
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: CreateUserResponseDto,
  })
  public async createUser(
    @Body() userRequest: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    const createdUserResponse: IServiceUserCreateResponse =
      await firstValueFrom(
        this.userServiceClient.send('user_create', userRequest),
      );

    if (createdUserResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: createdUserResponse.message,
          data: null,
          errors: createdUserResponse.errors,
        },
        createdUserResponse.status,
      );
    }

    return {
      message: createdUserResponse.message,
      data: {
        user: createdUserResponse.user,
      },
      errors: null,
    };
  }

  @Post('/login')
  @ApiCreatedResponse({ type: LoginUserResponseDto })
  public async loginUser(
    @Body() userRequest: LoginUserDto,
  ): Promise<LoginUserResponseDto> {
    const getUserResponse: IServiceUserSearchResponse = await firstValueFrom(
      this.userServiceClient.send('user_search_by_credentials', userRequest),
    );

    if (getUserResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: getUserResponse.message,
          data: null,
          errors: getUserResponse.errors,
        },
        getUserResponse.status,
      );
    }

    const createTokenResponse: IServiceAuthCreateToken = await firstValueFrom(
      this.authServiceClient.send('token_create', {
        userId: getUserResponse.user.id,
        email: userRequest.email,
      }),
    );

    // We assume that the token creation cannot fail from an obvious reason
    return {
      message: createTokenResponse.message,
      data: {
        accessToken: createTokenResponse.accessToken,
      },
      errors: null,
    };
  }
}
