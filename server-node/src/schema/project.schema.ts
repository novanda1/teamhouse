import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { model, Model } from 'mongoose';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Schema()
export class Project {
  @Field(() => String)
  _id!: string;

  @Prop()
  @Field(() => String)
  name!: string;

  @Prop()
  @Field(() => String)
  description!: string;
}

@ObjectType()
@Schema()
export class ProjectTeamRef {
  @Field(() => String)
  _id!: string;
  @Prop()
  @Field(() => String)
  team_id!: string;
  @Prop()
  @Field(() => String)
  project_id!: string;
}

export type ProjectTeamRefDocument = ProjectTeamRef & Document;
export const ProjectTeamRefSchema =
  SchemaFactory.createForClass(ProjectTeamRef);
export const ProjectTeamRefModel: Model<ProjectTeamRefDocument> = model(
  ProjectTeamRef.name,
  ProjectTeamRefSchema,
);

export type ProjectDocument = Project & Document;
export const ProjectSchema = SchemaFactory.createForClass(Project);
export const ProjectModel: Model<ProjectDocument> = model(
  Project.name,
  ProjectSchema,
);
