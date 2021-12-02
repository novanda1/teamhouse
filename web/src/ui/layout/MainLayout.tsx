import { Container, Flex } from "@chakra-ui/react";
import React from "react";

export const MainLayout: React.FC = ({ children }) => {
  return (
    <>
      <Container maxW="2xl">{children}</Container>
    </>
  );
};
