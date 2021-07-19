import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Dashboard } from "../component/Dashboard/Dashboard";
import CenterPanel from "../component/Panel/CenterPanel";
import { RightPanel } from "../component/Panel/RightPanel";

export const MainLayout: React.FC = () => {
  return (
    <>
      <Flex maxW="1614px" w="full">
        <Dashboard />
        <CenterPanel />
        <RightPanel />
      </Flex>
    </>
  );
};
