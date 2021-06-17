import { Length, MinLength } from 'class-validator';
import { InputType, Field } from 'type-graphql';

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

  @Field(() => [String])
  admin!: string[];

  @Field(() => [String], { nullable: true })
  member?: string[];
}

@InputType()
export class UpdateTeamRefInputsDTO extends CreateTeamRefInputsDTO {}
