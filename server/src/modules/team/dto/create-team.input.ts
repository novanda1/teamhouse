import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTeamInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;
}
