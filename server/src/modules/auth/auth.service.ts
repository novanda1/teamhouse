import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenExpiredError } from 'jsonwebtoken';
import * as ms from 'ms';
import { User } from '../users/schema/user.schema';
import { UsersService } from '../users/users.service';
import { RefreshTokenService } from './refreshToken.service';
import { RefreshToken } from './schema/token.schema';

export interface RefreshTokenPayload {
  username: string;
  user_id: string;
  jwtId: string;
  expiresIn: number;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private token: RefreshTokenService,
  ) {}

  async generateAccessToken(user: User) {
    const payload = { username: user?.username, _id: user?._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async generateRefreshToken(user: User, expiresIn: number) {
    const token = this.token.createRefreshToken(user, ms(expiresIn));

    const payload = {
      username: user?.username,
      user_id: user?._id,
      jwtId: String((await token)._id),
    };

    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn,
      }),
    };
  }

  async validateUser(payload: any) {
    const user = await this.usersService.findOne(payload.username);

    return user;
  }

  public async resolveRefreshToken(
    encoded: string,
  ): Promise<{ user: User; token: RefreshToken }> {
    const payload = await this.decodeRefreshToken(encoded);
    const token = await this.getStoredTokenFromRefreshTokenPayload(payload);

    if (!token) {
      throw new UnprocessableEntityException('Refresh token not found');
    }

    if (token.is_revoked) {
      throw new UnprocessableEntityException('Refresh token revoked');
    }

    const user = await this.getUserFromRefreshTokenPayload(payload);

    if (!user) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return { user, token };
  }

  public async createAccessTokenFromRefreshToken(
    refresh: string,
  ): Promise<{ token: { access_token: string }; user: User }> {
    const { user } = await this.resolveRefreshToken(refresh);

    const token = await this.generateAccessToken(user);

    return { token, user };
  }

  private async decodeRefreshToken(
    token: string,
  ): Promise<RefreshTokenPayload> {
    try {
      return this.jwtService.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnprocessableEntityException('Refresh token expired');
      } else {
        throw new UnprocessableEntityException('Refresh token malformed');
      }
    }
  }

  private async getUserFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<User> {
    const subId = payload.user_id;

    if (!subId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return this.usersService.findById(subId);
  }

  private async getStoredTokenFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<RefreshToken | null> {
    const userId = payload.user_id;

    if (!userId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return this.token.findTokenByUserId(userId);
  }
}
