import { Document, Model, model } from 'mongoose';
import { Field, ObjectType } from 'type-graphql';
import { Prop } from '../lib/decorators/propDecorator';
import { Schema } from '../lib/decorators/schemaDecorator';
import { SchemaFactory } from '../lib/factories/schemaFactory';

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id!: string;

  @Prop({ unique: true })
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
export const UserModel: Model<UserDocument> = model(User.name, UserSchema);
