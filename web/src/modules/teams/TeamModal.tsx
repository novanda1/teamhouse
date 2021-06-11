import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React, { memo } from "react";
import { AddMemberModalContent } from "./AddMember";
import { AddUpdateTeamModalContent } from "./AddUpdateTeamModalContent";
import { ITeamStore, useTeamStore } from "./useTeamStore";

interface Props {}

const TeamModalContent: React.FC = memo(() => {
  const teamStore = useTeamStore();
  if (teamStore.modalType !== "") {
    if (teamStore.modalType === "addMember") return <AddMemberModalContent />;
    if (teamStore.modalType === "add" || teamStore.modalType === "update")
      return <AddUpdateTeamModalContent />;
  }
  return <></>;
});

export const TeamModal: React.FC<Props> = ({}) => {
  const teamStore = useTeamStore();
  const handleClose = () =>
    void teamStore.set((s: ITeamStore) => {
      s.modalIsOpen = false;
      s.modalData = null;
      s.modalType = "";
    });

  return (
    <Modal
      isOpen={teamStore.modalIsOpen}
      onClose={handleClose}
      size="lg"
      isCentered
    >
      <ModalOverlay />
      <ModalContent py="6" px="3">
        <TeamModalContent />
      </ModalContent>
    </Modal>
  );
};
