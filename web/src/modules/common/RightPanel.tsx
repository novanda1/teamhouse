import {
  Avatar,
  ButtonProps,
  Flex,
  IconButton,
  ListItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, {
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { IoIosSettings, IoMdPerson } from "react-icons/io";
import {
  Message,
  useGetChatTeamQuery,
  useMeQuery,
  useTeamChatSubscriptionSubscription,
} from "../../generated/graphql";
import { useGetId } from "../../hooks/useGetId";
import { ButtonNoOutline } from "../../ui/ButtonNoOutline";
import { ChatForm } from "../../ui/ChatForm";
import { ChatList } from "../../ui/ChatList";
import { usePanelStore } from "./usePanelStore";

const SingleMenu: React.FC<{
  title: string;
  to: string;
  icon?: ReactElement;
  p?: ButtonProps;
}> = ({ to, icon, title, p }) => {
  const { push } = useRouter();
  const onClick = useCallback(() => {
    push(to);
  }, [push]);
  return (
    <>
      <ListItem display="flex">
        <ButtonNoOutline
          {...p}
          bg="transparent"
          color="whiteAlpha.900"
          w="full"
          rounded="none"
          onClick={onClick}
        >
          <Flex alignItems="center" mr="auto">
            {icon}
            <Text ml={icon ? "1" : "0"} fontSize="sm">
              {title}
            </Text>
          </Flex>
        </ButtonNoOutline>
      </ListItem>
    </>
  );
};

export const RightPanel: React.FC = memo(() => {
  const panelStore = usePanelStore();
  const me = useMeQuery();
  const teamId = useGetId();

  const existingMessages = useGetChatTeamQuery({
    skip: !teamId,
    variables: {
      teamId,
    },
  });
  const subscribeMessages = useTeamChatSubscriptionSubscription();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    existingMessages?.data &&
      setMessages([...existingMessages?.data.getChatTeam.messages]);
  }, [existingMessages?.data]);

  useEffect(() => {
    subscribeMessages?.data &&
      setMessages((currentMessage: Message[]) => [
        ...currentMessage,
        subscribeMessages?.data.teamChatSubscription,
      ]);

  }, [subscribeMessages?.data]);

  if (panelStore.mainPanel === "team")
    return (
      <>
        <Flex py="10" flexDirection="column">
          <Flex justifyContent="flex-end" pb="60px">
            <Popover placement="bottom-end">
              <PopoverTrigger>
                <IconButton
                  aria-label="profile"
                  bg="transparent"
                  rounded="full"
                  icon={
                    <Avatar
                      name={me.data?.me.firstname}
                      src={me.data?.me.picture}
                      size="sm"
                    />
                  }
                />
              </PopoverTrigger>
              <PopoverContent
                w="max-content"
                _focus={{ outline: "none" }}
                bgColor="gray.700"
                overflow="hidden"
              >
                <UnorderedList listStyleType="none" m="0">
                  <SingleMenu
                    icon={<IoMdPerson size="20px" />}
                    title="Profile"
                    to="/profile"
                  />
                  <SingleMenu
                    icon={<IoIosSettings size="20px" />}
                    title="Settings"
                    to="/profile"
                  />
                  <SingleMenu
                    title="Log out"
                    to="/logout"
                    p={{ backgroundColor: "gray.800" }}
                  />
                </UnorderedList>
              </PopoverContent>
            </Popover>
          </Flex>
          <Flex
            flexDirection="column"
            bgColor="whiteAlpha.50"
            h="full"
            rounded="lg"
            p="4"
          >
            <>
              <ChatList messages={messages} />
              <ChatForm />
            </>
          </Flex>
        </Flex>
      </>
    );

  return <></>;
});
