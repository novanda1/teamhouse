import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphqlAuthGuard } from 'src/modules/auth/guards/graphql-auth.guard';
import { GqlUser } from 'src/shared/decorators';
import { CreateTeamInputsDTO } from './dto/team-inputs.dto';
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
}
