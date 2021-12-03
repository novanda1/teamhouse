import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
}

export const TeamSchema = SchemaFactory.createForClass(Team);
