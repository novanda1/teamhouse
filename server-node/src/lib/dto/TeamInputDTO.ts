import { Length, MinLength } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';
import { TeamRefUsers } from '../../schema/teamSchema';

@InputType()
export class CreateTeamInputsDTO {
  @Field(() => String, { nullable: true })
  @MinLength(3)
  name!: string;

  @Field(() => String, { nullable: true })
  @Length(0, 300)
  description!: string;
}

@InputType()
export class UpdateTeamInputDTO extends CreateTeamInputsDTO {}

@InputType()
export class CreateTeamRefInputsDTO {
  @Field(() => String)
  team_id!: string;

  @Field(() => [TeamRefUsers])
  users!: TeamRefUsers[];
}

@InputType()
export class UpdateTeamRefInputsDTO extends CreateTeamRefInputsDTO {}

@InputType()
export class TeamRefUsersInput {
  @Field(() => Int)
  role!: number;
  @Field(() => String)
  id!: string;
}
