import { Document } from 'mongoose';
import { Field, ObjectType } from 'type-graphql';
import { Schema } from '../lib/decorators/schemaDecorator';
import { SchemaFactory } from '../lib/factories/schemaFactory';

@Schema()
@ObjectType()
export class User {
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

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
