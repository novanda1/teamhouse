import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Token } from 'src/auth/auth.decorator';
import { JwtGuard } from 'src/auth/jwt/jwt-guard.guard';
import { JwtAuthService } from 'src/auth/jwt/jwt.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtAuthService,
  ) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @UseGuards(JwtGuard)
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtGuard)
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Token() token: string,
  ) {
    const userid = this.jwtService.getUserid(token);
    return this.userService.update(userid, updateUserInput);
  }

  @UseGuards(JwtGuard)
  @Query(() => User)
  me(@Token() token: string) {
    const userid = this.jwtService.getUserid(token);
    return this.userService.findOne(userid);
  }
}
