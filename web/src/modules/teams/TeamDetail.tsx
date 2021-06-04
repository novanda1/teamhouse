import { Avatar, Box, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { IoIosAdd } from "react-icons/io";
import { useTeamsQuery } from "../../generated/graphql";
import { useGetUserById } from "../../hooks/useGetUserById";

interface Props {}

export const TeamDetail: React.FC<Props> = () => {
  const { query } = useRouter();
  const { data } = useTeamsQuery({});
  const team = data?.teams.find((t) => t._id === query.id);

  // funcs
  const leaders = useGetUserById({ ids: team?.leaders });
  const members = useGetUserById({ ids: team?.members });

  return (
    <>
      <Box backgroundColor="whiteAlpha.50" height="full" rounded="lg">
        {query?.id !== undefined && (
          <>
            {/* Heading */}
            <Box p="6" borderBottom="1px solid rgba(255, 255, 255, 0.2);">
              <Heading as="h3" size="md">
                {team?.name}
              </Heading>
              <Text mt="2">
                <Text fontSize="sm" as="span" fontWeight="light">
                  with{" "}
                </Text>

                <Text as="span" fontWeight="bold">
                  {leaders ? leaders[0].username : ""}
                </Text>
              </Text>
              <Text mt="4">{team?.description}</Text>
            </Box>

            {/* content */}
            <Flex p="6" flexDirection="column" sx={{ gap: 30 }}>
              <Box>
                <Heading size="md" pb="4">
                  Leaders
                </Heading>
                {leaders?.map((l) => (
                  <Avatar key={l._id} size="md" name={l.username} />
                ))}
              </Box>
              <Box>
                <Flex pb="4" alignItems="center" sx={{ gap: 10 }}>
                  <Heading size="md">Members</Heading>
                  <IconButton
                    icon={<IoIosAdd size="85%" />}
                    aria-label="add member"
                    size="xs"
                    w="0"
                  />
                </Flex>
                {members?.map((l) => (
                  <Avatar key={l._id} size="md" name={l.username} />
                ))}
              </Box>
            </Flex>
          </>
        )}
      </Box>
    </>
  );
};
