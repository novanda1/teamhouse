import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Project {
  @Field()
  _id: string;

  @Prop()
  @Field()
  title: string;

  @Prop()
  @Field()
  description: string;

  @Prop()
  @Field(() => [String])
  members: string[];
}

export type ProjectDocument = Project & Document;
export const ProjectSchema = SchemaFactory.createForClass(Project);
