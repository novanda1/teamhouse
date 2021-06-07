import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GqlResponse {
  @Field()
  status: 'success' | 'failed';
}
