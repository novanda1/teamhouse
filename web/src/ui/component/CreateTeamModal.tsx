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
  const [name, setName] = useState("");
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
              initialValues={{ name, description }}
              onSubmit={async (options, actions) => {
                await createTeam({
                  variables: {
                    options: options,
                  },
                }).then(() => {
                  actions.resetForm();
                  onClose();
                });
              }}
            >
              {(props) => (
                <Form>
                  <Field name="name">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input
                          {...field}
                          id="name"
                          placeholder="Your team name"
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
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
                    colorScheme="teal"
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
