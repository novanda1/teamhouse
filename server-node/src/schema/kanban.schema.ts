import { model, Model } from 'mongoose';
import { Field, Int, ObjectType } from 'type-graphql';
import { Schema } from '../lib/decorators/schema.decorator';
import { SchemaFactory } from '../lib/factories/schemaFactory';

export interface IKanbanUtils {
  removeCard: () => void;
  dragging: () => void;
}

@ObjectType()
export class IKanbanTag {
  @Field(() => String)
  id!: number | string;
  @Field(() => String)
  title!: string;
  @Field(() => String)
  color!: string;
}

@ObjectType()
export class IKanbanCard {
  @Field(() => String)
  id!: string | number;
  @Field(() => String)
  title!: string;
  @Field(() => String)
  description!: string;
  @Field(() => [IKanbanTag])
  tags?: IKanbanTag[];
}

@ObjectType()
export class IKanbanColumn {
  @Field(() => String)
  id!: string | number;
  @Field(() => String)
  title!: string;
  @Field(() => Int)
  cardCount!: number;
  @Field(() => [IKanbanCard])
  cards?: IKanbanCard[];
}

@ObjectType()
export class Kanban {
  @Field(() => [IKanbanColumn])
  columns!: IKanbanColumn[];
}

@ObjectType()
@Schema()
export class IKanbanStore {
  @Field(() => Kanban)
  data!: Kanban;
}

export type KanbanDocument = Document & IKanbanStore;
export const KanbanSchema = SchemaFactory.createForClass(IKanbanStore);
export const KanbanModel: Model<KanbanDocument> = model(
  IKanbanStore.name,
  KanbanSchema,
);
