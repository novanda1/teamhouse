import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {
  CreateTeamInputsDto,
  CreateTeamMutationResult,
  UpdateTeamMutationResult,
  useCreateTeamMutation,
  useUpdateTeamMutation,
} from "../../generated/graphql";
import { newTeamValidation } from "../../utils/formValidationSchema/newTeam";
import { ITeamStore, useTeamStore } from "./useTeamStore";

interface Props {}

export const TeamModal: React.FC<Props> = ({}) => {
  const { push } = useRouter();
  const teamStore = useTeamStore();
  const [createTeam] = useCreateTeamMutation({
    update: (cache) => {
      cache.evict({ fieldName: "teams" });
    },
  });
  const [updateTeam] = useUpdateTeamMutation();

  const isAddModal = teamStore.modalType === "add";
  const handleClose = () =>
    void teamStore.set((s: ITeamStore) => {
      s.modalIsOpen = false;
      s.modalData = null;
      s.modalType = "";
    });

  const onSubmit = async (
    s: ITeamStore,
    variables: CreateTeamInputsDto,
    type: "add" | "update" | ""
  ) => {
    const response =
      type === "add"
        ? await createTeam({
            variables: { options: variables },
          })
        : await updateTeam({
            variables: {
              id: s.modalData._id,
              options: {
                /** @todo make this better */
                name: variables.name,
                description: variables.description,
              },
            },
          });

    teamStore.set(
      (s: ITeamStore) => void (s.form.createTeamResponse = response)
    );

    handleClose();

    return response as UpdateTeamMutationResult & CreateTeamMutationResult;
  };

  return (
    <Modal
      isOpen={teamStore.modalIsOpen}
      onClose={handleClose}
      size="lg"
      isCentered
    >
      <ModalOverlay />
      <ModalContent py="6" px="3">
        <ModalHeader pb="1">
          {teamStore.modalType == "add" ? "New Team" : "Edit Team"}
          <Text fontSize="initial" fontWeight="normal" mt="1">
            {isAddModal
              ? "Fill following field to make new team"
              : "Edit your team"}
          </Text>
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={
              teamStore.modalType === "add"
                ? teamStore.form.initialData
                : teamStore.modalData
            }
            validationSchema={newTeamValidation}
            onSubmit={async (values) => {
              if (!teamStore.modalIsOpen) return;
              const response = await onSubmit(
                teamStore,
                values,
                teamStore.modalType
              );

              const id = response.data?.createTeam?._id;

              if (teamStore.modalType == "add") {
                if (id) push(`/team/${id}`);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box mt={4}>
                  <Field name="name" placeholder="Team name" label="Name">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <Input
                          {...field}
                          id={`name-${teamStore.modalType}`}
                          placeholder="Team name"
                          variant="filled"
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>
                <Box mt={4}>
                  <Field
                    name="description"
                    placeholder="Team description"
                    label="Description"
                    id={`description-${teamStore.modalType}`}
                  >
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.description && form.touched.description
                        }
                      >
                        <Textarea
                          {...field}
                          id="description"
                          placeholder="Team description"
                          variant="filled"
                        />
                        <FormErrorMessage>
                          {form.errors.description}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>
                <Flex mt="10" alignItems="center">
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    colorScheme="purple"
                  >
                    {isAddModal ? "Create" : "Save"}
                  </Button>
                  <Button
                    type="button"
                    ml="3"
                    variant="unstyled"
                    mr="auto"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
