import { Field, InputType } from 'type-graphql';
import { Message } from '../../schema/chatTeam.schema';

@InputType()
export class CreateChatTeamInputsDTO {
  @Field()
  teamId!: string;
}

export class UpadteChatTeamInputsDTO extends CreateChatTeamInputsDTO {
  @Field(() => [String])
  bannedUserIdMap?: string[];

  @Field(() => [Message])
  messages?: Message[];
}
