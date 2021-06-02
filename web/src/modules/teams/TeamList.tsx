import React, { useState } from "react";
import { useTeamsQuery, useCreateTeamMutation } from "../../generated/graphql";
import { TeamListUi } from "../../ui/teams/TeamListUi";

export const TeamList: React.FC = () => {
  const teams = useTeamsQuery({
    notifyOnNetworkStatusChange: true,
  });

  return <TeamListUi response={teams} />;
};
