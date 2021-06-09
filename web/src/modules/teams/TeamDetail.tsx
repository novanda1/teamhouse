import {
  Avatar,
  Box,
  Button,
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
import { HiOutlineDotsVertical, HiPencil } from "react-icons/hi";
import { IoIosAdd } from "react-icons/io";
import { useDeleteTeamMutation, useTeamsQuery } from "../../generated/graphql";
import { useGetUser } from "../../hooks/useGetUser";
import { ITeamStore, useTeamStore } from "./useTeamStore";

interface Props {}

export const TeamDetail: React.FC<Props> = () => {
  const { query, push } = useRouter();
  const { data, loading } = useTeamsQuery({});
  const [deleteTeam] = useDeleteTeamMutation({
    // update: (cache) => {
    //   // cache.evict({ fieldName: "teams" });
    //   cache.modify({
    //     fields: {
    //       teams(existingTaskRefs, { readField }) {
    //         return existingTaskRefs.filter(
    //           (taskRef) => _id !== readField("_id", taskRef)
    //         );
    //       },
    //     },
    //   });
    // },
  });
  const team = data?.teams.find((t) => t._id === query.id);

  const leaders = useGetUser({ username: team?.leaders });
  const members = useGetUser({ username: team?.members });
  const [people, setPeople] = useState([]);

  useEffect(() => {
    if (leaders && members)
      setPeople(() => {
        return [...leaders, ...members];
      });
  }, [leaders, members]);

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
                          icon={<HiOutlineDotsVertical />}
                        />
                      </PopoverTrigger>
                      <PopoverContent
                        w="max-content"
                        _focus={{ outline: "none" }}
                      >
                        <Button
                          variant="outline"
                          w="full"
                          pl="4"
                          fontSize="sm"
                          isLoading={isDeleteButtonLoading}
                          onClick={handleDeleteTeam}
                        >
                          Delete
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </Box>
                </Flex>
                <Text>
                  <Text fontSize="sm" as="span" fontWeight="light">
                    with{" "}
                  </Text>

                  <Text as="span" fontWeight="bold">
                    {leaders ? leaders[0].username : ""}
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
                    <Button ml="2" size="xs">Add New</Button>
                  </Flex>
                  {people?.map((l) => (
                    <Avatar key={l._id} size="md" name={l.username} />
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
