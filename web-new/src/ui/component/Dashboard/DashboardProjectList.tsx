import { Flex, Button, Text } from "@chakra-ui/react";
import React from "react";
import { TiArrowSortedDown } from "react-icons/ti";

interface DashboardProjectListProps {}

export const DashboardProjectList: React.FC<DashboardProjectListProps> =
  ({}) => {
    return (
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
    );
  };
