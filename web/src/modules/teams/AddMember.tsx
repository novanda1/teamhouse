import {
  Box,
  Button,
  Heading,
  Input,
  Link,
  ListItem,
  ModalContent,
  UnorderedList,
} from "@chakra-ui/react";
import React, { memo, useCallback, useEffect, useState } from "react";
import { User, useTeamsQuery, useUsersQuery } from "../../generated/graphql";
import { useGetId } from "../../hooks/useGetId";
import { sleep } from "../../utils/sleep";
import { ITeamStore, useTeamStore } from "./useTeamStore";

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
        Add New
      </Button>
    </>
  );
});

export const AddMemberModalContent: React.FC = memo(() => {
  const [users, setUsers] = useState<User[]>([]);
  const [text, setText] = useState("");
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
      await sleep(1000);
      if (event.target.value !== text) setText(event.target.value);
    },
    []
  );

  useEffect(() => {
    console.log(`result`, result);
  }, [users, text]);

  return (
    <ModalContent py="6" px="5" maxW="xs">
      <Box position="relative">
        <Heading mb="6" textAlign="center" size="sm">
          Add Member
        </Heading>
        <Box zIndex="1">
          <Input size="sm" onKeyUp={findUsers} />
          <Box position="absolute" left="0" w="full" zIndex="1">
            {result?.data && (
              <UnorderedList
                ml="0"
                listStyleType="none"
                bg="gray.600"
                rounded="lg"
              >
                {result.data?.users.map((u) => (
                  <ListItem>
                    <Link py="3" px="3" w="100%" display="block">
                      {u.firstname}
                    </Link>
                  </ListItem>
                ))}
              </UnorderedList>
            )}
          </Box>
        </Box>
        <Button size="sm" w="full" mt="2" disabled={!result?.data}>
          {result?.data ? `add` : "select a member above"}
        </Button>
      </Box>
    </ModalContent>
  );
});
