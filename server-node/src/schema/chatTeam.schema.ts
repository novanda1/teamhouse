import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, model } from 'mongoose';
import { Field, ObjectType } from 'type-graphql';
import { User } from './user.schema';

@ObjectType()
export class MessageToken {
  @Field()
  t!: string;
  @Field()
  v!: string;
}

@ObjectType()
export class Message {
  @Prop()
  @Field()
  _id!: string;

  @Prop()
  @Field()
  userId!: string;

  @Field(() => User, { nullable: true })
  user?: User;

  @Prop()
  @Field()
  color!: string;

  @Prop()
  @Field(() => [MessageToken])
  tokens!: MessageToken[];

  @Prop()
  @Field(() => Boolean, { defaultValue: false })
  deleted?: boolean;

  @Prop()
  @Field(() => Date, { nullable: true })
  createdAt?: Date;
}

export type MessageDocument = Message & Document;
export const MessageSchema = SchemaFactory.createForClass(Message);
export const MessageModel= model(Message.name, MessageSchema);

@ObjectType()
@Schema({ timestamps: true })
export class ChatTeam {
  @Field()
  _id!: string;

  @Prop()
  @Field()
  teamId!: string;

  @Prop()
  @Field(() => [String], { nullable: true })
  bannedUserIdMap?: string[];

  @Prop()
  @Field(() => [Message], { nullable: true })
  messages?: Message[];
}

export type ChatTeamDocument = ChatTeam & Document;
export const ChatTeamSchema = SchemaFactory.createForClass(ChatTeam);
export const ChatTeamModel = model(
  ChatTeam.name,
  ChatTeamSchema,
);
