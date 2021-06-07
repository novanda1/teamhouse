import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AccessToken = {
  __typename?: 'AccessToken';
  token: Scalars['String'];
  expires: Scalars['DateTime'];
};

export type CreateTeamInputsDto = {
  name: Scalars['String'];
  description: Scalars['String'];
  leaders?: Maybe<Array<Scalars['String']>>;
  members?: Maybe<Array<Scalars['String']>>;
};

export type CreateUserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type IsValidToken = {
  __typename?: 'IsValidToken';
  accessTokenValid: Scalars['Boolean'];
  refreshTokenValid: Scalars['Boolean'];
};

export type MeQueryResponse = {
  __typename?: 'MeQueryResponse';
  user?: Maybe<User>;
  tokens: IsValidToken;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: UserResponse;
  register: UserResponse;
  refreshToken: RefreshTokenResponse;
  logout: Scalars['Boolean'];
  createProject: Project;
  deleteProject: Scalars['Boolean'];
  createTeam: Team;
  updateTeam: Team;
  addTeamMember: Team;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: CreateUserInput;
};


export type MutationCreateProjectArgs = {
  options: ProjectInputDto;
};


export type MutationDeleteProjectArgs = {
  id: Scalars['String'];
};


export type MutationCreateTeamArgs = {
  options: CreateTeamInputsDto;
};


export type MutationUpdateTeamArgs = {
  options: UpdateTeamInputDto;
  id: Scalars['String'];
};


export type MutationAddTeamMemberArgs = {
  userId: Scalars['String'];
  teamId: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  _id: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  members: Array<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  user: UserDataResponse;
  usersByUsernames: UsersDataResponse;
  me: MeQueryResponse;
  projects: Array<Project>;
  teams: Array<Team>;
  team: Team;
};


export type QueryUserArgs = {
  username: Scalars['String'];
};


export type QueryUsersByUsernamesArgs = {
  usernames: Array<Scalars['String']>;
};


export type QueryProjectsArgs = {
  limit: Scalars['Float'];
};


export type QueryTeamArgs = {
  id: Scalars['String'];
};

export type RefreshToken = {
  __typename?: 'RefreshToken';
  token: Scalars['String'];
  expires: Scalars['DateTime'];
};

export type RefreshTokenResponse = {
  __typename?: 'RefreshTokenResponse';
  status: Scalars['String'];
  token: Scalars['String'];
};

export type Team = {
  __typename?: 'Team';
  _id: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  leaders: Array<Scalars['String']>;
  members?: Maybe<Array<Scalars['String']>>;
};

export type Tokens = {
  __typename?: 'Tokens';
  accessToken: AccessToken;
  refreshToken: RefreshToken;
};

export type UpdateTeamInputDto = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  leaders?: Maybe<Array<Scalars['String']>>;
  members?: Maybe<Array<Scalars['String']>>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  username: Scalars['String'];
};

export type UserDataResponse = {
  __typename?: 'UserDataResponse';
  status: Scalars['String'];
  data?: Maybe<User>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
  tokens?: Maybe<Tokens>;
};

export type UsersDataResponse = {
  __typename?: 'UsersDataResponse';
  status: Scalars['String'];
  data?: Maybe<Array<User>>;
};

export type ProjectInputDto = {
  title: Scalars['String'];
  description: Scalars['String'];
};

export type TeamFragmentFragment = (
  { __typename?: 'Team' }
  & Pick<Team, '_id' | 'name' | 'description' | 'leaders' | 'members'>
);

export type UserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & Pick<FieldError, 'field' | 'message'>
  )>>, tokens?: Maybe<(
    { __typename?: 'Tokens' }
    & { accessToken: (
      { __typename?: 'AccessToken' }
      & Pick<AccessToken, 'token' | 'expires'>
    ), refreshToken: (
      { __typename?: 'RefreshToken' }
      & Pick<RefreshToken, 'token' | 'expires'>
    ) }
  )>, user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'username'>
  )> }
);

export type AddTeamMemberMutationVariables = Exact<{
  teamId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type AddTeamMemberMutation = (
  { __typename?: 'Mutation' }
  & { addTeamMember: (
    { __typename?: 'Team' }
    & TeamFragmentFragment
  ) }
);

export type CreateTeamMutationVariables = Exact<{
  options: CreateTeamInputsDto;
}>;


export type CreateTeamMutation = (
  { __typename?: 'Mutation' }
  & { createTeam: (
    { __typename?: 'Team' }
    & TeamFragmentFragment
  ) }
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & UserResponseFragment
  ) }
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & UserResponseFragment
  ) }
);

