import { Container, Box, Button, Link, Flex } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { InputField } from "../components/InputField";
import Navbar from "../components/Navbar";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";

interface Props {}

function Login({}: Props): ReactElement {
  const [login] = useLoginMutation();
  const router = useRouter();
  const next = router.query?.next; // /login?next=thisIsTheOutput

  return (
    <>
      <Navbar />
      <Container mt="16" variant="small">
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({
              variables: values,
            });

            console.log("error", response.data.login);
            if (response?.data.login.errors) {
              setErrors(toErrorMap(response.data?.login.errors));
            } else if (response.data?.login.user) {
              next ? router.push(`${next}`) : router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="username"
                placeholder="username"
                label="Username"
                required
              />
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
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
}

export default withApollo()(Login);
