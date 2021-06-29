import { Arg, Query, UseMiddleware } from 'type-graphql';
import { JWT } from '../middleware/jwt';
import { ChatTeam } from '../schema/chatTeam.schema';
import { ChatTeamService } from '../services/chat/chatTeam.service';

export class ChatTeamResolver {
  constructor(private readonly chatTeamService = new ChatTeamService()) {}

  @UseMiddleware(JWT)
  @Query(() => ChatTeam)
  async getChatTeam(@Arg('teamId') teamId: string): Promise<ChatTeam | null> {
    return await this.chatTeamService.find(teamId);
  }
}
