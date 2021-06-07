import { Box, Button, Container, Flex, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { InputField } from "../../components/InputField";
import { useLoginMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { useTokenStore } from "../auth/useTokenStore";

interface Props {}

export const LoginPage: React.FC<Props> = () => {
  const { push, query } = useRouter();
  const next = query?.next; // /login?next=thisIsTheOutput

  /**
   * @todo make this better
   */
  const [isLoggedIn, setIsLoggedIn] =
    useState<"loading" | "no" | "yeah">("loading");

  const hasTokens = useTokenStore((s) => !!(s.accessToken && s.refreshToken));

  const [login] = useLoginMutation();

  useEffect(() => {
    hasTokens ? setIsLoggedIn("yeah") : setIsLoggedIn("no");

    if (isLoggedIn === "yeah") {
      push(!next ? "/home" : `${next}`);
    }
  }, [hasTokens, push, next, isLoggedIn]);

  if (isLoggedIn === "loading") return <></>;

  if (isLoggedIn === "no")
    return (
      <>
        <Container mt="40" variant="small">
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={async (values, { setErrors, setSubmitting }) => {
              const response = await login({
                variables: values,
              });

              const user = response.data?.login.user;

              if (response?.data.login.errors) {
                setErrors(toErrorMap(response.data?.login.errors));
              } else if (response.data?.login.user) {
                setSubmitting(true);
                const tokens = response.data?.login.tokens;
                if (tokens)
                  useTokenStore.getState().setTokens({
                    accessToken: tokens.accessToken.token,
                    refreshToken: tokens.refreshToken.token,
                  });
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  name="username"
                  placeholder="username"
                  label="Username"
                  autoComplete="username"
                  required
                />
                <Box mt={4}>
                  <InputField
                    name="password"
                    placeholder="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    required
                  />
                </Box>
                <Flex justifyContent="center">
                  <Button
                    mt={10}
                    w="full"
                    type="submit"
                    isLoading={isSubmitting}
                    colorScheme="purple"
                  >
                    Login
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>

          <Box mt="4" textAlign="center">
            Didn't have account yet? please{" "}
            <NextLink href="/register">
              <Link color="purple.200">Register</Link>
            </NextLink>
          </Box>
        </Container>
      </>
    );

  return <></>;
};
