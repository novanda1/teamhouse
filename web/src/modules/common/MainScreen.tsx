import React from "react";
import { Wrapper } from "../../components/Wrapper";
import { TeamModal } from "../teams/TeamModal";
import { Dashboard } from "./Dashboard";
import { MainPanel } from "./MainPanel";
import { RightPanel } from "./RightPanel";

export const MainScreen: React.FC = () => {
  return (
    <>
      <Wrapper>
        <Dashboard />
        <MainPanel />
        <RightPanel />
      </Wrapper>
      <TeamModal />
    </>
  );
};
