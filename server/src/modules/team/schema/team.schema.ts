import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/modules/users/schema/user.schema';

@ObjectType()
@Schema({ timestamps: true })
export class Team {
  @Field()
  _id: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  description: string;

  @Prop()
  @Field(() => [String])
  leaders?: string[] | User[];

  @Prop()
  @Field(() => [String], { nullable: true })
  members?: string[] | User[];
}

export type TeamDocument = Team & Document;
export const TeamSchema = SchemaFactory.createForClass(Team);
