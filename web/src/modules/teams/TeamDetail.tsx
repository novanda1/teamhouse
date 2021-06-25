import {
  Avatar,
  Box,
  Flex,
  Heading,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  useDeleteTeamMutation,
  useGetTeamAdminQuery,
  useGetTeamMemberQuery,
  useTeamsQuery,
} from "../../generated/graphql";
import { useGetId } from "../../hooks/useGetId";
import { ButtonNoOutline } from "../../ui/ButtonNoOutline";
import { AddMember } from "./AddMember";
import { ITeamStore, useTeamStore } from "./useTeamStore";

interface Props {}

export const TeamDetail: React.FC<Props> = () => {
  const teamId = useGetId();
  const { query, push } = useRouter();
  const { data, loading } = useTeamsQuery({
    variables: { limit: 10 },
  });
  const [deleteTeam] = useDeleteTeamMutation();
  const admin = useGetTeamAdminQuery({
    variables: { teamId },
  });
  const member = useGetTeamMemberQuery({
    variables: { teamId },
  });

  const team = data?.teams.find((t) => t._id === query.id);

  const [people, setPeople] = useState([]);

  //
  const toast = useToast();
  const [isDeleteButtonLoading, setIsDeleteButtonLoading] = useState(false);

  // update team
  const teamStore = useTeamStore();
  const handleOpenModal = () => {
    const modalData = (({ __typename, ...o }) => o)(team);
    teamStore.set((s: ITeamStore) => {
      s.modalData = modalData;
      s.modalType = "update";
      s.modalIsOpen = true;
    });
  };

  const handleDeleteTeam = useCallback(async () => {
    setIsDeleteButtonLoading(true);
    const deleted = await deleteTeam({
      variables: {
        id: team._id,
      },

      update: (cache) => {
        // cache.evict({ fieldName: "teams" });
        cache.modify({
          fields: {
            teams(existing: [], { readField }) {
              return existing.filter(
                (teamRef) => team._id !== readField("_id", teamRef)
              );
            },
          },
        });
      },
    });

    if (deleted.data.deleteTeam) {
      toast({
        title: "Team deleted.",
        description: "The team successfully deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      push("/home");
    }
  }, [deleteTeam, team]);

  if (team?._id)
    return (
      <>
        <Box backgroundColor="whiteAlpha.50" height="full" rounded="lg">
          {query?.id !== undefined && (
            <>
              {/* Heading */}
              <Box p="6" borderBottom="1px solid rgba(255, 255, 255, 0.2);">
                <Flex
                  w="full"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Heading
                    as="h3"
                    size="md"
                    _hover={{ cursor: "pointer" }}
                    onClick={handleOpenModal}
                  >
                    {team?.name}
                  </Heading>
                  <Box>
                    <Popover placement="bottom-end">
                      <PopoverTrigger>
                        <IconButton
                          size="sm"
                          aria-label="options"
                          bg="transparent"
                          color="white"
                          icon={<HiOutlineDotsVertical />}
                        />
                      </PopoverTrigger>
                      <PopoverContent
                        w="max-content"
                        p="0"
                        overflow="hidden"
                        _focus={{ outline: "none" }}
                      >
                        <ButtonNoOutline
                          bg="transparent"
                          color="whiteAlpha.900"
                          w="full"
                          rounded="none"
                          isLoading={isDeleteButtonLoading}
                          onClick={handleDeleteTeam}
                        >
                          <Text fontSize="sm">Delete</Text>
                        </ButtonNoOutline>
                      </PopoverContent>
                    </Popover>
                  </Box>
                </Flex>
                <Text>
                  <Text fontSize="sm" as="span" fontWeight="light">
                    with{" "}
                  </Text>

                  <Text as="span" fontWeight="bold">
                    {admin?.data && admin?.data.getTeamAdmin[0]?.firstname}
                  </Text>
                </Text>
                <Text mt="2" size="sm" color="whiteAlpha.800">
                  {team?.description}
                </Text>
              </Box>

              {/* content */}
              <Flex p="6" flexDirection="column" sx={{ gap: 30 }}>
                <Box>
                  <Flex>
                    <Heading size="sm" pb="4">
                      People
                    </Heading>
                    <AddMember />
                  </Flex>
                  {member?.data &&
                    member.data?.getTeamMember?.map((l) => (
                      <Avatar
                        key={l?._id}
                        size="md"
                        name={l?.firstname}
                        src={l?.picture}
                      />
                    ))}
                </Box>
              </Flex>
            </>
          )}
        </Box>
      </>
    );

  if (query.id && !team?._id && !loading)
    return <>Sorry, we could not find that team</>;

  return <></>;
};
