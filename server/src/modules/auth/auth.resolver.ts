import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlUser } from 'src/shared/decorators';
import { validateRegister } from 'src/utils/validateRegister';
import { CreateUserInput } from '../users/dto/user-inputs.dto';
import { UserResponse, User } from '../users/schema/user.schema';
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

    if (user) {
      const token = await this.auth.getToken(user.user);
      res.cookie(jwtConstants.cookieName, token.access_token);
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
      const token = await this.auth.getToken(user.user);
      res.cookie(jwtConstants.cookieName, token.access_token);
    }

    return user;
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
