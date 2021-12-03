import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';
import { Team } from './entities/team.entity';
import { TeamService } from './team.service';

@Resolver(() => Team)
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}

  @Mutation(() => Team)
  createTeam(@Args('createTeamInput') createTeamInput: CreateTeamInput) {
    return this.teamService.create(createTeamInput);
  }

  @Query(() => [Team], { name: 'team' })
  findAll() {
    return this.teamService.findAll();
  }

  @Query(() => Team, { name: 'team' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.teamService.findOne(id);
  }

  @Mutation(() => Team)
  updateTeam(@Args('updateTeamInput') updateTeamInput: UpdateTeamInput) {
    return this.teamService.update(updateTeamInput.id, updateTeamInput);
  }

  @Mutation(() => Team)
  removeTeam(@Args('id', { type: () => String }) id: string) {
    return this.teamService.remove(id);
  }
}
