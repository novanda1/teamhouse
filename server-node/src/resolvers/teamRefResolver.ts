import { Arg, Mutation, Query, UseMiddleware } from 'type-graphql';
import { TeamRefUsersInput } from '../lib/dto/TeamInputDTO';
import { JWT } from '../middleware/jwt';
import { TeamRef } from '../schema/teamSchema';
import { User } from '../schema/userSchema';
import { TeamRefService, USER_ROLE } from '../services/teamRefService';
import { UserService } from '../services/userService';

export class TeamRefResolver {
  constructor(
    private readonly teamRefService: TeamRefService = new TeamRefService(),
    private readonly userService: UserService = new UserService(),
  ) {}

  @UseMiddleware(JWT)
  @Query(() => [User])
  async getTeamAdmin(@Arg('teamId') teamId: string) {
    const usersId = await this.teamRefService.getUsers(USER_ROLE.ADMIN, teamId);

    const users = usersId?.map(async (u): Promise<User | null> => {
      const user = await this.userService.find(u.id);
      return user;
    });

    return users;
  }

  @UseMiddleware(JWT)
  @Query(() => [User])
  async getTeamMember(@Arg('teamId') teamId: string) {
    const usersId = await this.teamRefService.getUsers(
      USER_ROLE.MEMBER,
      teamId,
    );

    const users = usersId?.map(async (u): Promise<User | null> => {
      const user = await this.userService.find(u.id);
      return user;
    });

    return users;
  }

  @UseMiddleware(JWT)
  @Mutation(() => TeamRef)
  async addTeamMember(
    @Arg('teamId')
    team_id: string,
    @Arg('user')
    user: TeamRefUsersInput,
  ) {
    const admin =
      (await this.teamRefService.getUsers(USER_ROLE.ADMIN, team_id)) || [];
    const member =
      (await this.teamRefService.getUsers(USER_ROLE.MEMBER, team_id)) || [];

    const users = [...admin, ...member];
    const isAlready = users?.filter((u) => u.id === user.id) || [];

    if (users && isAlready?.length >= 1)
      throw new Error(
        'users already exist as ' +
          // @ts-ignore
          Object.keys(USER_ROLE).find((key) => USER_ROLE[key] === user.role),
      );
    return await this.teamRefService.addMember(team_id, user);
  }
}
