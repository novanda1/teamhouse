import { COOKIE_NAME } from '../lib/constants';
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { CreateUserDTO } from '../lib/dto/userDTO';
import { Context } from '../lib/types';
import { User } from '../schema/userSchema';
import { UserService } from '../services/userService';
import { JWT } from '../middleware/jwt';

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
  async me(@Ctx() { req }: Context): Promise<User | null> {
    const user = await this.userService.find(req?.user.userId);
    console.log(`user`, user);
    return user;
  }

  @UseMiddleware(JWT)
  @Mutation(() => UserResponse, { name: 'createUser' })
  async register(
    @Arg('options', () => CreateUserDTO) options: CreateUserDTO,
  ): Promise<UserResponse> {
    console.log(`options`, options);
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
