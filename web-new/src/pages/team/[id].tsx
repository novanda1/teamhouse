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
import { useRouter } from "next/router";
import { useCallback } from "react";
import {
  TeamsDocument,
  useDeleteTeamMutation,
  useTeamQuery,
} from "../../generated/graphql";
import { MainLayout } from "../../ui/layout/MainLayout";
import { withApollo } from "../../utils/withApollo";

const Team = ({ id }) => {
  const { query, back } = useRouter();

  const { data, loading, error } = useTeamQuery({
    variables: { id: query.id as string },
  });

  const [deleteTeam] = useDeleteTeamMutation({
    refetchQueries: [TeamsDocument, "Teams"],
  });

  const handleDeleteTeam = useCallback(async () => {
    await deleteTeam({ variables: { id: query.id as string } });
    back();
  }, [deleteTeam, back, query.id]);

  if (loading) return <>loading...</>;
  else if (error) return <>something went wrong</>;

  return (
    <MainLayout>
      <HStack justifyContent="space-between">
        <Box>
          <Heading>{data.team.name}</Heading>
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
    </MainLayout>
  );
};

export default withApollo()(Team);
