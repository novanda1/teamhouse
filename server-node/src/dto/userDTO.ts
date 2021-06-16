import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateUserDTO {
  _id!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  firstname!: string;

  @Field(() => String)
  lastname!: string;

  @Field(() => String)
  bio!: string;

  @Field(() => String)
  picture!: string;
}
