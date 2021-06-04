import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { TeamDetail } from "../teams/TeamDetail";

interface Props {}
export const MainContent: React.FC<Props> = () => {
  return (
    <>
      <Flex py="10" flexDirection="column">
        <InputGroup pb="60px">
          <InputLeftElement
            pointerEvents="none"
            children={<FiSearch color="gray.300" />}
          />
          <Input type="text" placeholder="Search anything" variant="filled" />
        </InputGroup>
        <TeamDetail />
      </Flex>
    </>
  );
};
