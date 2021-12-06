import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { TeamsDocument, useCreateTeamMutation } from "../../generated/graphql";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTeamModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");

  const [createTeam] = useCreateTeamMutation({
    refetchQueries: [TeamsDocument, "Teams"],
  });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Team</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ title, description }}
              onSubmit={async (options, actions) => {
                await createTeam({
                  variables: { createTeamInput: options },
                }).then(() => {
                  actions.resetForm();
                  onClose();
                });
              }}
            >
              {(props) => (
                <Form>
                  <Field name="title">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.title && form.touched.title}
                      >
                        <FormLabel htmlFor="name">Title</FormLabel>
                        <Input
                          {...field}
                          id="title"
                          placeholder="Your team title"
                        />
                        <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="description">
                    {({ field, form }) => (
                      <FormControl
                        mt="4"
                        isInvalid={
                          form.errors.description && form.touched.descriptions
                        }
                      >
                        <FormLabel htmlFor="description">
                          Descriptions
                        </FormLabel>
                        <Input
                          {...field}
                          id="description"
                          placeholder="Short description"
                        />
                        <FormErrorMessage>
                          {form.errors.description}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    mt="5"
                    ml="auto"
                    colorScheme="yellow"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Create
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateTeamModal;
