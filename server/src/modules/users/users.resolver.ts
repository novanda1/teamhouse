import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from './schema/user.schema';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => User, { name: 'user' })
  async find(@Args('username') username: string): Promise<User> {
    return await this.userService.find(username);
  }

  @Query(() => [User], { name: 'usersByUsernames' })
  async finds(
    @Args('usernames', { type: () => [String] }) usernames: string[],
  ) {
    return await this.userService.finds(usernames);
  }
}
