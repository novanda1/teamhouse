import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  displayName: string;
}
