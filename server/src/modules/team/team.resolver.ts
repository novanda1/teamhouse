import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtGuard } from 'src/auth/jwt/jwt-guard.guard';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';
import { Team } from './entities/team.entity';
import { TeamService } from './team.service';

@Resolver(() => Team)
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}
  @UseGuards(JwtGuard)
  @Mutation(() => Team)
  createTeam(@Args('createTeamInput') createTeamInput: CreateTeamInput) {
    return this.teamService.create(createTeamInput);
  }

  @UseGuards(JwtGuard)
  @Query(() => [Team], { name: 'teams' })
  findAll() {
    return this.teamService.findAll();
  }

  @UseGuards(JwtGuard)
  @Query(() => Team, { name: 'team' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.teamService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Mutation(() => Team)
  updateTeam(@Args('updateTeamInput') updateTeamInput: UpdateTeamInput) {
    return this.teamService.update(updateTeamInput.id, updateTeamInput);
  }

  @UseGuards(JwtGuard)
  @Mutation(() => Team)
  removeTeam(@Args('id', { type: () => String }) id: string) {
    return this.teamService.remove(id);
  }
}
