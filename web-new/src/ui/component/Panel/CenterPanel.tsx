import { Badge, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

const CenterPanel: React.FC = () => {
  return (
    <>
      <Flex flexDirection="column" py="7" px="6">
        <Heading size="lg">⚡ Daily Task</Heading>
        <Text color="text.dimmed" mt="3">
          Click
          <Badge
            textTransform="none"
            color="thc.primaryBlue"
            fontWeight="bold"
            backgroundColor="gray.100"
            mx="2"
          >
            + New
          </Badge>
          to create new list and wait for project manager card. <br />
          Avoid create a card by your self to manage a good collaboration
        </Text>
      </Flex>
    </>
  );
};

export default CenterPanel;
