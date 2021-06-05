import { Avatar, Flex, Heading, IconButton } from "@chakra-ui/react";
import React from "react";
import { MdAdd, MdPermCameraMic } from "react-icons/md";
import { Team, TeamsQueryResult } from "../../generated/graphql";
import { Fn } from "../../types";

interface TeamListUiProps {
  response: TeamsQueryResult;
  setNewTeamModal: (set: boolean) => void;
  onSingleClick: (id: string) => void;
}

export const TeamUi: React.FC<{ t: Team; onClick: any }> = ({ t, onClick }) => {
  return (
    <>
      <Flex
        py="2"
        key={t._id}
        alignItems="center"
        w="full"
        sx={{ _hover: { cursor: "pointer" } }}
        onClick={onClick}
      >
        <Avatar name={t.name} size="sm" />
        <Heading as="h4" size="sm" ml="4">
          {t.name}
        </Heading>
      </Flex>
    </>
  );
};

export const TeamHeadUi: React.FC<{ onAddTeam: Fn }> = ({ onAddTeam }) => {
  return (
    <Flex justifyContent="space-between" w="full">
      <Heading as="h3" size="md" mb="2">
        Team
      </Heading>
      <IconButton
        aria-label="Add New Team"
        icon={<MdAdd size="85%" />}
        size="xs"
        w="0"
        onClick={onAddTeam}
      />
    </Flex>
  );
};

export const TeamListUiWrapper: React.FC<TeamListUiProps> = ({ children }) => {
  return (
    <>
      <Flex alignItems="flex-start" flexDirection="column" mt="2">
        {children}
      </Flex>
    </>
  );
};
