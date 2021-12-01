import { Container, Flex } from "@chakra-ui/react";
import React from "react";

export const MainLayout: React.FC = ({ children }) => {
  return (
    <>
      <Container mt="5" maxW="2xl">{children}</Container>
    </>
  );
};
