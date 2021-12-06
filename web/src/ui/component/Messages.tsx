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
    <Box
      bg="gray.50"
      rounded="lg"
      borderColor="gray.200"
      borderWidth="1px"
      px="4"
      py="5"
      w="sm"
      minW="sm"
      h="full"
    >
      {openedTeam ? (
        <VStack overflow="auto" w="full" h="full">
          <VStack w="full" h="full" mb="auto" justifyContent="flex-end">
            <Box w="full">
              {messages?.map((chat, i) => {
                const color = generateColorFromString(chat.user?.username);
                return (
                  <Box
                    key={chat._id || i}
                    px="3"
                    justifyContent="flex-start"
                    w="full"
                  >
                    <Text float="left" color={color}>
                      {chat.user?.username}:
                    </Text>
                    <Text wordBreak="break-word"> {chat.message}</Text>
                  </Box>
                );
              })}
            </Box>
          </VStack>
          <MessageInput />
        </VStack>
      ) : (
        <>
          <Text>Start Convertations</Text>
        </>
      )}
    </Box>
  );
};

export default Messages;
