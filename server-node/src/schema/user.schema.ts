import { Document, Model, model } from 'mongoose';
import { Field, ObjectType } from 'type-graphql';
import { Prop } from '../lib/decorators/prop.decorator';
import { Schema } from '../lib/decorators/schema.decorator';
import { SchemaFactory } from '../lib/factories/schemaFactory';

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id!: string;

  @Prop({ unique: true })
  @Field(() => String)
  username!: String;

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
UserSchema.index({
  _id: 'text',
  username: 'text',
  email: 'text',
  firstname: 'text',
  lastname: 'text',
});
export const UserModel: Model<UserDocument> = model(User.name, UserSchema);
