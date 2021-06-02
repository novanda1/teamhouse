import { Avatar, Flex, Heading, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import {
  TeamsQueryResult,
  useCreateTeamMutation
} from "../../generated/graphql";
import { NewTeamModal } from "../modals/NewTeamModal";

interface Props {
  response: TeamsQueryResult;
}

export const TeamListUi: React.FC<Props> = ({ response }) => {
  const { data, loading } = response;
  const [createTeam] = useCreateTeamMutation({
    update: (cache) => {
      cache.evict({ fieldName: "teams" });
    },
  });

  const [newTeamModal, setNewTeamModal] = useState(false);
  const closeNewTeamModal = () => setNewTeamModal(false);

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
          <Flex py="2" key={t._id} alignItems="center">
            <Avatar name={t.name} size="sm" />
            <Heading as="h4" size="sm" ml="4">
              {t.name}
            </Heading>
          </Flex>
        ))}
      </Flex>
      <NewTeamModal
        closeNewTeamModal={closeNewTeamModal}
        createTeam={createTeam}
        isOpen={newTeamModal}
      />
    </>
  );
};
