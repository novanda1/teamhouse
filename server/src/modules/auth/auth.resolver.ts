import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlUser } from 'src/shared/decorators';
import { getExpirationToken } from 'src/utils/getExpirationToken';
import { validateRegister } from 'src/utils/validateRegister';
import { CreateUserInput, LoginUserInput } from '../users/dto/user-inputs.dto';
import {
  RefreshTokenResponse,
  User,
  UserResponse,
} from '../users/schema/user.schema';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { GraphqlAuthGuard } from './guards/graphql-auth.guard';
import { MeQueryResponse } from './schema/token.schema';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly auth: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Mutation(() => UserResponse, { name: 'login' })
  async login(
    @Args('input') input: LoginUserInput,
    @Context() { res },
  ): Promise<UserResponse> {
    const user = await this.userService.validateUser(input);

    if (!user?.errors) {
      const token = await this.auth.generateAccessToken(user.user);
      const refresh_token = await this.auth.generateRefreshToken(
        user.user,
        jwtConstants.refreshTokenExpires,
      );

      user.tokens = {
        accessToken: {
          token: token.access_token,
          expires: getExpirationToken(jwtConstants.expireIn),
        },
        refreshToken: {
          token: refresh_token.access_token,
          expires: getExpirationToken(jwtConstants.refreshTokenExpires),
        },
      };

      res.cookie(jwtConstants.cookieName, token.access_token);
      res.cookie(jwtConstants.refreshTokenKey, refresh_token.access_token);
    }

    return user;
  }

  @Mutation(() => UserResponse, { name: 'register' })
  async register(
    @Args('options') options: CreateUserInput,
    @Context() { res },
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }
    const user = await this.userService.create(options);
    const userFound = await this.userService.findOne(options.username);

    if (!user.errors && userFound) {
      const token = await this.auth.generateAccessToken(userFound);
      const refresh_token = await this.auth.generateRefreshToken(
        userFound,
        jwtConstants.refreshTokenExpires,
      );

      res.cookie(jwtConstants.cookieName, token.access_token);
      res.cookie(jwtConstants.refreshTokenKey, refresh_token.access_token);
    }

    return user;
  }

  @Mutation(() => RefreshTokenResponse, { name: 'refreshToken' })
  async refreshToken(@Context() { req, res }): Promise<RefreshTokenResponse> {
    const { token } = await this.auth.createAccessTokenFromRefreshToken(
      req.cookies[jwtConstants.refreshTokenKey],
    );

    if (token.access_token) {
      res.cookie(jwtConstants.cookieName, token.access_token);
      return {
        status: 'success',
        token: token.access_token,
      };
    }

    return {
      status: 'failed',
      token: '',
    };
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => MeQueryResponse, { name: 'me' })
  async me(
    @GqlUser() user: User,
    @Context() { req },
  ): Promise<MeQueryResponse> {
    const u = await this.userService.findOne(user?.username);
    const accessTokenValid = await this.auth.isTokenVerified(
      req.cookies[jwtConstants.cookieName],
    );
    const refreshTokenValid = await this.auth.isTokenVerified(
      req.cookies[jwtConstants.refreshTokenKey],
    );

    return {
      user: u,
      tokens: {
        accessTokenValid,
        refreshTokenValid,
      },
    };
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Boolean, { name: 'logout' })
  logout(@Context() { res }) {
    return new Promise((resolve) => {
      res.clearCookie(jwtConstants.cookieName);
      res.clearCookie(jwtConstants.refreshTokenKey);

      resolve(true);
    });
  }
}
