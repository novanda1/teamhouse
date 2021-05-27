import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link,
  List,
  ListItem,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Navbar from "../components/Navbar";
import { useTeamsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const Home = () => {
  const router = useRouter();
  const { data, loading } = useTeamsQuery({
    notifyOnNetworkStatusChange: true,
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
      <Container mt="16" maxW="container.lg">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading>Teams</Heading>
          <Button
            variant="outline"
            colorScheme="purple"
            onClick={() => {
              router.push("/team/create");
            }}
          >
            Create New Team
          </Button>
        </Flex>
        <List mt="4">
          {data.teams.map((p, i) => (
            <ListItem key={i}>
              <Box>
                <NextLink href={`/team/${p._id}`}>
                  <Link>
                    <Heading as="h3" size="md" color="purple.200">
                      {p.name}
                    </Heading>
                  </Link>
                </NextLink>
              </Box>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};

export default withApollo({ ssr: true })(Home);
