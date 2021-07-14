import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { BiBarChartSquare, BiChart } from "react-icons/bi";
import { CgArrowsScrollV } from "react-icons/cg";
import {
  RiSettings4Line,
  RiArrowDropUpLine,
  RiArrowDropDownLine,
} from "react-icons/ri";
import { TiArrowSortedDown } from "react-icons/ti";
import { BsPlus } from "react-icons/bs";

export const Dashboard: React.FC = () => {
  return (
    <>
      <Flex
        backgroundColor="thbg.secondary"
        h="100vh"
        py="7"
        px="6"
        boxShadow="inner"
        flexDirection="column"
      >
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

        <Box mb="8"></Box>

        {/* nav */}
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

        {/* projects */}
        <Box mb="8"></Box>
        <Flex flexDirection="column">
          <Button
            w="full"
            display="flex"
            justifyContent="flex-start"
            backgroundColor="transparent"
          >
            <TiArrowSortedDown
              style={{ transform: "rotate(-90deg)" }}
              size="1.2em"
              color="var(--chakra-colors-text-dimmed)"
            />
            <Text ml="1.5">⚡ Daily Task</Text>
          </Button>
          <Button
            w="full"
            display="flex"
            justifyContent="flex-start"
            backgroundColor="transparent"
          >
            <TiArrowSortedDown
              style={{ transform: "rotate(-90deg)" }}
              size="1.2em"
              color="var(--chakra-colors-text-dimmed)"
            />
            <Text ml="1.5">🤷‍♂️ Meeting Summary</Text>
          </Button>
          <Button
            w="full"
            display="flex"
            justifyContent="flex-start"
            backgroundColor="transparent"
          >
            <TiArrowSortedDown
              style={{ transform: "rotate(-90deg)" }}
              size="1.2em"
              color="var(--chakra-colors-text-dimmed)"
            />
            <Text ml="1.5">📃 Document</Text>
          </Button>
        </Flex>

        {/* cta */}
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
      </Flex>
    </>
  );
};
