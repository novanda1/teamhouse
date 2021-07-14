import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { DashboardAddNewProjectButton } from "./DashboardAddNewProjectButton";
import { DashboardNavigation } from "./DashboardNavigation";
import { DashboardProjectList } from "./DashboardProjectList";
import { DashboardTeamSelector } from "./DashboardTeamSelector";

export const Dashboard: React.FC = () => {
  return (
    <>
      <Flex
        backgroundColor="thbg.secondary"
        h="100vh"
        py="7"
        px="6"
        boxShadow="inner"
        flexDirection="column"
      >
        <DashboardTeamSelector />
        <Box mb="7"></Box>

        <DashboardNavigation />
        <Box mb="7"></Box>

        <DashboardProjectList />

        <DashboardAddNewProjectButton />
      </Flex>
    </>
  );
};
