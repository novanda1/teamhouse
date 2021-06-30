import { Field, InputType } from 'type-graphql';
import { User } from '../../schema/user.schema';
import { CreateUserDTO } from './user.dto';

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

  @Field(() => CreateUserDTO, { nullable: true })
  user?: User;

  @Field()
  userId!: string;

  @Field()
  color!: string;

  @Field(() => [MessageTokenInputDTO])
  tokens!: MessageTokenInputDTO[];

  @Field(() => Boolean, { defaultValue: false })
  deleted?: boolean;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;
}
