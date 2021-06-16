import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { CreateUserDTO } from '../dto/userDTO';
import { User } from '../schema/user';
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

  @Mutation(() => User, { name: 'createUser' })
  async create(
    @Arg('options', () => CreateUserDTO) options: CreateUserDTO,
  ): Promise<User | null> {
    return await this.userService.create(options);
  }
}
