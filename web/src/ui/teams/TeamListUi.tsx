import { Avatar, Flex, Heading, IconButton } from "@chakra-ui/react";
import React from "react";
import { MdAdd } from "react-icons/md";
import { TeamsQueryResult } from "../../generated/graphql";

interface Props {
  response: TeamsQueryResult;
  setNewTeamModal: (set: boolean) => void;
  onSingleClick: (id: string) => void;
}

export const TeamListUi: React.FC<Props> = ({
  response,
  setNewTeamModal,
  onSingleClick,
}) => {
  const { data, loading } = response;

  return (
    <>
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
          <Flex
            py="2"
            key={t._id}
            alignItems="center"
            w="full"
            sx={{ _hover: { cursor: "pointer" } }}
            onClick={() => onSingleClick(t._id)}
          >
            <Avatar name={t.name} size="sm" />
            <Heading as="h4" size="sm" ml="4">
              {t.name}
            </Heading>
          </Flex>
        ))}
      </Flex>
    </>
  );
};
