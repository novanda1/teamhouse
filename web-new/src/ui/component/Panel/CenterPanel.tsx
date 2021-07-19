import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { ComponentType, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import {
  IKanbanCard,
  IKanbanColumn,
  IKanbanUtils,
  Kanban,
  useKanbanStore,
} from "../../../modules/kanban/useKanbanStore";
import { HiOutlineClock } from "react-icons/hi";
import { useCallback } from "react";
import { useEffect } from "react";

export type IKanban = ComponentType<{
  renderCard?: (kanban: IKanbanCard, utils: IKanbanUtils) => JSX.Element;
  renderColumnHeader?: (
    kanban: IKanbanColumn,
    utils: IKanbanUtils
  ) => JSX.Element;
  onCardDragEnd?: (
    _board: Kanban,
    card: IKanbanCard,
    source: { fromPosition: number; fromColumnId: number },
    destination: { toPosition: number; toColumnId: number }
  ) => void;
  initialBoard?: Kanban;
  disableColumnDrag?: boolean;
}>;

const Board: IKanban = dynamic(() => import("@asseinfo/react-kanban"), {
  ssr: false,
});

const CenterPanel: React.FC = () => {
  const kanbanStore = useKanbanStore((s) => s.data);
  const kanban = useKanbanStore();

  const [board, setboard] = useState<Kanban>(kanbanStore);

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
            renderCard={({ title, id }, { removeCard, dragging }) => (
              <Box
                key={id}
                w="300px"
                mx="2"
                mb="2"
                backgroundColor="white"
                px="4"
                py="3"
                rounded="md"
                shadow="sm"
                opacity={dragging ? "0.6" : "1"}
              >
                <Flex justifyContent="space-between" mb="3">
                  <Badge rounded="full" h="1.6rem" w="1.6rem" p="1">
                    ✨
                  </Badge>
                  <BsThreeDots />
                </Flex>
                <Heading size="sm" fontWeight="medium" mb="5" noOfLines={2}>
                  {title}
                </Heading>
                <Flex alignItems="center" justifyContent="space-between">
                  <Badge
                    height="max-content"
                    display="flex"
                    alignItems="center"
                    color="white"
                    backgroundColor="orange.500"
                    sx={{ gap: "4px" }}
                    rounded="md"
                    fontWeight="normal"
                  >
                    <HiOutlineClock color="white" />
                    <Text>Mar 26</Text>
                  </Badge>
                  <AvatarGroup size="sm" max={2}>
                    <Avatar
                      name="Ryan Florence"
                      src="https://bit.ly/ryan-florence"
                    />
                    <Avatar
                      name="Segun Adebayo"
                      src="https://bit.ly/sage-adebayo"
                    />
                    <Avatar
                      name="Kent Dodds"
                      src="https://bit.ly/kent-c-dodds"
                    />
                    <Avatar
                      name="Prosper Otemuyiwa"
                      src="https://bit.ly/prosper-baba"
                    />
                    <Avatar
                      name="Christian Nwamba"
                      src="https://bit.ly/code-beast"
                    />
                  </AvatarGroup>
                </Flex>
              </Box>
            )}
            renderColumnHeader={({ title, id, cardCount }) => {
              return (
                <Flex
                  key={id}
                  justifyContent="space-between"
                  backgroundColor="thbg.secondary"
                  p="3"
                  w="300px"
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
                    {cardCount}
                  </Badge>
                </Flex>
              );
            }}
            onCardDragEnd={(_board, _, source, destination) => {
              kanban.set((s: Kanban) => void (s = _board));

              const fromIndex = _board.columns.findIndex(
                (s) => s.id === source.fromColumnId
              );
              const toIndex = _board.columns.findIndex(
                (s) => s.id === destination.toColumnId
              );

              _board.columns[fromIndex].cardCount--;
              _board.columns[toIndex].cardCount++;

              setboard(_board);
            }}
            initialBoard={board}
            disableColumnDrag
          >
            {board}
          </Board>
        </Box>
      </Flex>
    </>
  );
};

export default CenterPanel;
