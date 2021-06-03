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
import React from "react";
import {
  CreateTeamMutationFn,
  CreateTeamMutationResult,
} from "../../generated/graphql";
import { newTeamValidation } from "../../utils/formValidationSchema/newTeam";

interface Props {
  isOpen: boolean;
  closeNewTeamModal: () => void;
  createTeam: CreateTeamMutationFn & any;
  setTeamState: (id: string, isOpen: boolean) => void;
}

export const NewTeamModal: React.FC<Props> = ({
  isOpen,
  closeNewTeamModal,
  createTeam,
  setTeamState,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={closeNewTeamModal} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent p="8">
        <ModalHeader>
          New Team
          <Text fontSize="initial" fontWeight="normal" mt="1">
            Fill following field to make new team
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{ name: "", description: "" }}
            validationSchema={newTeamValidation}
            onSubmit={async (values, { setErrors }) => {
              const response: CreateTeamMutationResult = await createTeam({
                variables: {
                  options: values,
                },
              })
                .then((r) => {
                  closeNewTeamModal();
                  return r;
                })
                .catch((err) => console.log(`err`, JSON.stringify(err)));

              const responseTeam = response.data?.createTeam;
              setTeamState(responseTeam._id, true);
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
                        <Input {...field} id="name" placeholder="Team name" />
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
                    New team
                  </Button>
                  <Button
                    ml="3"
                    variant="link"
                    mr="auto"
                    onClick={closeNewTeamModal}
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
