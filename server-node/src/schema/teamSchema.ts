import { Document, Model, model } from 'mongoose';
import { Field, ObjectType } from 'type-graphql';
import { Prop } from '../lib/decorators/propDecorator';
import { Schema } from '../lib/decorators/schemaDecorator';
import { SchemaFactory } from '../lib/factories/schemaFactory';

@ObjectType()
@Schema()
export class Team {
  @Field(() => String)
  _id!: string;

  @Prop({ unique: true })
  @Field(() => String)
  name!: string;

  @Prop()
  @Field(() => String)
  description!: string;
}

@ObjectType()
@Schema()
export class TeamRef {
  @Field(() => String)
  _id!: string;

  @Prop({ unique: true })
  @Field(() => String)
  team_id!: string;

  @Prop()
  @Field(() => [String])
  admin!: string[];

  @Prop()
  @Field(() => [String])
  member!: string[];
}

export type TeamDocument = Team & Document;
export const TeamSchema = SchemaFactory.createForClass(Team);
export const TeamModel: Model<TeamDocument> = model(Team.name, TeamSchema);

export type TeamRefDocument = TeamRef & Document;
export const TeamRefSchema = SchemaFactory.createForClass(TeamRef);
export const TeamRefModel: Model<TeamRefDocument> = model(
  TeamRef.name,
  TeamRefSchema,
);
