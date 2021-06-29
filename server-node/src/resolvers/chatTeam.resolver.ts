import {
  Arg,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Root,
  Subscription,
  UseMiddleware,
} from 'type-graphql';
import { AddMessageInputsDTO } from '../lib/dto/messageInput.dto';
import { JWT } from '../middleware/jwt';
import { ChatTeam, Message } from '../schema/chatTeam.schema';
import { ChatTeamService } from '../services/chat/chatTeam.service';

export class ChatTeamResolver {
  constructor(private readonly chatTeamService = new ChatTeamService()) {}

  @UseMiddleware(JWT)
  @Query(() => ChatTeam)
  async getChatTeam(@Arg('teamId') teamId: string): Promise<ChatTeam | null> {
    return await this.chatTeamService.find(teamId);
  }

  @UseMiddleware(JWT)
  @Mutation(() => [Message])
  async addChat(
    @Arg('teamId') teamId: string,
    @Arg('message') message: AddMessageInputsDTO,
    @PubSub() pubSub: PubSubEngine,
  ) {
    pubSub.publish('CHAT_TEAM', message);
    const result = await this.chatTeamService.addMessage(teamId, message);
    return result?.messages;
  }

  @Subscription(() => Message, { topics: 'CHAT_TEAM' })
  async teamChatSubscription(@Root() payload: Message) {
    return payload;
  }
}
