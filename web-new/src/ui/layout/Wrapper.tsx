import { Container, ContainerProps, ThemingProps } from "@chakra-ui/react";
import React from "react";

interface WrapperProps {
  props: ContainerProps;
}

export const Wrapper: React.FC<WrapperProps> = ({ props, children }) => {
  return (
    <>
      <Container {...props} maxW={props.maxW ? props.maxW : "container.xl"}>
        {children}
      </Container>
    </>
  );
};
