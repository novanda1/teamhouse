import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AddMessageInputsDto = {
  _id: Scalars['String'];
  user?: Maybe<CreateUserDto>;
  userId: Scalars['String'];
  color: Scalars['String'];
  tokens: Array<MessageTokenInputDto>;
  deleted?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
};

export type ChatTeam = {
  __typename?: 'ChatTeam';
  _id: Scalars['String'];
  teamId: Scalars['String'];
  bannedUserIdMap?: Maybe<Array<Scalars['String']>>;
  messages?: Maybe<Array<Message>>;
};

export type CreateTeamInputsDto = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type CreateUserDto = {
  _id: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  bio: Scalars['String'];
  picture: Scalars['String'];
};


export type Message = {
  __typename?: 'Message';
  _id: Scalars['String'];
  userId: Scalars['String'];
  user?: Maybe<User>;
  color: Scalars['String'];
  tokens: Array<MessageToken>;
  deleted?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
};

export type MessageToken = {
  __typename?: 'MessageToken';
  t: Scalars['String'];
  v: Scalars['String'];
};

export type MessageTokenInputDto = {
  t: Scalars['String'];
  v: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addChat: Array<Message>;
  pubSubMutation: Scalars['Boolean'];
  publisherMutation: Scalars['Boolean'];
  addTeamMember: TeamRef;
  createTeam: Team;
  deleteTeam: Scalars['Boolean'];
  updateTeam: Team;
  logout: Scalars['Boolean'];
};


export type MutationAddChatArgs = {
  message: AddMessageInputsDto;
  teamId: Scalars['String'];
};


export type MutationPubSubMutationArgs = {
  message?: Maybe<Scalars['String']>;
};


export type MutationPublisherMutationArgs = {
  message?: Maybe<Scalars['String']>;
};


export type MutationAddTeamMemberArgs = {
  user: TeamRefUsersInput;
  teamId: Scalars['String'];
};


export type MutationCreateTeamArgs = {
  options: CreateTeamInputsDto;
};


export type MutationDeleteTeamArgs = {
  id: Scalars['String'];
};


export type MutationUpdateTeamArgs = {
  options: UpdateTeamInputDto;
  id: Scalars['String'];
};

export type Notification = {
  __typename?: 'Notification';
  id?: Maybe<Scalars['ID']>;
  message?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateTime']>;
};

export type Query = {
  __typename?: 'Query';
  getChatTeam: ChatTeam;
  hello: Scalars['String'];
  getTeamAdmin: Array<User>;
  getTeamMember: Array<User>;
  team: Team;
  teams: Array<Team>;
  user: User;
  users: Array<User>;
  me: User;
};


export type QueryGetChatTeamArgs = {
  teamId: Scalars['String'];
};


export type QueryGetTeamAdminArgs = {
  teamId: Scalars['String'];
};


export type QueryGetTeamMemberArgs = {
  teamId: Scalars['String'];
};


export type QueryTeamArgs = {
  id: Scalars['String'];
};


export type QueryTeamsArgs = {
  limit: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryUsersArgs = {
  limit?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  teamChatSubscription: Message;
  chatTeam: Scalars['String'];
  normalSubscription: Notification;
};


export type SubscriptionChatTeamArgs = {
  message: Scalars['String'];
};

export type Team = {
  __typename?: 'Team';
  _id: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
};

export type TeamRef = {
  __typename?: 'TeamRef';
  _id: Scalars['String'];
  team_id: Scalars['String'];
  users: Array<TeamRefUsers>;
};

export type TeamRefUsers = {
  __typename?: 'TeamRefUsers';
  role: Scalars['Int'];
  id: Scalars['String'];
};

export type TeamRefUsersInput = {
  role: Scalars['Int'];
  id: Scalars['String'];
};

export type UpdateTeamInputDto = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  bio: Scalars['String'];
  picture: Scalars['String'];
};
