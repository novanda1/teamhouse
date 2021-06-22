import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import {
  CreateTeamInputsDTO,
  UpdateTeamInputDTO,
} from '../lib/dto/TeamInputDTO';
import { Context } from '../lib/types';
import { JWT } from '../middleware/jwt';
import { Team, TeamRefUsers } from '../schema/teamSchema';
import { TeamRefService, USER_ROLE } from '../services/teamRefService';
import { TeamService } from '../services/teamService';

@Resolver()
export class TeamResolver {
  constructor(
    private teamService: TeamService = new TeamService(),
    private teamRefService: TeamRefService = new TeamRefService(),
  ) {}

  @UseMiddleware(JWT)
  @Mutation(() => Team, { name: 'createTeam' })
  async create(
    @Arg('options') options: CreateTeamInputsDTO,
    @Ctx() { req }: Context,
  ): Promise<Team | null> {
    const userId = req.user.userId;
    const team = await this.teamService.create(options);
    if (team)
      this.teamRefService.addRef({
        team_id: team._id,
        users: [
          {
            id: userId,
            role: 0,
          },
        ],
      });

    return team;
  }

  @UseMiddleware(JWT)
  @Query(() => Team, { name: 'team' })
  async team(@Arg('id') id: string): Promise<Team | null> {
    return await this.teamService.find(id);
  }

  @UseMiddleware(JWT)
  @Query(() => [Team], { name: 'teams' })
  async teams(@Arg('limit', () => Int) limit: number): Promise<Team[]> {
    return await this.teamService.finds(limit);
  }

  @UseMiddleware(JWT)
  @Mutation(() => Boolean)
  async deleteTeam(
    @Arg('id') id: string,
    @Ctx() { req }: Context,
  ): Promise<boolean> {
    const admin: TeamRefUsers[] | undefined =
      await this.teamRefService.getUsers(USER_ROLE.ADMIN, id);

    const isAdmin = admin?.find((u) => u.id === req.user.userId);

    if (!isAdmin) throw new Error('Only admin can delete team');

    const teamDeleting = await this.teamService.delete(id);
    if (teamDeleting) await this.teamRefService.delete(id);
    return teamDeleting !== null;
  }

  @UseMiddleware(JWT)
  @Mutation(() => Team)
  async updateTeam(
    @Arg('id') id: string,
    @Arg('options', () => UpdateTeamInputDTO) options: UpdateTeamInputDTO,
    @Ctx() { req }: Context,
  ): Promise<Team | null> {
    const admin: TeamRefUsers[] | undefined =
      await this.teamRefService.getUsers(USER_ROLE.ADMIN, id);

    const isAdmin = admin?.find((u) => u.id === req.user.userId);

    console.log(`admin`, admin);
    console.log(`isAdmin`, isAdmin);

    if (!isAdmin) throw new Error('Only admin can update team');
    return await this.teamService.update(id, options);
  }
}
