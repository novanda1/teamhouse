import {
  Avatar,
  Box,
  Button,
  Heading,
  Input,
  Text,
  ListItem,
  ModalContent,
  UnorderedList,
  Flex,
  IconButton,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  useAddTeamMemberMutation,
  User,
  useTeamsQuery,
  useUsersQuery,
} from "../../generated/graphql";
import { useGetId } from "../../hooks/useGetId";
import { sleep } from "../../utils/sleep";
import { ITeamStore, useTeamStore } from "./useTeamStore";
import { IoMdClose, IoMdSearch } from "react-icons/io";

export const AddMember: React.FC = memo(() => {
  const id = useGetId();
  const teamStore = useTeamStore();
  const { data, loading } = useTeamsQuery({ variables: { limit: 10 } });
  const team = data?.teams.find((t) => t._id === id);

  const openModal = useCallback(() => {
    /**
     * equal with
     * (({ __typename, ...o }) => o)(team);
+     */
    const { __typename, ...modalData } = team;
    teamStore.set((s: ITeamStore) => {
      s.modalData = modalData;
      s.modalType = "addMember";
      s.modalIsOpen = true;
    });
    // console.log(`teamstore`, teamStore);
  }, [teamStore.set]);

  return (
    <>
      <Button ml="2" size="xs" onClick={openModal}>
        Add Member
      </Button>
    </>
  );
});

export const AddMemberModalContent: React.FC = memo(() => {
  const teamStore = useTeamStore();
  const [addMember, { loading }] = useAddTeamMemberMutation();

  const [user, setUser] = useState<User>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [text, setText] = useState("");
  const input = useRef();
  const result = useUsersQuery({
    skip: text === "",
    variables: { text },
  });

  const findUsers = useCallback(
    async (
      event: React.KeyboardEvent<HTMLInputElement> & {
        target: HTMLInputElement;
      }
    ) => {
      await sleep(2000);
      setText(event.target.value);
    },
    []
  );

  const onSelectUser = useCallback(
    (u: User) => {
      setUser(u);
      setUsers([]);
    },
    [setUser, setUsers]
  );

  const onSubmitUser = useCallback(async () => {
    await addMember({
      variables: {
        teamId: teamStore.modalData._id,
        user: {
          id: user._id,
          role: 1,
        },
      },
    }).catch((err) => {
      alert(err.toString().split(":")[1]);
      teamStore.onClose(teamStore);
    });

    teamStore.onClose(teamStore);
  }, [teamStore, addMember, user]);

  useEffect(() => {
    if (result?.data?.users) setUsers(result?.data?.users);
    else setUsers([]);

    if (document.activeElement !== input.current) setUsers([]);
  }, [result, text, setUsers, document.activeElement]);

  return (
    <ModalContent py="6" px="5" maxW="sm">
      <Box position="relative">
        <Heading mb="6" textAlign="center" size="sm">
          Add Member
        </Heading>
        <Box zIndex="1">
          {user ? (
            <Flex
              alignItems="center"
              justifyContent="space-between"
              px="3"
              py="3"
              bg="gray.600"
              rounded="lg"
              borderColor="purple.300"
              border="solid 1px var(--chakra-colors-purple-300)"
            >
              <Flex alignItems="center">
                <Box>
                  <Avatar name={user.firstname} src={user.picture} size="sm" />
                </Box>
                <Box textAlign="left" pl="2">
                  <Text fontSize="sm" color="purple.200">
                    {user.firstname} {user.lastname}
                  </Text>
                  <Text color="purple.100" fontWeight="normal" fontSize="xs">
                    {user.email}
                  </Text>
                </Box>
              </Flex>
              <IconButton
                aria-label="unselect user"
                bg="transparent"
                _hover={{
                  bg: "transparent",
                  color: "var(--chakra-colors-purple-400)",
                }}
                onClick={() => setUser(null)}
                icon={<IoMdClose color="var(--chakra-colors-purple-200)" />}
              />
            </Flex>
          ) : (
            <InputGroup rounded="lg">
              <InputLeftElement
                height="100%"
                color="gray.500"
                children={<IoMdSearch />}
              />
              <Input
                rounded="lg"
                placeholder="Search by first name, last name, or email"
                size="sm"
                onKeyUp={findUsers}
                ref={input}
              />
            </InputGroup>
          )}

          <Box position="absolute" left="0" w="full" mt="4" zIndex="1">
            {users && !user && (
              <UnorderedList
                ml="0"
                listStyleType="none"
                bg="gray.600"
                rounded="lg"
              >
                {users.map((u) => (
                  <ListItem key={u._id}>
                    <Button
                      bg="gray.600"
                      w="100%"
                      display="block"
                      px="3"
                      py="8"
                      onClick={() => onSelectUser(u)}
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <Box>
                        <Avatar name={u.firstname} src={u.picture} size="sm" />
                      </Box>
                      <Box textAlign="left" pl="2">
                        <Text fontSize="sm" color="whiteAlpha.900">
                          {u.firstname} {u.lastname}
                        </Text>
                        <Text color="whiteAlpha.500" fontWeight="normal">
                          {u.email}
                        </Text>
                      </Box>
                    </Button>
                  </ListItem>
                ))}
              </UnorderedList>
            )}
          </Box>
        </Box>
        <Button
          size="sm"
          w="full"
          mt="4"
          disabled={!user}
          isLoading={loading}
          onClick={onSubmitUser}
        >
          {user
            ? `Add ${user?.firstname} to this team`
            : "Select a member above"}
        </Button>
      </Box>
    </ModalContent>
  );
});
