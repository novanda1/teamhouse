import { IsEmail, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateUserDTO {
  _id!: string;

  @Field(() => String)
  @MinLength(10)
  @IsEmail()
  email!: string;
  
  @MinLength(10)
  @Field(() => String)
  firstname!: string;

  @Field(() => String)
  lastname!: string;

  @Field(() => String)
  bio!: string;

  @Field(() => String)
  picture!: string;
}
