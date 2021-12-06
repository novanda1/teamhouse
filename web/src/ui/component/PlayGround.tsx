import { Box, HStack, VStack, Heading, Divider, Text } from "@chakra-ui/react";
import React from "react";
import { Team } from "../../generated/graphql";
import { useMessageSocketStore } from "../../modules/chat/useMessageSocket";

const PlayGroundIdle: React.FC = () => {
  return <>Hello World</>;
};

const PlayGroundOpened: React.FC<{ openedTeam: Team }> = ({ openedTeam }) => {
  return (
    <>
      <VStack w="full" alignItems="flex-start">
        <Heading size="md">{openedTeam.title}</Heading>
        <Text m="0">{openedTeam.description}</Text>
      </VStack>

      <Divider />
    </>
  );
};

const PlayGround: React.FC = () => {
  const { openedTeam } = useMessageSocketStore();

  return (
    <>
      <VStack
        w="full"
        rounded="lg"
        borderWidth="1px"
        borderColor="gray.200"
        backgroundColor="gray.50"
        position="sticky"
        top="0"
        px="4"
        py="3"
        h="full"
      >
        {openedTeam ? (
          <PlayGroundOpened openedTeam={openedTeam} />
        ) : (
          <PlayGroundIdle />
        )}
      </VStack>
    </>
  );
};

export default PlayGround;
