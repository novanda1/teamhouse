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

export type ProjectDocument = Project & Document;
export const ProjectSchema = SchemaFactory.createForClass(Project);
export const ProjectModel: Model<ProjectDocument> = model(
  Project.name,
  ProjectSchema,
);
