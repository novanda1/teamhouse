import React, { useState } from "react";
import { useTeamsQuery, useCreateTeamMutation } from "../../generated/graphql";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { open, setActiveId } from "../../store/features/team/teamSlice";
import { NewTeamModal } from "../../ui/modals/NewTeamModal";
import { TeamHeadUi, TeamListUiWrapper, TeamUi } from "../../ui/teams/Team";
import { WaitForAuth } from "../auth/waitForAuth";
import { useLandingStore } from "../landing/useLandingStore";

export const TeamList: React.FC = () => {
  const landingStore = useLandingStore();
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
  const setTeamState = (id: string, isOpen: boolean) => {};
  const onSingleClick = (id: string) => {
    const condition =
      landingStore.teamId === id && landingStore.layout.mid !== "idle";
    console.log(`condition`, condition);
    landingStore.setLayout({ layout: { mid: condition ? "idle" : "team" } });
    landingStore.setTeamId({ teamId: id });
  };

  console.log(landingStore.layout);

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
          setTeamState={setTeamState}
        />
      </WaitForAuth>
    </>
  );
};
