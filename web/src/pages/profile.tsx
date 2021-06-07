import { Container } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import Navbar from "../components/Navbar";
import { useMeQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

interface Props {}

function profile({}: Props): ReactElement {
  const { data, loading } = useMeQuery();

  if (loading) {
    return (
      <>
        <Navbar />
        <Container mt="16" maxW="container.lg">
          Loading
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container mt="16" maxW="container.lg">
        {data?.me.user.username}
      </Container>
    </>
  );
}

export default withApollo()(profile);
