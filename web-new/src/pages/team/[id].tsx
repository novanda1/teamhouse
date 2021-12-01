import {
  Box,
  Button,
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
import useTeam from "../../modules/team/useTeam";
import { MainLayout } from "../../ui/layout/MainLayout";
import { withApollo } from "../../utils/withApollo";

const Team = () => {
  const { data, loading, error, handleDeleteTeam } = useTeam();

  if (loading) return <>loading...</>;
  else if (error) return <>something went wrong</>;

  return (
    <MainLayout>
      <VStack minH="100vh" pt="5" justifyContent="space-between">
        <HStack justifyContent="space-between" w="100%">
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
        <Box pb="5" w="100%">
          <HStack w="100%">
            <Input />
            <Button>Send</Button>
          </HStack>
        </Box>
      </VStack>
    </MainLayout>
  );
};

export default withApollo()(Team);
