import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlineClock } from "react-icons/hi";
import { Kanban } from "../../../modules/kanban/kanbanTypes";
import { useKanbanStore } from "../../../modules/kanban/useKanbanStore";

const Board = dynamic(() => import("@asseinfo/react-kanban"), {
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
            allowAddColumn
            renderColumnAdder={({ addColumn }) => {
              return (
                <Box
                  w="290px"
                  rounded="md"
                  h="100px"
                  mx="2"
                  borderStyle="dashed"
                  borderWidth="2px"
                  borderColor="gray.200"
                  display="grid"
                  placeContent="center"
                  _hover={{ textDecoration: "underline", cursor: "pointer" }}
                  color="text.dimmed"
                >
                  <button
                  // handle add column
                  >
                    Add Column
                  </button>
                </Box>
              );
            }}
            renderCard={({ title, id, tags }, { removeCard, dragging }) => (
              <Box
                key={id}
                w="290px"
                mx="2"
                mb="2"
                backgroundColor="white"
                px="4"
                py="3"
                rounded="md"
                shadow="sm"
                opacity={dragging ? "0.6" : "1"}
              >
                <Flex justifyContent="space-between" alignItems="center" mb="1">
                  {tags.map((t, index) => (
                    <Text
                      key={index}
                      color={t.color}
                      fontWeight="bold"
                      fontSize="0.7rem"
                    >
                      {t.title}
                    </Text>
                  ))}
                  <Button
                    variant="unstyled"
                    w="max-content"
                    h="max-content"
                    display="flex"
                    justifyContent="flex-end"
                    p="0"
                  >
                    <BsThreeDots />
                  </Button>
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
                    textTransform="none"
                  >
                    <HiOutlineClock color="white" />
                    <Text>Mar 26</Text>
                  </Badge>
                  <AvatarGroup size="xs" max={2}>
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
                  w="290px"
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
            // disableColumnDrag
          ></Board>
        </Box>
      </Flex>
    </>
  );
};

export default CenterPanel;
