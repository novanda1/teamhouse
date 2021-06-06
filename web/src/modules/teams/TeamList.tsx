import { useRouter } from "next/router";
import React from "react";
import { useCreateTeamMutation, useTeamsQuery } from "../../generated/graphql";
import { TeamHeadUi, TeamListUiWrapper, TeamUi } from "../../ui/teams/Team";
import { WaitForAuth } from "../auth/WaitForAuth";
import { TeamModal } from "./TeamModal";
import { ITeamStore, useTeamStore } from "./useTeamStore";

export const TeamList: React.FC = () => {
  const { push, query } = useRouter();
  const teamStore = useTeamStore();
  const teams = useTeamsQuery({
    notifyOnNetworkStatusChange: true,
  });

  const [createTeam] = useCreateTeamMutation({
    update: (cache) => {
      cache.evict({ fieldName: "teams" });
    },
  });

  // funcs
  const onSingleClick = async (id: string) => {
    await push(`/team/${id}`);
  };

  console.log();

  return (
    <>
      <WaitForAuth>
        <TeamListUiWrapper response={teams} onSingleClick={onSingleClick}>
          <TeamHeadUi
            onAddTeam={() =>
              teamStore.set((s: ITeamStore) => {
                s.modalType = "add";
                s.modalIsOpen = true;
              })
            }
          ></TeamHeadUi>
          {teams.data?.teams.map((t) => (
            <TeamUi key={t._id} onClick={() => onSingleClick(t._id)} t={t} />
          ))}
        </TeamListUiWrapper>

        <TeamModal />
      </WaitForAuth>
    </>
  );
};
