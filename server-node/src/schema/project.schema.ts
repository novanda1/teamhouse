import { model, Model } from 'mongoose';
import { ObjectType, Field } from 'type-graphql';
import { Prop } from '../lib/decorators/prop.decorator';
import { Schema } from '../lib/decorators/schema.decorator';
import { SchemaFactory } from '../lib/factories/schemaFactory';

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
  @Field(() => String)
  team_id!: string;
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
