import { mongoosePlugin } from 'mongo-cursor-pagination';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { model } from 'mongoose';

@Schema()
@ObjectType()
export class Team {
  @Field(() => String)
  id: string;

  @Prop({ required: true })
  @Field(() => String)
  userid: string;

  @Prop({ required: true })
  @Field(() => String)
  title: string;

  @Prop({ required: true })
  @Field(() => String)
  description: string;

  @Prop()
  @Field(() => [String])
  members: string[];
}

export const TeamSchema = SchemaFactory.createForClass(Team);
TeamSchema.plugin(mongoosePlugin);
export const TeamModel = model(Team.name, TeamSchema);

@ObjectType()
export class TeamPagination {
  @Field(() => [Team])
  results: Team[];
  @Field(() => String)
  previous: string;
  @Field(() => Boolean)
  hasPrevious: boolean;
  @Field(() => String)
  next: string;
  @Field(() => Boolean)
  hasNext: boolean;
}
