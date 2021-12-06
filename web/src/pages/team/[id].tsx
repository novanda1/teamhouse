import {
  Box,
  Button,
  Heading,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
} from "@chakra-ui/react";
import { WaitForAuth } from "../../modules/auth/WaitForAuth";
import WithMessageSocket from "../../modules/chat/WithMessageSocket";
import useTeam from "../../modules/team/useTeam";
import Messages from "../../ui/component/Messages";
import { MainLayout } from "../../ui/layout/MainLayout";
import { withApollo } from "../../utils/withApollo";

export class ChatQuery {
  username: string;
  userid: string;
  groupid: string;
  message: string;
}

const Team = () => {
  const { data, loading, error, handleDeleteTeam } = useTeam();

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
                <Messages />
              </Box>
            </VStack>
          </WithMessageSocket>
        </MainLayout>
      </WaitForAuth>
    );
};

export default withApollo()(Team);
