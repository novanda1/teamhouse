import { Box } from "@chakra-ui/react";
import React from "react";

export const Space: React.FC<{
  props: import("@chakra-ui/system").ChakraComponent<"div", {}>;
}> = ({ props }) => {
  return <Box {...props}></Box>;
};
