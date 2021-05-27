import { Container } from "@chakra-ui/layout";
import React from "react";
import Navbar from "./Navbar";

interface Props {}

export const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container maxW="container.lg" mt="16">
        {children}
      </Container>
    </>
  );
};

