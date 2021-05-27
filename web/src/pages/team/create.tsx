import React from "react";
import { Wrapper } from "../../components/Wrapper";
import { withApollo } from "../../utils/withApollo";

interface Props {}

const Create: React.FC<Props> = () => {
  return <Wrapper>create</Wrapper>;
};

export default withApollo()(Create);
