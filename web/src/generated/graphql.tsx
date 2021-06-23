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
};

export type CreateTeamInputsDto = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type CreateUserDto = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  bio: Scalars['String'];
  picture: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addTeamMember: TeamRef;
  createTeam: Team;
  deleteTeam: Scalars['Boolean'];
  updateTeam: Team;
  createUser: UserResponse;
  logout: Scalars['Boolean'];
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


export type MutationCreateUserArgs = {
  options: CreateUserDto;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  getTeamAdmin: Array<User>;
  getTeamMember: Array<User>;
  team: Team;
  teams: Array<Team>;
  users: Array<User>;
  me: User;
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


export type QueryUsersArgs = {
  limit?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
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
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  bio: Scalars['String'];
  picture: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, '_id' | 'email' | 'firstname' | 'lastname' | 'bio' | 'picture'>
  ) }
);

export type ErrorsFragmentFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type TeamFragmentFragment = (
  { __typename?: 'Team' }
  & Pick<Team, '_id' | 'name' | 'description'>
);

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'email' | 'firstname' | 'lastname' | 'bio' | 'picture'>
);

export type UserResponseFragmentFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & ErrorsFragmentFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )> }
);

export type AddTeamMemberMutationVariables = Exact<{
  teamId: Scalars['String'];
  user: TeamRefUsersInput;
}>;


export type AddTeamMemberMutation = (
  { __typename?: 'Mutation' }
  & { addTeamMember: (
    { __typename?: 'TeamRef' }
    & Pick<TeamRef, '_id' | 'team_id'>
    & { users: Array<(
      { __typename?: 'TeamRefUsers' }
      & Pick<TeamRefUsers, 'role' | 'id'>
    )> }
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

export type DeleteTeamMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteTeamMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTeam'>
);

export type GetTeamAdminQueryVariables = Exact<{
  teamId: Scalars['String'];
}>;


export type GetTeamAdminQuery = (
  { __typename?: 'Query' }
  & { getTeamAdmin: Array<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'email' | 'firstname' | 'lastname' | 'bio' | 'picture'>
  )> }
);

export type GetTeamMemberQueryVariables = Exact<{
  teamId: Scalars['String'];
}>;


export type GetTeamMemberQuery = (
  { __typename?: 'Query' }
  & { getTeamMember: Array<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'email' | 'firstname' | 'lastname' | 'bio' | 'picture'>
  )> }
);

export type TeamQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type TeamQuery = (
  { __typename?: 'Query' }
  & { team: (
    { __typename?: 'Team' }
    & Pick<Team, '_id' | 'name' | 'description'>
  ) }
);

export type TeamsQueryVariables = Exact<{
  limit: Scalars['Int'];
}>;


export type TeamsQuery = (
  { __typename?: 'Query' }
  & { teams: Array<(
    { __typename?: 'Team' }
    & Pick<Team, '_id' | 'name' | 'description'>
  )> }
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

export type UsersQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
}>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'email' | 'firstname' | 'lastname' | 'bio' | 'picture'>
  )> }
);

export const TeamFragmentFragmentDoc = gql`
    fragment TeamFragment on Team {
  _id
  name
  description
}
    `;
export const ErrorsFragmentFragmentDoc = gql`
    fragment ErrorsFragment on FieldError {
  field
  message
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  _id
  email
  firstname
  lastname
  bio
  picture
}
    `;
