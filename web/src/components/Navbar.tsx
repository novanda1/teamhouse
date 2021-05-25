import {
  Box,
  Container,
  Flex,
  Heading,
  Link,
  List,
  ListItem,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import NextLink from "next/link";
import useIsAuth from "../hooks/useIsAuth";

interface Props {}

function Navbar({}: Props): ReactElement {
  const isLoggedIn = useIsAuth();

  return (
    <Container maxW="container.lg">
      <Flex justifyContent="space-between" pt="1rem" mx="auto">
        <Heading>Teamhouse</Heading>
        <Box>
          <List display="flex" sx={{ gap: 20 }}>
            <ListItem>
              <NextLink href="/">
                <Link>Home</Link>
              </NextLink>
            </ListItem>
            {isLoggedIn ? (
              <ListItem>
                <NextLink href="/profile">
                  <Link>Profile</Link>
                </NextLink>
              </ListItem>
            ) : (
              <ListItem>
                <NextLink href="/login">
                  <Link>Login</Link>
                </NextLink>
              </ListItem>
            )}
          </List>
        </Box>
      </Flex>
    </Container>
  );
}

export default Navbar;
