import React from "react";
import { CgArrowsScrollV } from "react-icons/cg";
import { Avatar, Button, Flex, Text } from "@chakra-ui/react";

export const Dashboard: React.FC = () => {
  return (
    <>
      <Flex
        backgroundColor="thbg.secondary"
        h="100vh"
        py="7"
        px="8"
        boxShadow="inner"
      >
        <Button
          backgroundColor="white"
          shadow="sm"
          py="3"
          height="max-content"
          display="flex"
          rounded="lg"
        >
          <Avatar title="Sejalur Studio" size="sm" mr="2" />
          <Text mr="3">Sejalur Studio</Text>
          <CgArrowsScrollV size="1.5em" />
        </Button>
      </Flex>
    </>
  );
};
