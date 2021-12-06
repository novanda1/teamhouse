import { mongoosePlugin } from 'mongo-cursor-pagination';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { model } from 'mongoose';

@Schema({ timestamps: true })
@ObjectType()
export class Chat {
  @Field(() => String)
  id: string;

  @Prop({ required: true })
  @Field(() => String)
  userid: string;

  @Prop({ required: true })
  @Field(() => String)
  groupid: string;

  @Prop({ required: true })
  @Field(() => String)
  message: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
ChatSchema.plugin(mongoosePlugin);
export const ChatModel = model(Chat.name, ChatSchema);
