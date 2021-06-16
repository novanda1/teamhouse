import { Document, model } from 'mongoose';
import { Field, ObjectType } from 'type-graphql';
import { Prop } from '../lib/decorators/propDecorator';
import { Schema } from '../lib/decorators/schemaDecorator';
import { SchemaFactory } from '../lib/factories/schemaFactory';

@ObjectType()
@Schema()
export class User {
  _id!: string;

  @Prop()
  @Field(() => String)
  email!: String;

  @Prop()
  @Field(() => String)
  firstname!: String;

  @Prop()
  @Field(() => String)
  lastname!: String;

  @Prop()
  @Field(() => String)
  bio!: String;

  @Prop()
  @Field(() => String)
  picture!: String;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
export const UserModel = model(User.name, UserSchema);
