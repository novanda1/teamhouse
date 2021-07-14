import { Flex, Button, Text } from "@chakra-ui/react";
import React from "react";
import { BiBarChartSquare, BiChart } from "react-icons/bi";
import { RiSettings4Line } from "react-icons/ri";

interface DashboardNavigationProps {}

export const DashboardNavigation: React.FC<DashboardNavigationProps> = ({}) => {
  return (
    <Flex
      color="text.dimmed"
      flexDirection="column"
      alignItems="flex-start"
      px="1"
    >
      <Button
        backgroundColor="transparent"
        w="full"
        display="flex"
        justifyContent="flex-start"
      >
        <BiBarChartSquare size="1.5em" />
        <Text ml="3">Dashboard</Text>
      </Button>
      <Button
        backgroundColor="transparent"
        w="full"
        display="flex"
        justifyContent="flex-start"
      >
        <RiSettings4Line size="1.5em" />
        <Text ml="3">Settings</Text>
      </Button>
      <Button
        backgroundColor="transparent"
        w="full"
        display="flex"
        justifyContent="flex-start"
      >
        <BiChart size="1.5em" />
        <Text ml="3">All Activity</Text>
      </Button>
    </Flex>
  );
};
