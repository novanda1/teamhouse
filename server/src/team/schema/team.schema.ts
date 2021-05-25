import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
  leaders?: string[];

  @Prop()
  @Field(() => [String], { nullable: true })
  members?: string[];
}

export type TeamDocument = Team & Document;
export const TeamSchema = SchemaFactory.createForClass(Team);
