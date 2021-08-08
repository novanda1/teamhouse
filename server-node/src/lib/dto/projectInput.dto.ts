import { MinLength, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ProjectInputDTO {
  @Field(() => String, { nullable: true })
  @MinLength(3)
  name!: string;

  @Field(() => String, { nullable: true })
  @Length(0, 300)
  description!: string;
}
