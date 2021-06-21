import { Button } from "@chakra-ui/react";
import React, { memo, useCallback } from "react";
import { useTeamsQuery } from "../../generated/graphql";
import { useGetId } from "../../hooks/useGetId";
import { ITeamStore, useTeamStore } from "./useTeamStore";

export const AddMember: React.FC = memo(() => {
  const id = useGetId();
  const teamStore = useTeamStore();
  const { data, loading } = useTeamsQuery({ variables: { limit: 10 } });
  const team = data?.teams.find((t) => t._id === id);

  const openModal = useCallback(() => {
    /**
     * equal with
     * (({ __typename, ...o }) => o)(team);
+     */
    const { __typename, ...modalData } = team;
    teamStore.set((s: ITeamStore) => {
      s.modalData = modalData;
      s.modalType = "addMember";
      s.modalIsOpen = true;
    });
    // console.log(`teamstore`, teamStore);
  }, [teamStore.set]);

  return (
    <>
      <Button ml="2" size="xs" onClick={openModal}>
        Add New
      </Button>
    </>
  );
});

export const AddMemberModalContent: React.FC = () => {
  return <>yeah</>;
};
