import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import {
  CreateTeamInputsDTO,
  CreateTeamRefInputsDTO,
} from '../lib/dto/TeamInputDTO';
import { Context } from '../lib/types';
import { isAuth } from '../middleware/isAuth';
import { Team, TeamRef } from '../schema/teamSchema';
import { TeamRefService, TeamService } from '../services/teamService';

@Resolver()
export class TeamResolver {
  constructor(
    private teamService: TeamService = new TeamService(),
    private readonly teamRef = new TeamRefResolver(),
  ) {}

  @UseMiddleware(isAuth)
  @Mutation(() => Team, { name: 'createTeam' })
  async create(
    @Arg('options') options: CreateTeamInputsDTO,
    @Ctx() { req }: Context,
  ): Promise<Team | null> {
    const userId = req.session.passport.user.userId;
    const team = await this.teamService.create(options);
    if (team)
      this.teamRef.create({
        team_id: team._id,
        admin: [userId],
      });

    return team;
  }
}

@Resolver()
export class TeamRefResolver {
  constructor(private service: TeamRefService = new TeamRefService()) {}

  @UseMiddleware(isAuth)
  @Mutation(() => TeamRef, { name: 'createTeamRef' })
  async create(@Arg('options') options: CreateTeamRefInputsDTO) {
    this.service.addRef(options);
  }

  // @UseMiddleware(isAuth)
  // @Mutation(() => TeamRef, { name: 'updateTeamRef' })
  // async update(@Arg('options') options: UpdateTeamRefInputsDTO) {
  //   this.service.addRef(options);
  // }
}
