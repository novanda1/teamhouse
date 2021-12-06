import {
  Avatar,
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { Team } from "../../generated/graphql";
import { useMessageSocketStore } from "../../modules/chat/useMessageSocket";
import CreateTeamModal from "./CreateTeamModal";

type Props = {
  teams: Team[];
};

const TeamList: React.FC<Props> = ({ teams }) => {
  const { setOpenedTeam, setOpen, openedTeam } = useMessageSocketStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const gotoTeam = useCallback(
    (team) => {
      // push("/team/" + id);
      setOpenedTeam(team);
      setOpen(true);
    },
    [setOpenedTeam, setOpen]
  );

  return (
    <>
      <Flex flexDirection="column" maxW="xs" minW="xs">
        <VStack alignItems="flex-start" mb="4">
          <HStack justifyContent="" pt="7">
            <Heading size="sm">Your Teams</Heading>
            <Badge
              cursor="pointer"
              backgroundColor="yellow.200"
              onClick={onOpen}
            >
              + Add New
            </Badge>
          </HStack>
          <Text fontWeight="xs">Select or create new</Text>
        </VStack>
        <Flex
          bg="gray.50"
          rounded="lg"
          overflow="hidden"
          borderWidth="1px"
          borderColor="gray.200"
          flexDirection="column"
        >
          {teams.map((team) => (
            <HStack
              key={team.id}
              w="100%"
              py="2"
              px="3"
              backgroundColor={
                openedTeam?.id === team.id ? "gray.100" : "gray.50"
              }
              borderColor="gray.200"
              cursor="pointer"
              onClick={() => gotoTeam(team)}
              _notLast={{ borderBottomWidth: "1px" }}
            >
              <Avatar size="lg" mr="2" name={team.title} />
              <VStack alignItems="flex-start">
                <Heading size="sm">{team.title}</Heading>
                <Text fontSize="sm">{team.description}</Text>
              </VStack>
            </HStack>
          ))}
        </Flex>
      </Flex>
      <CreateTeamModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default TeamList;
