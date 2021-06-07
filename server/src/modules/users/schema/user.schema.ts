import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field()
  _id: string;

  @Prop({ unique: true })
  @Field()
  username: string;

  @Prop()
  password: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

@ObjectType()
export class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class AccessToken {
  @Field()
  token: string;
  @Field()
  expires: Date;
}

@ObjectType()
class RefreshToken {
  @Field()
  token: string;
  @Field()
  expires: Date;
}

@ObjectType()
export class Tokens {
  @Field()
  accessToken: AccessToken;
  @Field()
  refreshToken: RefreshToken;
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Tokens, { nullable: true })
  tokens?: Tokens;
}

@ObjectType()
export class RefreshTokenResponse {
  @Field()
  status: string;

  @Field()
  token: string;
}
