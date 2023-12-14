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
        expiresIn: '24h',
      },
    );

    return accessToken;
  }

  public async decodeToken(
    accessToken: string,
  ): Promise<{ id: string }> | null {
    try {
      const token: { id: string; exp: number } =
        await this.jwtService.decode(accessToken);

      if (!token || token.exp <= Math.floor(+new Date() / 1000)) return null;

      return {
        id: token.id,
      };
    } catch (error) {
      return null;
    }
  }
}