export type UpdateTeamMutationVariables = Exact<{
  id: Scalars['String'];
  options: UpdateTeamInputDto;
}>;


export type UpdateTeamMutation = (
  { __typename?: 'Mutation' }
  & { updateTeam: (
    { __typename?: 'Team' }
    & TeamFragmentFragment
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'MeQueryResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, '_id' | 'username'>
    )>, tokens: (
      { __typename?: 'IsValidToken' }
      & Pick<IsValidToken, 'accessTokenValid' | 'refreshTokenValid'>
    ) }
  ) }
);

export type ProjectsQueryVariables = Exact<{
  limit: Scalars['Float'];
}>;


export type ProjectsQuery = (
  { __typename?: 'Query' }
  & { projects: Array<(
    { __typename?: 'Project' }
    & Pick<Project, 'title'>
  )> }
);

export type TeamQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type TeamQuery = (
  { __typename?: 'Query' }
  & { team: (
    { __typename?: 'Team' }
    & Pick<Team, 'name' | 'description' | 'leaders' | 'members'>
  ) }
);

export type TeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamsQuery = (
  { __typename?: 'Query' }
  & { teams: Array<(
    { __typename?: 'Team' }
    & Pick<Team, '_id' | 'name' | 'description' | 'leaders' | 'members'>
  )> }
);

export type UserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'UserDataResponse' }
    & Pick<UserDataResponse, 'status'>
    & { data?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, '_id' | 'username'>
    )> }
  ) }
);

export type UsersByUsernamesQueryVariables = Exact<{
  usernames: Array<Scalars['String']> | Scalars['String'];
}>;


export type UsersByUsernamesQuery = (
  { __typename?: 'Query' }
  & { usersByUsernames: (
    { __typename?: 'UsersDataResponse' }
    & Pick<UsersDataResponse, 'status'>
    & { data?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, '_id' | 'username'>
    )>> }
  ) }
);

export const TeamFragmentFragmentDoc = gql`
    fragment TeamFragment on Team {
  _id
  name
  description
  leaders
  members
}
    `;
export const UserResponseFragmentDoc = gql`
    fragment UserResponse on UserResponse {
  errors {
    field
    message
  }
  tokens {
    accessToken {
      token
      expires
    }
    refreshToken {
      token
      expires
    }
  }
  user {
    _id
    username
  }
}
    `;
export const AddTeamMemberDocument = gql`
    mutation AddTeamMember($teamId: String!, $userId: String!) {
  addTeamMember(teamId: $teamId, userId: $userId) {
    ...TeamFragment
  }
}
    ${TeamFragmentFragmentDoc}`;
export type AddTeamMemberMutationFn = Apollo.MutationFunction<AddTeamMemberMutation, AddTeamMemberMutationVariables>;

