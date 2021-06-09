import React, { memo, useCallback, useEffect } from "react";
import { useTeamsQuery } from "../../generated/graphql";
import { TeamHeadUi, TeamListUiWrapper, TeamUi } from "../../ui/teams/Team";
import { WaitForAuth } from "../auth/WaitForAuth";
import { ITeamStore, useTeamStore } from "./useTeamStore";

export const TeamList: React.FC = memo(() => {
  const teamStore = useTeamStore();
  const teams = useTeamsQuery({
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    console.log(`teams`, teams);
  }, []);

  const openAddTeamModal = useCallback(() => {
    teamStore.set((s: ITeamStore) => {
      s.modalType = "add";
      s.modalIsOpen = true;
    });
  }, [teamStore.set]);

  return (
    <>
      <WaitForAuth>
        <TeamListUiWrapper response={teams}>
          <TeamHeadUi onAddTeam={openAddTeamModal}></TeamHeadUi>
          {teams.data?.teams.map((t) => (
            <TeamUi key={t._id} t={t} />
          ))}
        </TeamListUiWrapper>
      </WaitForAuth>
    </>
  );
});
