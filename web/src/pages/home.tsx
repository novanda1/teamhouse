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
          </WithMessageSocket>
        </MainLayout>
      </WaitForAuth>
    </>
  );
};

export default withApollo()(Home);
