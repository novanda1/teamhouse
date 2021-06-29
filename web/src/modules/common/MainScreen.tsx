import React from "react";
import { Wrapper } from "../../components/Wrapper";
import { WaitForAuth } from "../auth/WaitForAuth";
import { TeamModal } from "../teams/TeamModal";
import { WebSocketProvider } from "../ws/WebSocketProvider";
import { Dashboard } from "./Dashboard";
import { MainPanel } from "./MainPanel";
import { RightPanel } from "./RightPanel";

export const MainScreen: React.FC = () => {
  return (
    <>
      <WaitForAuth>
        {/* <WebSocketProvider> */}
        <Wrapper>
          <Dashboard />
          <MainPanel />
          <RightPanel />
        </Wrapper>
        <TeamModal />
        {/* </WebSocketProvider> */}
      </WaitForAuth>
    </>
  );
};
