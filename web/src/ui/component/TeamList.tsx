import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { Team } from "../../generated/graphql";

type Props = {
  teams: Team[];
};

const TeamList: React.FC<Props> = ({ teams }) => {
  const { push } = useRouter();

  const gotoTeam = useCallback(
    (id) => {
      push("/team/" + id);
    },
    [push]
  );

  return (
    <>
      <Flex flexDirection="column">
        {teams.map((team) => (
          <Box
            key={team.id}
            w="100%"
            mb="2"
            cursor="pointer"
            onClick={() => gotoTeam(team.id)}
          >
            <Heading size="sm">{team.title}</Heading>
          </Box>
        ))}
      </Flex>
    </>
  );
};

export default TeamList;
