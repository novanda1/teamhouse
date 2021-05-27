import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from './schema/user.schema';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => User, { name: 'user' })
  async find(@Args('id') id: string): Promise<User> {
    return await this.userService.findById(id);
  }

  @Query(() => [User], { name: 'usersByIds' })
  async finds(@Args('ids', { type: () => [String] }) ids: string[]) {
    return await this.userService.findByIds(ids);
  }
}
