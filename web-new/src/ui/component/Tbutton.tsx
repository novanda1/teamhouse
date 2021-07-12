import { Button } from "@chakra-ui/react";
import React from "react";

interface TbuttonProps {
  variant: "primary" | "secondary";
  onClick: () => void;
}

export const Tbutton: React.FC<TbuttonProps> = ({
  children,
  variant,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      backgroundColor={variant === "primary" ? "blackAlpha.900" : "white"}
      color={variant === "primary" ? "white" : "blackAlpha.900"}
      //   _hover={variant === "primary" ? { color: "" } : { color: "#fafafa" }}
      mb="4"
    >
      {children}
    </Button>
  );
};
