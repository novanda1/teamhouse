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
import PlayGround from "../ui/component/PlayGround";
import TeamList from "../ui/component/TeamList";
import { MainLayout } from "../ui/layout/MainLayout";
import { withApollo } from "../utils/withApollo";

const Home = () => {
  const { data, loading } = useTeamsQuery({ variables: { limit: 10 } });

  return (
    <>
      <WaitForAuth>
        <MainLayout>
          <WithMessageSocket>
            <Box mt="3"></Box>
            {data?.teams.results.length ? (
              <>
                <HStack
                  h="90vh"
                  w="full"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <TeamList teams={data?.teams.results} />
                  <PlayGround />
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
      </WaitForAuth>
    </>
  );
};

export default withApollo()(Home);
