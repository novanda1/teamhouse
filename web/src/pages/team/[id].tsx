import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useMeQuery } from "../../generated/graphql";
import { WaitForAuth } from "../../modules/auth/WaitForAuth";
import { useMessageSocketStore } from "../../modules/chat/useMessageSocket";
import WithMessageSocket from "../../modules/chat/WithMessageSocket";
import useTeam from "../../modules/team/useTeam";
import { MainLayout } from "../../ui/layout/MainLayout";
import { withApollo } from "../../utils/withApollo";

export class ChatQuery {
  username: string;
  userid: string;
  groupid: string;
  message: string;
}

const Team = () => {
  const { socket, messages } = useMessageSocketStore();

  const [input, setInput] = useState<string>("");

  const me = useMeQuery();
  const { data, loading, error, handleDeleteTeam } = useTeam();

  const handleInputChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const handleSendMessage = useCallback(() => {
    socket.emit("chat", {
      username: me.data?.me.username,
      userid: me.data?.me.id,
      groupid: data?.team.id,
      message: input,
    } as ChatQuery);

    setInput("");
  }, [me, data, input, socket]);

  if (loading) return <>loading...</>;
  else if (error) return <>something went wrong</>;
  else
    return (
      <WaitForAuth>
        <MainLayout>
          <WithMessageSocket>
            <VStack minH="100vh" pt="5" justifyContent="space-between">
              <HStack justifyContent="space-between" w="100%">
                <Box>
                  <Heading>{data.team.title}</Heading>
                  <Text>{data.team.description}</Text>
                </Box>
                <Box>
                  <Popover placement="top-end">
                    <PopoverTrigger>
                      <Button>...</Button>
                    </PopoverTrigger>
                    <PopoverContent maxW="200px">
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverBody>
                        <VStack>
                          <Button w="100%" onClick={handleDeleteTeam}>
                            Delete
                          </Button>
                        </VStack>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Box>
              </HStack>
              <Box pb="5" w="100%">
                <VStack>
                  {messages?.map((chat) => (
                    <Flex key={chat._id} justifyContent="flex-start" w="full">
                      {chat.user?.username}:{chat.message}
                    </Flex>
                  ))}
                </VStack>
                <HStack w="100%">
                  <Input value={input} onChange={handleInputChange} />
                  <Button onClick={handleSendMessage}>Send</Button>
                </HStack>
              </Box>
            </VStack>
          </WithMessageSocket>
        </MainLayout>
      </WaitForAuth>
    );
};

export default withApollo()(Team);
