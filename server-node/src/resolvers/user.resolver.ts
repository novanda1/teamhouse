import { COOKIE_NAME } from '../lib/constants';
import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  PubSub,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { CreateUserDTO } from '../lib/dto/user.dto';
import { Context } from '../lib/types';
import { User } from '../schema/user.schema';
import { UserService } from '../services/user.service';
import { JWT } from '../middleware/jwt';
import { PubSubEngine } from 'apollo-server-express';

@ObjectType()
class FieldError {
  @Field(() => String)
  field!: string;
  @Field(() => String)
  message!: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  constructor(private userService: UserService = new UserService()) {}

  @UseMiddleware(JWT)
  @Query(() => User)
  async user(@Arg('id') id: string): Promise<User | null> {
    return await this.userService.find(id);
  }

  @UseMiddleware(JWT)
  @Query(() => [User])
  async users(
    @Arg('text') text: string,
    @Arg('limit', () => Int, { defaultValue: 5 }) limit: number,
  ): Promise<User[] | null> {
    return await this.userService.finds({ text, limit });
  }

  @UseMiddleware(JWT)
  @Query(() => User)
  async me(
    @Ctx() { req }: Context,
    @PubSub() pubSub: PubSubEngine,
  ): Promise<User | null> {
    pubSub.publish('NOTIFICATIONS', 'hiyaa');
    const user = await this.userService.find(req?.user.userId);
    return user;
  }

  @UseMiddleware(JWT)
  @Mutation(() => UserResponse, { name: 'createUser' })
  async register(
    @Arg('options', () => CreateUserDTO) options: CreateUserDTO,
  ): Promise<UserResponse> {
    return await this.userService.create(options);
  }

  @UseMiddleware(JWT)
  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: Context) {
    return new Promise((resolve) =>
      req.session.destroy((err: any) => {
        res.clearCookie(COOKIE_NAME);
        req.logOut();
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      }),
    );
  }
}
