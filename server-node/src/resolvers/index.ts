import { NonEmptyArray } from 'type-graphql';
import { ChatTeamResolver } from './chatTeamResolver';
import { HelloResolver } from './hello';
import { SubscriptionResolver } from './SubscriptionResolver';
import { TeamRefResolver } from './teamRefResolver';
import { TeamResolver } from './teamResolver';
import { UserResolver } from './userResolver';

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  HelloResolver,
  UserResolver,
  TeamResolver,
  TeamRefResolver,
  ChatTeamResolver,
  SubscriptionResolver,
];
