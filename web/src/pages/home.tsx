import {
  Box,
  Button,
  Heading,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import { useTeamsQuery } from "../generated/graphql";
import { WaitForAuth } from "../modules/auth/WaitForAuth";
import CreateTeamModal from "../ui/component/CreateTeamModal";
import TeamList from "../ui/component/TeamList";
import { MainLayout } from "../ui/layout/MainLayout";
import { withApollo } from "../utils/withApollo";

const Home = () => {
  const { data } = useTeamsQuery({ variables: { limit: 10 } });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <WaitForAuth>
        <MainLayout>
          <HStack justifyContent="space-between">
            <Heading size="md" fontWeight="bold">
              Your Teams
            </Heading>
            <Button onClick={onOpen}>Add Team</Button>
          </HStack>
          <Box mt="10"></Box>
          {data?.teams.length ? (
            <TeamList teams={data?.teams} />
          ) : (
            <Box w="100%" textAlign="center">
              <Image src="/cat.png" width="100" height="100" alt="cat" />
              <Text>
                Didnt have team yet! <br /> Why not just create one?
              </Text>
            </Box>
          )}
        </MainLayout>

        <CreateTeamModal isOpen={isOpen} onClose={onClose} />
      </WaitForAuth>
    </>
  );
};

export default withApollo()(Home);
