import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Link,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useAuthStore } from "../../modules/auth/useAuthStore";

export const MainLayout: React.FC = ({ children }) => {
  const { me } = useAuthStore();
  return (
    <>
      <Box w="100vw" top="0">
        <Container maxW="6xl" borderBottomWidth="1px" borderColor="gray.200">
          <HStack py="3" justifyContent="space-between">
            <Box>
              <NextLink href="/">
                <Link>
                  <Heading size="md">TeamHouse</Heading>
                </Link>
              </NextLink>
            </Box>
            <Box>
              <Avatar name={me?.username} size="sm" />
            </Box>
          </HStack>
        </Container>
      </Box>
      <Container maxW="6xl">{children}</Container>
    </>
  );
};
