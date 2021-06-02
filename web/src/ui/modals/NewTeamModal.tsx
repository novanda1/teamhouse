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
import { CreateTeamMutationFn } from "../../generated/graphql";

interface Props {
  isOpen: boolean;
  closeNewTeamModal: () => void;
  createTeam: CreateTeamMutationFn;
}

export const NewTeamModal: React.FC<Props> = ({
  isOpen,
  closeNewTeamModal,
  createTeam,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={closeNewTeamModal} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent p="8">
        <ModalHeader>
          New Team
          <Text fontSize="initial" fontWeight="normal" mt="1">
            Field following field to make new team
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{ name: "", description: "" }}
            onSubmit={async (values, { setErrors }) => {
              await createTeam({
                variables: {
                  options: values,
                },
              })
                .then(() => closeNewTeamModal())
                .catch((err) => console.log(`err`, JSON.stringify(err)));
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
