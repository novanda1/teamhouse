import { useTeamQuery } from "../generated/graphql";
import { useGetId } from "./useGetId";
import { useGetUser } from "./useGetUser";

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
    team && useGetUser({ username: team.data?.team.leaders });
  const result = { team, leaders };

  return result;
};
