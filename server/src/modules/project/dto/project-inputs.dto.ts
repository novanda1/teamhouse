import { Field, InputType } from '@nestjs/graphql';

@InputType()
class projectInputDTO {
  @Field()
  title: string;

  @Field()
  description: string;

  users: string[];
}

export default projectInputDTO;
