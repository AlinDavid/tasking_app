import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/interfaces/user/user';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public async createToken(user: IUser): Promise<string> {
    const { id } = user;

    const accessToken = this.jwtService.sign(
      { id },
      {
        secret: 'bitdefender secret key',
        expiresIn: 30 * 24 * 60 * 60,
      },
    );

    return accessToken;
  }
}
