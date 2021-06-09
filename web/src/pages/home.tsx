import React, { useEffect } from "react";
import { MainScreen } from "../modules/common/MainScreen";
import { usePanelStore, IPanelStore } from "../modules/common/usePanelStore";
import { withApollo } from "../utils/withApollo";

const Home = () => {
  const panel = usePanelStore();
  useEffect(() => {
    panel.set((s: IPanelStore) => void (s.mainPanel = "idle"));
  }, []);
  return <MainScreen />;
};

export default withApollo()(Home);
