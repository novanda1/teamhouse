import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateTeamInput } from './create-team.input';

@InputType()
export class UpdateTeamInput extends PartialType(CreateTeamInput) {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;
}
