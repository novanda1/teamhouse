import React from "react";
import { useTeamsQuery } from "../../generated/graphql";
import { TeamHeadUi, TeamListUiWrapper, TeamUi } from "../../ui/teams/Team";
import { WaitForAuth } from "../auth/WaitForAuth";
import { TeamModal } from "./TeamModal";
import { ITeamStore, useTeamStore } from "./useTeamStore";

export const TeamList: React.FC = () => {
  const teamStore = useTeamStore();
  const teams = useTeamsQuery({
    notifyOnNetworkStatusChange: true,
  });

  return (
    <>
      <WaitForAuth>
        <TeamListUiWrapper response={teams}>
          <TeamHeadUi
            onAddTeam={() =>
              teamStore.set((s: ITeamStore) => {
                s.modalType = "add";
                s.modalIsOpen = true;
              })
            }
          ></TeamHeadUi>
          {teams.data?.teams.map((t) => (
            <TeamUi key={t._id} t={t} />
          ))}
        </TeamListUiWrapper>

        <TeamModal />
      </WaitForAuth>
    </>
  );
};
