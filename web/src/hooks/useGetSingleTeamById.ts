import { useTeamQuery } from "../generated/graphql";
import { useGetId } from "./useGetId";
import { useGetUserById } from "./useGetUserById";

export const useGetSingleTeamById = () => {
  const id = useGetId();

  const team = id
    ? useTeamQuery({
        variables: {
          id,
        },
      })
    : null;

  const leaders =
    team && useGetUserById({ ids: team.data?.team.leaders }).data?.usersByIds;
  const result = { team, leaders };

  return result;
};
