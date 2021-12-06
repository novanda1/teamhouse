import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { useTeamsQuery } from "../generated/graphql";
import { WaitForAuth } from "../modules/auth/WaitForAuth";
import WithMessageSocket from "../modules/chat/WithMessageSocket";
import CreateTeamModal from "../ui/component/CreateTeamModal";
import Messages from "../ui/component/Messages";
import TeamList from "../ui/component/TeamList";
import { MainLayout } from "../ui/layout/MainLayout";
import { withApollo } from "../utils/withApollo";

const Home = () => {
  const { data, loading } = useTeamsQuery({ variables: { limit: 10 } });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <WaitForAuth>
        <MainLayout>
          <WithMessageSocket>
            <VStack alignItems="flex-start">
              <HStack justifyContent="" pt="7">
                <Heading size="sm">Your Teams</Heading>
                <Badge
                  cursor="pointer"
                  backgroundColor="yellow.200"
                  onClick={onOpen}
                >
                  + Add New
                </Badge>
              </HStack>
              <Text fontWeight="xs">Select or create new</Text>
            </VStack>
            <Box mt="3"></Box>
            {data?.teams.results.length ? (
              <>
                <HStack h="80vh" alignItems="flex-start">
                  <TeamList teams={data?.teams.results} />
                  <Messages />
                </HStack>
              </>
            ) : !loading ? (
              <Box w="100%" textAlign="center">
                <Image src="/cat.png" width="100" height="100" alt="cat" />
                <Text>
                  Didnt have team yet! <br /> Why not just create one?
                </Text>
              </Box>
            ) : (
              <></>
            )}
          </WithMessageSocket>
        </MainLayout>
        <CreateTeamModal isOpen={isOpen} onClose={onClose} />
      </WaitForAuth>
    </>
  );
};

export default withApollo()(Home);
