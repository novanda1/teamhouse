import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { TeamList } from "../teams/TeamList";

interface Props {}

export const Dashboard: React.FC<Props> = () => {
  return (
    <>
      <Box py="10" position="sticky">
        <Heading color="brand.100" as="h1" size="lg" pb="60px">
          Teamhouse
        </Heading>
        <TeamList />
      </Box>
    </>
  );
};
