import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMessageSocketStore } from "../../modules/chat/useMessageSocket";
import { generateColorFromString } from "../../utils/generateColorFromString";
import MessageInput from "./MessageInput";

const Messages: React.FC = () => {
  const { messages, openedTeam } = useMessageSocketStore();
  return (
    <VStack
      rounded="lg"
      borderColor="gray.200"
      borderWidth="1px"
      justifyContent="space-between"
      px="4"
      py="5"
      w="full"
      h="full"
    >
      {openedTeam ? (
        <>
          <HStack w="full">
            <Box></Box>
            <VStack w="full" alignItems="flex-start">
              <Heading size="md">{openedTeam.title}</Heading>
              <Text mt="0">{openedTeam.description}</Text>
              <Divider pb="2" />
            </VStack>
          </HStack>
          <VStack w="full" h="full" mb="auto" justifyContent="flex-end">
            {messages?.map((chat, i) => {
              const color = generateColorFromString(chat.user?.username);

              return (
                <Flex
                  key={chat._id || i}
                  px="3"
                  justifyContent="flex-start"
                  w="full"
                >
                  <Text color={color}>{chat.user?.username}</Text> :{" "}
                  {chat.message}
                </Flex>
              );
            })}
          </VStack>
          <MessageInput />
        </>
      ) : (
        <>
          <Text>Start Convertations</Text>
        </>
      )}
    </VStack>
  );
};

export default Messages;
