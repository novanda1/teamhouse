import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { Wrapper } from "../components/Wrapper";
import { TeamList } from "../modules/teams/TeamList";
import { withApollo } from "../utils/withApollo";

const Home = () => {
  return (
    <>
      <Wrapper>
        <Box mt="10" position="sticky">
          <Heading as="h1" size="lg" mb="60px">
            Teamhouse
          </Heading>

          <TeamList />
        </Box>
        <Box mt="10">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<FiSearch color="gray.300" />}
            />
            <Input type="text" placeholder="Search anything" variant="filled" />
          </InputGroup>
        </Box>
        <Box></Box>
      </Wrapper>
    </>
  );
};

export default withApollo()(Home);
