import { NonEmptyArray } from 'type-graphql';
import { ChatTeamResolver } from './chatTeam.resolver';
import { HelloResolver } from './hello.resolver';
import { SubscriptionResolver } from './subccription.resolver';
import { TeamRefResolver } from './teamRef.resolver';
import { TeamResolver } from './team.resolver';
import { UserResolver } from './user.resolver';
import { ProjectResolver } from './project.resolver';

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  HelloResolver,
  UserResolver,
  TeamResolver,
  TeamRefResolver,
  ChatTeamResolver,
  SubscriptionResolver,
  ProjectResolver,
];
