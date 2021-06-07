import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphqlAuthGuardThrow } from 'src/modules/auth/guards/graphql-auth.guard';
import { GqlUser } from 'src/shared/decorators';
import { CreateTeamInputsDTO, UpdateTeamInputDTO } from './dto/team-inputs.dto';
import { Team } from './schema/team.schema';
import { TeamService } from './team.service';

@Resolver()
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}

  @UseGuards(GraphqlAuthGuardThrow)
  @Mutation(() => Team, { name: 'createTeam' })
  async create(@GqlUser() user, @Args('options') options: CreateTeamInputsDTO) {
    const leaders = options.leaders ? options.leaders : [];
    leaders.push(user.username);
    options.leaders = leaders;
    return await this.teamService.create(options);
  }

  @UseGuards(GraphqlAuthGuardThrow)
  @Query(() => [Team], { name: 'teams' })
  async findAll(): Promise<Team[]> {
    return await this.teamService.findAll();
  }

  @UseGuards(GraphqlAuthGuardThrow)
  @Query(() => Team, { name: 'team' })
  async find(@Args('id') id: string): Promise<Team> {
    return await this.teamService.findById(id);
  }

  @UseGuards(GraphqlAuthGuardThrow)
  @Mutation(() => Team, { name: 'updateTeam' })
  async update(
    @Args('id') id: string,
    @Args('options', { type: () => UpdateTeamInputDTO })
    options: UpdateTeamInputDTO,
  ) {
    return await this.teamService.update(id, options);
  }

  @UseGuards(GraphqlAuthGuardThrow)
  @Mutation(() => Team, { name: 'addTeamMember' })
  async addMember(
    @Args('teamId') teamId: string,
    @Args('username') username: string,
  ) {
    return await this.teamService.addTeamMember(teamId, username);
  }
}
