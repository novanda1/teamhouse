import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlUser } from 'src/shared/decorators';
import { validateRegister } from 'src/utils/validateRegister';
import { CreateUserInput } from '../users/dto/user-inputs.dto';
import {
  RefreshTokenResponse,
  User,
  UserResponse,
} from '../users/schema/user.schema';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { GraphqlAuthGuard } from './guards/graphql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly auth: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Mutation(() => UserResponse, { name: 'login' })
  async login(
    @Args('username')
    username: string,

    @Args('password')
    password: string,
    @Context() { res },
  ): Promise<UserResponse> {
    const user = await this.userService.validateUser(username, password);

    if (!user?.errors) {
      const token = await this.auth.generateAccessToken(user.user);
      const refresh_token = await this.auth.generateRefreshToken(
        user.user,
        jwtConstants.refreshTokenExpires,
      );

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

    if (user) {
      const token = await this.auth.generateAccessToken(user.user);
      const refresh_token = await this.auth.generateRefreshToken(
        user.user,
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
  @Query(() => User, { name: 'me' })
  async me(@GqlUser() user: User) {
    return await this.userService.findOne(user.username);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Boolean, { name: 'logout' })
  logout(@Context() { res }) {
    return new Promise((resolve) => {
      res.clearCookie(jwtConstants.cookieName);

      resolve(true);
    });
  }
}
