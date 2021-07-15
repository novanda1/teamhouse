import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Dashboard } from "../component/Dashboard/Dashboard";
import CenterPanel from "../component/Panel/CenterPanel";

export const MainLayout: React.FC = () => {
  return (
    <>
      <Flex>
        <Dashboard />
        <CenterPanel />
        <Box></Box>
      </Flex>
    </>
  );
};
