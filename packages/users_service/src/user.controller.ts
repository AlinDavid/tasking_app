import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './services/user.service';
import { IUser } from './interfaces/user';
import { IUserCreateResponse } from './interfaces/user-create-response';
import { IUserSearchResponse } from './interfaces/user-search-response';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('user_create')
  public async createUser(
    @Body() userParams: IUser,
  ): Promise<IUserCreateResponse> {
    const { email } = userParams;

    try {
      const usersWithEmail = await this.userService.searchUser({
        email,
      });

      if (usersWithEmail && usersWithEmail.length > 0) {
        return {
          status: HttpStatus.CONFLICT,
          message: 'Email already exists',
          user: null,
          errors: new ConflictException(),
        };
      }

      const createdUser = await this.userService.createUser(userParams);

      return {
        status: HttpStatus.CREATED,
        message: 'User succesfully created',
        errors: {},
        user: createdUser,
      };
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
        user: null,
        errors: new BadRequestException(),
      };
    }
  }

  @MessagePattern('user_search_by_credentials')
  public async searchUserByCredentials(searchParams: {
    email: string;
    password: string;
  }): Promise<IUserSearchResponse> {
    const { email, password } = searchParams;
    const user = await this.userService.searchUser({ email });

    if (user && user[0]) {
      if (await user[0].compareEncryptedPassword(password)) {
        return {
          status: HttpStatus.OK,
          message: 'User found with success',
          user: user[0],
          errors: null,
        };
      } else {
        return {
          status: HttpStatus.NOT_FOUND,
          message: "User not found - credentials don't match",
          user: null,
          errors: new NotFoundException(),
        };
      }
    }

    return {
      status: HttpStatus.NOT_FOUND,
      message: "User not found - user doesn't exist",
      user: null,
      errors: new NotFoundException(),
    };
  }

  @MessagePattern('user_get_by_id')
  public async getUserById(id: string): Promise<IUserSearchResponse> {
    try {
      const user = await this.userService.getUserById(id);

      return {
        status: HttpStatus.OK,
        message: 'User found with success',
        user: user,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'User not found',
        user: null,
        errors: new NotFoundException(),
      };
    }
  }
}
