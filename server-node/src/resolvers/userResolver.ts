import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { CreateUserDTO } from '../dto/userDTO';
import { User } from '../schema/userSchema';
import { UserService } from '../services/UserService';

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

  @Query(() => String)
  user() {
    return 'bye';
  }

  @Mutation(() => UserResponse, { name: 'createUser' })
  async create(
    @Arg('options', () => CreateUserDTO) options: CreateUserDTO,
  ): Promise<UserResponse> {
    console.log(`options`, options);
    return await this.userService.create(options);
  }
}