/**
 * __useAddTeamMemberMutation__
 *
 * To run a mutation, you first call `useAddTeamMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTeamMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTeamMemberMutation, { data, loading, error }] = useAddTeamMemberMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAddTeamMemberMutation(baseOptions?: Apollo.MutationHookOptions<AddTeamMemberMutation, AddTeamMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTeamMemberMutation, AddTeamMemberMutationVariables>(AddTeamMemberDocument, options);
      }
export type AddTeamMemberMutationHookResult = ReturnType<typeof useAddTeamMemberMutation>;
export type AddTeamMemberMutationResult = Apollo.MutationResult<AddTeamMemberMutation>;
export type AddTeamMemberMutationOptions = Apollo.BaseMutationOptions<AddTeamMemberMutation, AddTeamMemberMutationVariables>;
export const CreateTeamDocument = gql`
    mutation createTeam($options: CreateTeamInputsDTO!) {
  createTeam(options: $options) {
    ...TeamFragment
  }
}
    ${TeamFragmentFragmentDoc}`;
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, options);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!) {
  register(options: {username: $username, password: $password}) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateTeamDocument = gql`
    mutation UpdateTeam($id: String!, $options: UpdateTeamInputDTO!) {
  updateTeam(id: $id, options: $options) {
    ...TeamFragment
  }
}
    ${TeamFragmentFragmentDoc}`;
export type UpdateTeamMutationFn = Apollo.MutationFunction<UpdateTeamMutation, UpdateTeamMutationVariables>;

/**
 * __useUpdateTeamMutation__
 *
 * To run a mutation, you first call `useUpdateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeamMutation, { data, loading, error }] = useUpdateTeamMutation({
 *   variables: {
 *      id: // value for 'id'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useUpdateTeamMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTeamMutation, UpdateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTeamMutation, UpdateTeamMutationVariables>(UpdateTeamDocument, options);
      }
export type UpdateTeamMutationHookResult = ReturnType<typeof useUpdateTeamMutation>;
export type UpdateTeamMutationResult = Apollo.MutationResult<UpdateTeamMutation>;
export type UpdateTeamMutationOptions = Apollo.BaseMutationOptions<UpdateTeamMutation, UpdateTeamMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    user {
      _id
      username
    }
    tokens {
      accessTokenValid
      refreshTokenValid
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ProjectsDocument = gql`
    query Projects($limit: Float!) {
  projects(limit: $limit) {
    title
  }
}
    `;

/**
 * __useProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useProjectsQuery(baseOptions: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
      }
export function useProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
        }
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>;
export type ProjectsQueryResult = Apollo.QueryResult<ProjectsQuery, ProjectsQueryVariables>;
export const TeamDocument = gql`
    query Team($id: String!) {
  team(id: $id) {
    name
    description
    leaders
    members
  }
}
    `;

/**
 * __useTeamQuery__
 *
 * To run a query within a React component, call `useTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTeamQuery(baseOptions: Apollo.QueryHookOptions<TeamQuery, TeamQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamQuery, TeamQueryVariables>(TeamDocument, options);
      }
export function useTeamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamQuery, TeamQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamQuery, TeamQueryVariables>(TeamDocument, options);
        }
export type TeamQueryHookResult = ReturnType<typeof useTeamQuery>;
export type TeamLazyQueryHookResult = ReturnType<typeof useTeamLazyQuery>;
export type TeamQueryResult = Apollo.QueryResult<TeamQuery, TeamQueryVariables>;
export const TeamsDocument = gql`
    query Teams {
  teams {
    _id
    name
    description
    leaders
    members
  }
}
    `;

/**
 * __useTeamsQuery__
 *
 * To run a query within a React component, call `useTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTeamsQuery(baseOptions?: Apollo.QueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, options);
      }
export function useTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, options);
        }
export type TeamsQueryHookResult = ReturnType<typeof useTeamsQuery>;
export type TeamsLazyQueryHookResult = ReturnType<typeof useTeamsLazyQuery>;
export type TeamsQueryResult = Apollo.QueryResult<TeamsQuery, TeamsQueryVariables>;
export const UserDocument = gql`
    query User($username: String!) {
  user(username: $username) {
    status
    data {
      _id
      username
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UsersByUsernamesDocument = gql`
    query UsersByUsernames($usernames: [String!]!) {
  usersByUsernames(usernames: $usernames) {
    status
    data {
      _id
      username
    }
  }
}
    `;

/**
 * __useUsersByUsernamesQuery__
 *
 * To run a query within a React component, call `useUsersByUsernamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersByUsernamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersByUsernamesQuery({
 *   variables: {
 *      usernames: // value for 'usernames'
 *   },
 * });
 */
export function useUsersByUsernamesQuery(baseOptions: Apollo.QueryHookOptions<UsersByUsernamesQuery, UsersByUsernamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersByUsernamesQuery, UsersByUsernamesQueryVariables>(UsersByUsernamesDocument, options);
      }
export function useUsersByUsernamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersByUsernamesQuery, UsersByUsernamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersByUsernamesQuery, UsersByUsernamesQueryVariables>(UsersByUsernamesDocument, options);
        }
export type UsersByUsernamesQueryHookResult = ReturnType<typeof useUsersByUsernamesQuery>;
export type UsersByUsernamesLazyQueryHookResult = ReturnType<typeof useUsersByUsernamesLazyQuery>;
export type UsersByUsernamesQueryResult = Apollo.QueryResult<UsersByUsernamesQuery, UsersByUsernamesQueryVariables>;