import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Wrapper } from "../components/Wrapper";
import { useTeamsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";
import { MdAdd } from "react-icons/md";
import { FiSearch } from "react-icons/fi";

const Home = () => {
  const router = useRouter();
  const { data, loading } = useTeamsQuery({
    notifyOnNetworkStatusChange: true,
  });
  const [newTeamModal, setNewTeamModal] = useState(false);
  const closeNewTeamModal = () => setNewTeamModal(false);

  if (loading)
    return (
      <>
        <Navbar />
        <Container mt="7" maxW="container.lg">
          loading...
        </Container>
      </>
    );

  return (
    <>
      <Wrapper>
        <Box mt="10" position="sticky">
          <Heading as="h1" size="lg" mb="60px">
            Teamhouse
          </Heading>
          <Flex justifyContent="space-between">
            <Heading as="h3" size="md" mb="2">
              Team
            </Heading>
            <IconButton
              aria-label="Add New Team"
              icon={<MdAdd size="85%" />}
              size="xs"
              w="0"
              onClick={() => setNewTeamModal(true)}
            />
          </Flex>
          <Flex alignItems="flex-start" flexDirection="column" mt="2">
            {data?.teams?.map((t) => (
              <Flex py="2" key={t._id} alignItems="center">
                <Avatar name={t.name} size="sm" />
                <Heading as="h4" size="sm" ml="4">
                  {t.name}
                </Heading>
              </Flex>
            ))}
          </Flex>
        </Box>
        <Box mt="10">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<FiSearch color="gray.300" />}
            />
            <Input type="text" placeholder="Search anything" variant="filled" />
          </InputGroup>
        </Box>
        <Box></Box>
      </Wrapper>

      <Modal
        isOpen={newTeamModal}
        onClose={closeNewTeamModal}
        size="xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent p="8">
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>tes</ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => closeNewTeamModal()}
            >
              Close
            </Button>
            <Button variant="link" mr="auto">
              Secondary Action
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default withApollo({ ssr: true })(Home);
