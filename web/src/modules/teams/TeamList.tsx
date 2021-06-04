import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCreateTeamMutation, useTeamsQuery } from "../../generated/graphql";
import { NewTeamModal } from "../../ui/modals/NewTeamModal";
import { TeamHeadUi, TeamListUiWrapper, TeamUi } from "../../ui/teams/Team";
import { WaitForAuth } from "../auth/WaitForAuth";

export const TeamList: React.FC = () => {
  const { push, query } = useRouter();
  const [newTeamModal, setNewTeamModal] = useState(false);
  const teams = useTeamsQuery({
    notifyOnNetworkStatusChange: true,
  });

  const [createTeam] = useCreateTeamMutation({
    update: (cache) => {
      cache.evict({ fieldName: "teams" });
    },
  });

  // funcs
  const closeNewTeamModal = () => setNewTeamModal(false);
  const onSingleClick = async (id: string) => {
    await push(`/team/${id}`);
  };

  console.log();

  return (
    <>
      <WaitForAuth>
        <TeamListUiWrapper
          response={teams}
          onSingleClick={onSingleClick}
          setNewTeamModal={setNewTeamModal}
        >
          <TeamHeadUi onAddTeam={() => setNewTeamModal(true)}></TeamHeadUi>
          {teams.data?.teams.map((t) => (
            <TeamUi key={t._id} onClick={() => onSingleClick(t._id)} t={t} />
          ))}
        </TeamListUiWrapper>

        <NewTeamModal
          closeNewTeamModal={closeNewTeamModal}
          createTeam={createTeam}
          isOpen={newTeamModal}
        />
      </WaitForAuth>
    </>
  );
};
