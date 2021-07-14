import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { BsPlus } from "react-icons/bs";

interface DashboardAddNewProjectButtonProps {}

export const DashboardAddNewProjectButton: React.FC<DashboardAddNewProjectButtonProps> =
  ({}) => {
    return (
      <Box marginTop="auto">
        <Button
          position="relative"
          w="full"
          background="thc.primaryBlue"
          color="white"
          fontWeight="light"
          py="3"
        >
          <Box position="absolute" left="4">
            <BsPlus size="1.2em" />
          </Box>
          <Text>New Project</Text>
        </Button>
      </Box>
    );
  };
