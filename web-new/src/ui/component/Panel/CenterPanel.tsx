import { Badge, Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import dynamic from "next/dynamic";

const Board = dynamic(() => import("@asseinfo/react-kanban"), { ssr: false });

const CenterPanel: React.FC = () => {
  const board = {
    columns: [
      {
        id: 1,
        title: "Next Up",
        cards: [
          {
            id: 1,
            title:
              "[Sejalur Studio] - Create Prototype Mobile for Get Notification in Principle",
            description: "Add capability to add a card in a column",
            content: "the content 1",
          },
        ],
      },
      {
        id: 2,
        title: "In Progress",
        cards: [
          {
            id: 2,
            title: "Drag-n-drop support",
            description: "Move a card between the columns",
            content: "the content 2",
          },
        ],
      },
      {
        id: 3,
        title: "Complete",
        cards: [
          {
            id: 3,
            title: "Drag-n-drop support",
            description: "Move a card between the columns",
            content: "the content 2",
          },
        ],
      },
    ],
  };

  return (
    <>
      <Flex flexDirection="column" py="7" px="6">
        <Box>
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
        </Box>
        <Box>
          <Board
            renderCard={({ content, title }, { removeCard, dragging }) => (
              <Box w="300px">
                <Heading size="sm">{title}</Heading>
                {/* {content}  */}
                <button type="button" onClick={removeCard}>
                  Remove Card
                </button>
              </Box>
            )}
          >
            {board}
          </Board>
        </Box>
      </Flex>
    </>
  );
};

export default CenterPanel;