export const UserResponseFragmentFragmentDoc = gql`
    fragment UserResponseFragment on UserResponse {
  errors {
    ...ErrorsFragment
  }
  user {
    ...UserFragment
  }
}
    ${ErrorsFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    _id
    email
    firstname
    lastname
    bio
    picture
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
export const AddTeamMemberDocument = gql`
    mutation AddTeamMember($teamId: String!, $user: TeamRefUsersInput!) {
  addTeamMember(teamId: $teamId, user: $user) {
    _id
    team_id
    users {
      role
      id
    }
  }
}
    `;
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
 *      user: // value for 'user'
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
    mutation CreateTeam($options: CreateTeamInputsDTO!) {
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
export const DeleteTeamDocument = gql`
    mutation DeleteTeam($id: String!) {
  deleteTeam(id: $id)
}
    `;
export type DeleteTeamMutationFn = Apollo.MutationFunction<DeleteTeamMutation, DeleteTeamMutationVariables>;

/**
 * __useDeleteTeamMutation__
 *
 * To run a mutation, you first call `useDeleteTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTeamMutation, { data, loading, error }] = useDeleteTeamMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTeamMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTeamMutation, DeleteTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTeamMutation, DeleteTeamMutationVariables>(DeleteTeamDocument, options);
      }
export type DeleteTeamMutationHookResult = ReturnType<typeof useDeleteTeamMutation>;
export type DeleteTeamMutationResult = Apollo.MutationResult<DeleteTeamMutation>;
export type DeleteTeamMutationOptions = Apollo.BaseMutationOptions<DeleteTeamMutation, DeleteTeamMutationVariables>;
export const GetTeamAdminDocument = gql`
    query GetTeamAdmin($teamId: String!) {
  getTeamAdmin(teamId: $teamId) {
    _id
    email
    firstname
    lastname
    bio
    picture
  }
}
    `;

/**
 * __useGetTeamAdminQuery__
 *
 * To run a query within a React component, call `useGetTeamAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamAdminQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useGetTeamAdminQuery(baseOptions: Apollo.QueryHookOptions<GetTeamAdminQuery, GetTeamAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamAdminQuery, GetTeamAdminQueryVariables>(GetTeamAdminDocument, options);
      }
export function useGetTeamAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamAdminQuery, GetTeamAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamAdminQuery, GetTeamAdminQueryVariables>(GetTeamAdminDocument, options);
        }
export type GetTeamAdminQueryHookResult = ReturnType<typeof useGetTeamAdminQuery>;
export type GetTeamAdminLazyQueryHookResult = ReturnType<typeof useGetTeamAdminLazyQuery>;
export type GetTeamAdminQueryResult = Apollo.QueryResult<GetTeamAdminQuery, GetTeamAdminQueryVariables>;
export const GetTeamMemberDocument = gql`
    query GetTeamMember($teamId: String!) {
  getTeamMember(teamId: $teamId) {
    _id
    email
    firstname
    lastname
    bio
    picture
  }
}
    `;

/**
 * __useGetTeamMemberQuery__
 *
 * To run a query within a React component, call `useGetTeamMemberQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamMemberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamMemberQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useGetTeamMemberQuery(baseOptions: Apollo.QueryHookOptions<GetTeamMemberQuery, GetTeamMemberQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamMemberQuery, GetTeamMemberQueryVariables>(GetTeamMemberDocument, options);
      }
export function useGetTeamMemberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamMemberQuery, GetTeamMemberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamMemberQuery, GetTeamMemberQueryVariables>(GetTeamMemberDocument, options);
        }
export type GetTeamMemberQueryHookResult = ReturnType<typeof useGetTeamMemberQuery>;
export type GetTeamMemberLazyQueryHookResult = ReturnType<typeof useGetTeamMemberLazyQuery>;
export type GetTeamMemberQueryResult = Apollo.QueryResult<GetTeamMemberQuery, GetTeamMemberQueryVariables>;
export const TeamDocument = gql`
    query Team($id: String!) {
  team(id: $id) {
    _id
    name
    description
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
    query Teams($limit: Int!) {
  teams(limit: $limit) {
    _id
    name
    description
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
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useTeamsQuery(baseOptions: Apollo.QueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
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
export const UsersDocument = gql`
    query Users($limit: Int, $text: String!) {
  users(text: $text, limit: $limit) {
    _id
    email
    firstname
    lastname
    bio
    picture
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useUsersQuery(baseOptions: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;