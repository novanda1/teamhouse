import { Avatar, Button, Flex, Heading, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { memo } from "react";
import { useCallback } from "react";
import { MdAdd } from "react-icons/md";
import { Team, TeamsQueryResult } from "../../generated/graphql";
import { Fn } from "../../types";
import { ButtonNoOutline } from "../ButtonNoOutline";

interface TeamListUiProps {
  response: TeamsQueryResult;
}

export const TeamUi: React.FC<{ t: Team }> = ({ t }) => {
  const { push, query } = useRouter();
  const onClick = useCallback(() => {
    push(`/team/${t._id}`);
  }, [push]);
  return (
    <>
      <ButtonNoOutline w="full" h="auto" variant="unstyled" onClick={onClick}>
        <Flex
          py="2"
          key={t._id}
          alignItems="center"
          _hover={{ bgColor: "transparent" }}
          w="full"
        >
          {query?.id && query.id === t._id ? (
            <>
              <Avatar
                name={t.name}
                size="sm"
                backgroundColor="purple.100"
                color="gray.800"
              />
              <Heading as="h4" size="sm" ml="4">
                {t.name}
              </Heading>
            </>
          ) : (
            <>
              <Avatar
                name={t.name}
                backgroundColor="whiteAlpha.600"
                color="gray.900"
                size="sm"
              />
              <Heading as="h4" size="sm" ml="4" color="whiteAlpha.600">
                {t.name}
              </Heading>
            </>
          )}
        </Flex>
      </ButtonNoOutline>
    </>
  );
};

export const TeamHeadUi: React.FC<{ onAddTeam: Fn }> = memo(({ onAddTeam }) => {
  return (
    <Flex justifyContent="space-between" w="full" mb="2">
      <Heading
        as="h3"
        display="flex"
        alignItems="center"
        size="xs"
        textTransform="uppercase"
        color="whiteAlpha.600"
      >
        Team
      </Heading>
      <IconButton
        aria-label="Add New Team"
        icon={<MdAdd size="85%" />}
        size="xs"
        w="0"
        rounded="full"
        backgroundColor="whiteAlpha.600"
        onClick={onAddTeam}
      />
    </Flex>
  );
});

export const TeamListUiWrapper: React.FC<TeamListUiProps> = ({ children }) => {
  return (
    <>
      <Flex alignItems="flex-start" flexDirection="column" mt="2">
        {children}
      </Flex>
    </>
  );
};
