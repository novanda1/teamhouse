import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { Wrapper } from "../components/Wrapper";
import { TeamDetail } from "../modules/teams/TeamDetail";
import { TeamList } from "../modules/teams/TeamList";
import { withApollo } from "../utils/withApollo";

const Home = () => {
  return (
    <>
      <Wrapper>
        <Box py="10" position="sticky">
          <Heading color="brand.100" as="h1" size="lg" pb="60px">
            Teamhouse
          </Heading>

          <TeamList />
        </Box>
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
        <Box></Box>
      </Wrapper>
    </>
  );
};

export default withApollo()(Home);
