import { Button, Container, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useCallback } from "react";
import { IoLogoGoogle } from "react-icons/io";
import { useMeQuery } from "../../generated/graphql";
import { useLoginFromUrl } from "../../hooks/useLoginFromUrl";
import { useTokenStore } from "../auth/useTokenStore";

interface Props {}

export const LoginPage: React.FC<Props> = () => {
  const { push } = useRouter();
  const token = useTokenStore();
  const { data } = useMeQuery();

  useLoginFromUrl();

  const handleGoogleLogin = useCallback(() => {
    push("http://localhost:4000/google");
  }, [push]);

  useEffect(() => {
    if (token.isLoggedIn == "loggedIn") {
      push("/home");
    }
  }, [data]);
  return (
    <>
      <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
        <Container>
          <Flex
            flexDirection="column"
            bg="whiteAlpha.50"
            maxW="sm"
            padding="10"
          >
            <Heading size="lg" color="whiteAlpha.900">
              Teamhouse
            </Heading>
            <Text mt="2" fontSize="medium">
              By logging in you accept our{" "}
              <Link color="purple.300">
                Privacy <br /> Policy
              </Link>{" "}
              and <Link color="purple.300">Terms of Service</Link>.
            </Text>
            <Flex flexDirection="column" mt="7">
              <Button bg="gray.200" onClick={handleGoogleLogin}>
                <IoLogoGoogle />
                <Text ml="3">Continue with Google</Text>
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Flex>
    </>
  );
};
