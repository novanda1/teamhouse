import { Field, InputType } from 'type-graphql';

@InputType()
export class MessageTokenInputDTO {
  @Field()
  t!: string;
  @Field()
  v!: string;
}

@InputType()
export class AddMessageInputsDTO {
  @Field()
  _id!: string;

  @Field()
  userId!: string;

  @Field()
  color!: string;

  @Field(() => [MessageTokenInputDTO])
  tokens!: MessageTokenInputDTO[];

  @Field(() => Boolean, { defaultValue: false })
  deleted?: boolean;

  @Field(() => Date)
  createdAt!: Date;
}
