import { Container } from "@chakra-ui/react";
import React from "react";
import Navbar from "../components/Navbar";
import { useProjectsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const Home = () => {
  const { data, loading } = useProjectsQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 10,
    },
  });

  if (loading)
    return (
      <>
        <Navbar />
        <Container mt="7" maxW="container.lg">
          loading...
        </Container>
      </>
    );

  return (
    <>
      <Navbar />
      <Container mt="7" maxW="container.lg">
        {data.projects.map((p, i) => (
          <div key={i}>{p.title}</div>
        ))}
      </Container>
    </>
  );
};

export default withApollo({ ssr: true })(Home);
