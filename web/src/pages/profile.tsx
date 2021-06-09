import React, { ReactElement, useEffect } from "react";
import { MainScreen } from "../modules/common/MainScreen";
import { usePanelStore, IPanelStore } from "../modules/common/usePanelStore";
import { withApollo } from "../utils/withApollo";

interface Props {}

function profile({}: Props): ReactElement {
  const panel = usePanelStore();
  useEffect(() => {
    panel.set((s: IPanelStore) => void (s.mainPanel = "profile"));
  }, []);

  return (
    <>
      <MainScreen />
    </>
  );
}

export default withApollo()(profile);
