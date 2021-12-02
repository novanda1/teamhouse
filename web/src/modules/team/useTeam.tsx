import { useRouter } from "next/router";
import { useCallback } from "react";
import {
  useTeamQuery,
  useDeleteTeamMutation,
  TeamsDocument,
} from "../../generated/graphql";

const useTeam = () => {
  const { query, back } = useRouter();

  const { data, loading, error } = useTeamQuery({
    variables: { id: query.id as string },
  });

  const [deleteTeam] = useDeleteTeamMutation({
    refetchQueries: [TeamsDocument, "Teams"],
  });

  const handleDeleteTeam = useCallback(async () => {
    await deleteTeam({ variables: { id: query.id as string } });
    back();
  }, [deleteTeam, back, query.id]);

  return { data, loading, error, handleDeleteTeam };
};

export default useTeam;
