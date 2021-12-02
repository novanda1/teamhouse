import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Team {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;
}
