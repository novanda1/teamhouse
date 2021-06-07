import { UseGuards } from '@nestjs/common';
import {
  Args,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { GraphqlAuthGuardThrow } from 'src/modules/auth/guards/graphql-auth.guard';
import { GqlUser } from 'src/shared/decorators';
import { FieldError } from '../users/schema/user.schema';
import { UsersService } from '../users/users.service';
import { CreateTeamInputsDTO, UpdateTeamInputDTO } from './dto/team-inputs.dto';
import { Team } from './schema/team.schema';
import { TeamService } from './team.service';

@ObjectType()
class AddTeamMemberResponse<T> {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => Team, { nullable: true })
  data?: T;
}

@Resolver()
export class TeamResolver {
  constructor(
    private readonly teamService: TeamService,
    private readonly userService: UsersService,
  ) {}

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
  @Mutation(() => Boolean, { name: 'deleteTeam' })
  async delete(@Args('id') id: string) {
    return await this.teamService.delete(id);
  }

  @UseGuards(GraphqlAuthGuardThrow)
  @Mutation(() => AddTeamMemberResponse, { name: 'addTeamMember' })
  async addMember(
    @Args('teamId') teamId: string,
    @Args('username') username: string,
  ): Promise<AddTeamMemberResponse<Team>> {
    const user = await this.userService.find(username);

    const team = await this.teamService.addTeamMember(teamId, username);

    if (!user)
      return {
        errors: [{ field: 'username', message: 'username didnt exists' }],
      };

    if (team === 'already added') {
      return {
        errors: [{ field: 'username', message: 'already added' }],
      };
    }

    if (!team)
      return {
        errors: [{ field: 'team', message: 'team didnt exists' }],
      };

    return {
      data: team as Team,
    };
  }
}
