import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthLogin } from "../../modules/auth/useAuthLogin";
import { Wrapper } from "../layout/Wrapper";
import { Tbutton } from "./Tbutton";

export const Login: React.FC = () => {
  const { onLoginButtonClick } = useAuthLogin();

  return (
    <>
      <Wrapper
        props={{
          maxW: "md",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Flex
          border="1px solid"
          flexDirection="column"
          py="4"
          px="5"
          backgroundColor="white"
          rounded="lg"
        >
          <Box mb="6">
            <Heading size="lg">Welcome!</Heading>
            <Text color="text.paragraph" size="sm" mt="1">
              By registering, you agree to {`Teemee's`}{" "}
              <Link>Term of Service</Link> and <Link>Privacy Policy</Link>
            </Text>
          </Box>

          <Tbutton variant="primary" onClick={onLoginButtonClick}>
            Continue with Google
          </Tbutton>
        </Flex>
      </Wrapper>
    </>
  );
};
