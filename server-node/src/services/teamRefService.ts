import { Model } from 'mongoose';
import { CreateTeamRefInputsDTO } from '../lib/dto/TeamInputDTO';
import {
  TeamRefDocument,
  TeamRefModel,
  TeamRef,
  Team,
  TeamRefUsers,
} from '../schema/teamSchema';
import { UserService } from './userService';

export const USER_ROLE = {
  ADMIN: 0,
  MEMBER: 1,
};

export class TeamRefService {
  constructor(
    private readonly model: Model<TeamRefDocument> = TeamRefModel,
    private readonly userService: UserService = new UserService(),
  ) {}

  async addRef(options: CreateTeamRefInputsDTO): Promise<TeamRef> {
    const team = await this.model.create(options);
    team instanceof Team;
    return team;
  }

  /**
   *
   * @param id team id
   * @returns Teamref
   */
  async find(id: string): Promise<TeamRef | null> {
    return await this.model.findOne({ team_id: id });
  }

  async delete(id: string) {
    const deleting = await this.model.findOneAndDelete({ team_id: id });
    try {
      return deleting !== null;
    } catch {
      return false;
    }
  }

  async getUsers(
    role: number,
    teamId: string,
  ): Promise<TeamRefUsers[] | undefined> {
    const teamRef = await this.find(teamId);

    switch (role) {
      case USER_ROLE.ADMIN:
        return teamRef?.users.filter((u) => u.role === USER_ROLE.ADMIN);
      case USER_ROLE.MEMBER:
        return teamRef?.users.filter((u) => u.role === USER_ROLE.MEMBER);
      default:
        return;
    }
  }

  async addMember(team_id: string, user: TeamRefUsers) {
    const isUser = await this.userService.find(user.id);
    if (isUser)
      await this.model.updateOne(
        { team_id },
        {
          $push: { users: user },
        },
      );
    else throw new Error("user doesn't exist");
    return await this.find(team_id);
  }
}
