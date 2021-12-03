import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { model } from 'mongoose';

@Schema({})
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

  @Prop({ unique: true })
  @Field(() => String)
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const UserModel = model(User.name, UserSchema);
