import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Token } from 'src/auth/auth.decorator';
import { JwtGuard } from 'src/auth/jwt/jwt-guard.guard';
import { JwtService } from 'src/auth/jwt/jwt.service';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';
import { Team, TeamPagination } from './entities/team.entity';
import { TeamService } from './team.service';

@Resolver(() => Team)
export class TeamResolver {
  constructor(
    private readonly teamService: TeamService,
    private readonly jwtService: JwtService,
  ) {}
  @UseGuards(JwtGuard)
  @Mutation(() => Team)
  createTeam(
    @Args('createTeamInput') createTeamInput: CreateTeamInput,
    @Token() token: string,
  ) {
    const userid = this.jwtService.getUserid(token);
    return this.teamService.create(createTeamInput, userid);
  }

  @UseGuards(JwtGuard)
  @Query(() => TeamPagination, { name: 'teams' })
  findAll(
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
    @Args('next', { nullable: true }) next?: string,
    @Args('previous', { nullable: true }) previous?: string,
  ) {
    return this.teamService.findAll(limit, previous, next);
  }

  @UseGuards(JwtGuard)
  @Query(() => Team, { name: 'team' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.teamService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Mutation(() => Team)
  async updateTeam(
    @Args('updateTeamInput') updateTeamInput: UpdateTeamInput,
    @Token() token: string,
  ) {
    const userid = this.jwtService.getUserid(token);

    const team = await this.teamService.findOne(updateTeamInput.id);
    const allowed = team.userid === userid;

    if (allowed)
      return this.teamService.update(updateTeamInput.id, updateTeamInput);
    else throw Error('not allowed');
  }

  @UseGuards(JwtGuard)
  @Mutation(() => Boolean)
  async removeTeam(
    @Args('id', { type: () => String }) id: string,
    @Token() token: string,
  ) {
    const userid = this.jwtService.getUserid(token);

    const team = await this.teamService.findOne(id);
    const allowed = team.userid === userid;

    if (allowed) return this.teamService.remove(id);
    else throw Error('not allowed');
  }
}
