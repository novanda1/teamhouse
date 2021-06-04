import React from "react";
import { MainScreen } from "../modules/common/MainScreen";
import { withApollo } from "../utils/withApollo";

const Home = () => {
  return <MainScreen />;
};

export default withApollo()(Home);
