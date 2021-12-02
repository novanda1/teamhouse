import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class User {
  @Field(() => String)
  id: string;

  @Prop()
  @Field(() => String)
  username: string;

  @Prop()
  @Field(() => String)
  displayName: string;
}

export const UserSchema = SchemaFactory.createForClass(User)
