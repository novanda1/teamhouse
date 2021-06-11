import { InputType, Field, OmitType, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  profileImg?: string;

  @Field({ nullable: true })
  coverImg?: string;

  @Field()
  password: string;
}

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(CreateUserInput, ['password'] as const),
) {}

@InputType()
export class LoginUserInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
