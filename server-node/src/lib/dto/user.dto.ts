import { IsEmail, IsString, IsUrl } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateUserDTO {
  @Field()
  _id!: string;

  @Field(() => String)
  @IsString()
  username!: string;

  @Field(() => String)
  @IsEmail()
  email!: string;

  @Field(() => String)
  @IsString()
  firstname!: string;

  @Field(() => String)
  @IsString()
  lastname!: string;

  @Field(() => String)
  @IsString()
  bio!: string;

  @Field(() => String)
  @IsUrl()
  picture!: string;
}
