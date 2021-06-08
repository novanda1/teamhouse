import React from "react";
import { Wrapper } from "../../components/Wrapper";
import { TeamModal } from "../teams/TeamModal";
import { Dashboard } from "./Dashboard";
import { MainContent } from "./MainContent";
import { RightPanel } from "./RightPanel";

export const MainScreen: React.FC = () => {
  return (
    <>
      <Wrapper>
        <Dashboard />
        <MainContent />
        <RightPanel />
      </Wrapper>
      <TeamModal />
    </>
  );
};
