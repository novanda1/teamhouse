import { Button, Avatar, Text } from "@chakra-ui/react";
import React from "react";
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";

interface DashboardTeamSelectorProps {}

export const DashboardTeamSelector: React.FC<DashboardTeamSelectorProps> =
  ({}) => {
    return (
      <Button
        backgroundColor="white"
        shadow="sm"
        py="2"
        height="max-content"
        display="flex"
        justifyContent="flex-start"
        rounded="xl"
        position="relative"
      >
        <Avatar name="Sejalur Studio" size="sm" mr="2" />
        <Text mr="3">Some Studio</Text>
        <Text color="text.dimmed" position="absolute" right="3">
          <RiArrowDropUpLine size="1.5em" style={{ marginBottom: "-10px" }} />
          <RiArrowDropDownLine size="1.5em" style={{ marginTop: "-15px" }} />
        </Text>
      </Button>
    );
  };
