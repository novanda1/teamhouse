import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import Navbar from "./Navbar";

interface Props {}

export const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Flex justifyContent="center" maxH="100vh" h="100vh">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "235px 640px 325px",
            columnGap: 60,
          }}
        >
          {children}
        </Box>
      </Flex>
    </>
  );
};
