import React, { useEffect } from "react";
import {
  useNotifSubscription,
  usePushNotifMutation,
} from "../generated/graphql";
import { MainScreen } from "../modules/common/MainScreen";
import { usePanelStore, IPanelStore } from "../modules/common/usePanelStore";
import { withApollo } from "../utils/withApollo";

const Home = () => {
  const panel = usePanelStore();
  const s = useNotifSubscription();
  const [p] = usePushNotifMutation();

  useEffect(() => {
    console.log(`s`, s);
  }, [s]);
  useEffect(() => {
    panel.set((s: IPanelStore) => void (s.mainPanel = "idle"));
  }, []);

  return (
    <>
      {JSON.stringify(s)}
      <button
        onClick={() => {
          p({ variables: { message: "asd" } });
        }}
      >
        push
      </button>
      <MainScreen />
    </>
  );
};

export default withApollo()(Home);
