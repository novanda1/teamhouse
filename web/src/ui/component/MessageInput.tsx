import {
  FormControl,
  FormErrorMessage,
  HStack,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useCallback, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useMeQuery } from "../../generated/graphql";
import { useMessageSocketStore } from "../../modules/chat/useMessageSocket";
import { ChatQuery } from "../../types";

const MessageInput: React.FC = () => {
  const { socket, openedTeam } = useMessageSocketStore();
  const [input, setInput] = useState<string>("");
  const me = useMeQuery();
  const handleInputChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const handleSendMessage = useCallback(() => {
    socket.emit("chat", {
      username: me.data?.me.username,
      userid: me.data?.me.id,
      groupid: openedTeam.id,
      message: input,
    } as ChatQuery);

    setInput("");
  }, [me, openedTeam, input, socket]);

  return (
    <Formik
      initialValues={{ input }}
      onSubmit={() => {
        handleSendMessage();
      }}
    >
      {(props) => (
        <>
          <Form style={{ width: "100%" }}>
            <HStack w="100%" mt="4">
              <Field name="input">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.input && form.touched.input}
                  >
                    <Input
                      value={input}
                      placeholder="Type a message"
                      onChange={handleInputChange}
                      variant="fill"
                      rounded="full"
                      shadow="sm"
                    />
                    <FormErrorMessage>{form.errors.input}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <IconButton
                rounded="full"
                backgroundColor="transparent"
                aria-label="send message"
                icon={<IoMdSend />}
                onClick={handleSendMessage}
                type="submit"
              />
            </HStack>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default MessageInput;
