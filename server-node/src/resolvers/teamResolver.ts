import {
  Arg,
  Ctx,
  Mutation,
  Resolver,
  UseMiddleware,
  Query,
  Int,
} from 'type-graphql';
import {
  CreateTeamInputsDTO,
  CreateTeamRefInputsDTO,
  UpdateTeamInputDTO,
} from '../lib/dto/TeamInputDTO';
import { Context } from '../lib/types';
import { JWT } from '../middleware/jwt';
import { Team, TeamRef } from '../schema/teamSchema';
import { TeamRefService, TeamService } from '../services/teamService';

@Resolver()
export class TeamResolver {
  constructor(
    private teamService: TeamService = new TeamService(),
    private readonly teamRef = new TeamRefResolver(),
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
      this.teamRef.create({
        team_id: team._id,
        admin: [userId],
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
  async deleteTeam(@Arg('id') id: string): Promise<boolean> {
    return await this.teamService.delete(id);
  }

  @UseMiddleware(JWT)
  @Mutation(() => Team)
  async updateTeam(
    @Arg('id') id: string,
    @Arg('options', () => UpdateTeamInputDTO) options: UpdateTeamInputDTO,
  ): Promise<Team | null> {
    return await this.teamService.update(id, options);
  }
}

@Resolver()
export class TeamRefResolver {
  constructor(private service: TeamRefService = new TeamRefService()) {}

  @UseMiddleware(JWT)
  @Mutation(() => TeamRef, { name: 'createTeamRef' })
  async create(@Arg('options') options: CreateTeamRefInputsDTO) {
    this.service.addRef(options);
  }

  // @UseMiddleware(JWT)
  // @Mutation(() => TeamRef, { name: 'updateTeamRef' })
  // async update(@Arg('options') options: UpdateTeamRefInputsDTO) {
  //   this.service.addRef(options);
  // }
}
