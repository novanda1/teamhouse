import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Dashboard } from "../component/Dashboard/Dashboard";

export const MainLayout: React.FC = () => {
  return (
    <>
      <Flex>
        <Dashboard />
        <Box></Box>
        <Box></Box>
      </Flex>
    </>
  );
};
