import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import {
  CreateTeamInputsDto,
  CreateTeamMutationResult,
  TeamsDocument,
  UpdateTeamMutationResult,
  useCreateTeamMutation,
  useUpdateTeamMutation,
} from "../../generated/graphql";
import { newTeamValidation } from "../../utils/formValidationSchema/newTeam";
import { ITeamStore, useTeamStore } from "./useTeamStore";

export const AddUpdateTeamModalContent: React.FC = () => {
  const { push } = useRouter();
  const toast = useToast();
  const teamStore = useTeamStore();
  const isAddModal = teamStore.modalType === "add";
  const [updateTeam] = useUpdateTeamMutation();
  const [createTeam] = useCreateTeamMutation({
    update: (cache, { data: { createTeam } }) => {
      let { teams } = cache.readQuery({ query: TeamsDocument });
      teams = [...teams, createTeam];
      cache.writeQuery({
        query: TeamsDocument,
        data: { teams },
      });
    },
  });

  const handleClose = () =>
    void teamStore.set((s: ITeamStore) => {
      s.modalIsOpen = false;
      s.modalData = null;
      s.modalType = "";
    });

  const onSubmit = async (
    s: ITeamStore,
    variables: CreateTeamInputsDto,
    type: "add" | "update" | "addMember" | ""
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

    handleClose();

    return response as UpdateTeamMutationResult & CreateTeamMutationResult;
  };

  return (
    <>
      <ModalHeader pb="1">
        {teamStore.modalType == "add" ? "New Team" : "Edit Team"}
        <Text fontSize="initial" fontWeight="normal" mt="1">
          {isAddModal
            ? "Fill following field to make new team"
            : "Edit your team"}
        </Text>
      </ModalHeader>
      <ModalCloseButton _focus={{ outlineColor: "transparent" }} />
      <ModalBody>
        {}
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
              if (id) {
                toast({
                  title: "Team added.",
                  description: "We've created team for you.",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
                push(`/team/${id}`);
              }
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
                  _focus={{ boxShadow: "none" }}
                >
                  Cancel
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </>
  );
};
