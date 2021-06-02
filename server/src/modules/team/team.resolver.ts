import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphqlAuthGuard } from 'src/modules/auth/guards/graphql-auth.guard';
import { GqlUser } from 'src/shared/decorators';
import { CreateTeamInputsDTO, UpdateTeamInputDTO } from './dto/team-inputs.dto';
import { Team } from './schema/team.schema';
import { TeamService } from './team.service';

@Resolver()
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Team, { name: 'createTeam' })
  async create(@GqlUser() user, @Args('options') options: CreateTeamInputsDTO) {
    const leaders = options.leaders ? options.leaders : [];
    leaders.push(user._id);
    options.leaders = leaders;
    return await this.teamService.create(options);
  }

  @Query(() => [Team], { name: 'teams' })
  async findAll() {
    return await this.teamService.findAll();
  }

  @Query(() => Team, { name: 'team' })
  async find(@Args('id') id: string) {
    return await this.teamService.findById(id);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Team, { name: 'updateTeam' })
  async update(
    @Args('id') id: string,
    @Args('options', { type: () => UpdateTeamInputDTO })
    options: UpdateTeamInputDTO,
  ) {
    return await this.teamService.update(id, options);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Team, { name: 'addTeamMember' })
  async addMember(
    @Args('teamId') teamId: string,
    @Args('userId') userId: string,
  ) {
    return await this.teamService.addTeamMember(teamId, userId);
  }
}
