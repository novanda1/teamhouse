import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { Team } from "../../generated/graphql";
import { useMessageSocketStore } from "../../modules/chat/useMessageSocket";

type Props = {
  teams: Team[];
};

const TeamList: React.FC<Props> = ({ teams }) => {
  const { push } = useRouter();
  const { setOpenedTeam, setOpen } = useMessageSocketStore();

  const gotoTeam = useCallback(
    (team) => {
      // push("/team/" + id);
      setOpenedTeam(team);
      setOpen(true);
    },
    [setOpenedTeam, setOpen]
  );

  const handleActivateTeam = useCallback(() => {}, []);

  return (
    <>
      <Flex
        bg="gray.100"
        rounded="lg"
        px="3"
        py="2"
        flexDirection="column"
        borderWidth="1px"
        borderColor="gray.200"
        maxW="sm"
      >
        {teams.map((team) => (
          <HStack
            key={team.id}
            w="100%"
            py="2"
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
    </>
  );
};

export default TeamList;
