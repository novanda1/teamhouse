import { Badge, Box, Flex, Heading, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { ComponentType } from "react";
import { useKanbanStore } from "../../../modules/kanban/useKanbanStore";

export type IKanban = ComponentType<
  {
    renderCard: (kanban: IKanbanCard, utils: IKanbanUtils) => JSX.Element;
    renderColumnHeader: (
      kanban: IKanbanColumn,
      utils: IKanbanUtils
    ) => JSX.Element;
    onCardDragEnd: (board, card, source, destination) => any;
  } & any
>;

export interface IKanbanUtils {
  removeCard: () => void;
  dragging: () => void;
}

export interface IKanbanCard {
  id: string | number;
  title?: string;
  description?: string;
}

export interface IKanbanColumn {
  id: string | number;
  title: string;
  cards: IKanbanCard[];
}

export interface Kanban {
  columns: IKanbanColumn[];
}

const Board: IKanban = dynamic(() => import("@asseinfo/react-kanban"), {
  ssr: false,
});

const CenterPanel: React.FC = () => {
  const kanbanStore = useKanbanStore((s) => s.data);

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
        <Box
          mt="10"
          mx="-2"
          paddingBottom="2"
          sx={{
            ".react-kanban-board": {
              paddingBottom: "10px",
            },
          }}
        >
          <Board
            renderCard={({ title }, { removeCard, dragging }) => (
              <Box
                w="300px"
                mx="2"
                backgroundColor="white"
                p="2"
                rounded="md"
                shadow="sm"
                opacity={dragging ? "0.6" : "1"}
              >
                <Heading size="sm">{title}</Heading>
                <button type="button" onClick={removeCard}>
                  Remove Card
                </button>
              </Box>
            )}
            renderColumnHeader={({ title }) => (
              <Flex
                justifyContent="space-between"
                backgroundColor="thbg.secondary"
                p="3"
                rounded="md"
                mx="2"
                boxShadow="xs"
                marginBottom="5"
              >
                <Heading size="sm">{title}</Heading>
                <Badge
                  backgroundColor="black"
                  color="white"
                  fontWeight="normal"
                  px="1.5"
                >
                  1
                </Badge>
              </Flex>
            )}
            onCardDragEnd={(board, card, source, destination) => {
              console.log(`ok`, board, card, source, destination);
            }}
          >
            {kanbanStore}
          </Board>
        </Box>
      </Flex>
    </>
  );
};

export default CenterPanel;
