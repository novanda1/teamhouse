import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTeamInputsDTO {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [String], { nullable: true })
  leaders?: string[] | any;

  @Field(() => [String], { nullable: true })
  members?: string[];
}
