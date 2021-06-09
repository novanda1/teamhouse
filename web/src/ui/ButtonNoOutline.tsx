import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

export const ButtonNoOutline: React.FC<ButtonProps> = ({ children, ...p }) => {
  return (
    <Button {...p} _focus={{ outline: "none" }}>
      {children}
    </Button>
  );
};
