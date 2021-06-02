import React, { useState } from "react";
import { useTeamsQuery, useCreateTeamMutation } from "../../generated/graphql";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { open, setActiveId } from "../../store/features/team/teamSlice";
import { NewTeamModal } from "../../ui/modals/NewTeamModal";
import { TeamListUi } from "../../ui/teams/TeamListUi";

export const TeamList: React.FC = () => {
  const teams = useTeamsQuery({
    notifyOnNetworkStatusChange: true,
  });

  const dispatch = useAppDispatch();
  const teamState = useAppSelector((state) => state.team);
  const [newTeamModal, setNewTeamModal] = useState(false);

  const [createTeam] = useCreateTeamMutation({
    update: (cache) => {
      cache.evict({ fieldName: "teams" });
    },
  });

  // funcs
  const closeNewTeamModal = () => setNewTeamModal(false);
  const setTeamState = (id: string, isOpen: boolean) => {
    dispatch(open(isOpen));
    dispatch(setActiveId(id));
  };
  const onSingleClick = (id: string) => {
    const cond = teamState.activeId === id;
    setTeamState(cond ? "" : id, cond ? false : true);
  };

  return (
    <>
      <TeamListUi
        response={teams}
        onSingleClick={onSingleClick}
        setNewTeamModal={setNewTeamModal}
      />

      <NewTeamModal
        closeNewTeamModal={closeNewTeamModal}
        createTeam={createTeam}
        isOpen={newTeamModal}
        setTeamState={setTeamState}
      />
    </>
  );
};
