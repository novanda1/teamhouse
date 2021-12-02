import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TeamService } from './team.service';
import { Team } from './entities/team.entity';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';

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
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.teamService.findOne(id);
  }

  @Mutation(() => Team)
  updateTeam(@Args('updateTeamInput') updateTeamInput: UpdateTeamInput) {
    return this.teamService.update(updateTeamInput.id, updateTeamInput);
  }

  @Mutation(() => Team)
  removeTeam(@Args('id', { type: () => Int }) id: number) {
    return this.teamService.remove(id);
  }
}
