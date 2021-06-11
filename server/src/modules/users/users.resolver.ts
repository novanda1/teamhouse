import { UseGuards } from '@nestjs/common';
import {
  Args,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { GqlUser } from 'src/shared/decorators';
import { GqlResponse } from 'src/types/graphql';
import GqlNotUserResponse from 'src/utils/GqlNotUserResponse';
import { GraphqlAuthGuard } from '../auth/guards/graphql-auth.guard';
import { UpdateUserInput } from './dto/user-inputs.dto';
import { User } from './schema/user.schema';
import { UsersService } from './users.service';

/**
 * @todo make this fully generated class
 * problem: cant pass Obj on @Field
 */
@ObjectType()
class UserDataResponse<T> extends GqlResponse {
  @Field(() => User, { nullable: true })
  data?: T;
}

@ObjectType()
class UsersDataResponse<T> extends GqlResponse {
  @Field(() => [User], { nullable: true })
  data?: T;
}

@Resolver()
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(GraphqlAuthGuard)
  @Query(() => UserDataResponse, { name: 'user' })
  async find(
    @Args('username') username: string,
    @GqlUser() user,
  ): Promise<UserDataResponse<User>> {
    if (!user) return GqlNotUserResponse;
    const u = await this.userService.find(username);

    return {
      status: 'success',
      data: u,
    };
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => UsersDataResponse, { name: 'usersByUsernames' })
  async finds(
    @Args('usernames', { type: () => [String] }) usernames: string[],
    @GqlUser() user,
  ): Promise<UsersDataResponse<[User]>> {
    if (!user) return GqlNotUserResponse;

    const users = (await this.userService.finds(usernames)) as [User];
    return {
      status: 'success',
      data: users,
    };
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => User, { name: 'updateUser' })
  async update(
    @Args('options') options: UpdateUserInput,
    @GqlUser() user,
  ): Promise<User> {
    const id = user.id;
    return await this.userService.update(id, options);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => [User], { name: 'searchUser' })
  async search(@Args('query') query: string): Promise<User[]> {
    return await this.userService.search(query);
  }
}
