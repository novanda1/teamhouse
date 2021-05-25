import { Box, Button, Container, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import Navbar from "../components/Navbar";
import { useRegisterMutation, MeQuery, MeDocument } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  return (
    <>
      <Navbar />
      <Container mt="16" variant="small">
        <Formik
          initialValues={{ email: "", username: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({
              variables: values,
              update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: "Query",
                    me: data?.register.user,
                  },
                });
              },
            });
            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.user) {
              router.push("/");
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
              <Button
                w="full"
                mt={10}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="purple"
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
        <Box w="full" textAlign="center" mt="4">
          Already have an account? Please{" "}
          <NextLink href="/login">
            <Link color='purple.200'>Login</Link>
          </NextLink>
        </Box>
      </Container>
    </>
  );
};

export default withApollo({ ssr: false })(Register);
