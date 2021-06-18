import { useTeamQuery } from "../generated/graphql";
import { useGetId } from "./useGetId";

export const useGetSingleTeamById = () => {
  const id = useGetId();

  const team = id
    ? useTeamQuery({
        variables: {
          id,
        },
      })
    : null;

  const result = { team };

  return result;
};
