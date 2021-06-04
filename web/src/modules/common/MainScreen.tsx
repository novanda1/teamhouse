import { Box } from "@chakra-ui/react";
import React from "react";
import { Wrapper } from "../../components/Wrapper";
import { Dashboard } from "./Dashboard";
import { MainContent } from "./MainContent";

export const MainScreen: React.FC = () => {
  return (
    <>
      <Wrapper>
        <Dashboard />
        <MainContent />
        <Box></Box>
      </Wrapper>
      ;
    </>
  );
};
