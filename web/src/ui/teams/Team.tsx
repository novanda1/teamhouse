import { Avatar, Flex, Heading, IconButton } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { MdAdd } from "react-icons/md";
import { Team, TeamsQueryResult } from "../../generated/graphql";
import { Fn } from "../../types";

interface TeamListUiProps {
  response: TeamsQueryResult;
}

export const TeamUi: React.FC<{ t: Team }> = ({ t }) => {
  return (
    <>
      <NextLink href={`/team/${t._id}`}>
        <a style={{ width: "100%" }}>
          <Flex
            py="2"
            key={t._id}
            alignItems="center"
            w="full"
            sx={{ _hover: { cursor: "pointer" } }}
          >
            <Avatar name={t.name} size="sm" />
            <Heading as="h4" size="sm" ml="4">
              {t.name}
            </Heading>
          </Flex>
        </a>
      </NextLink>
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
