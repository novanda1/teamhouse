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
import React, { ReactElement, useCallback } from "react";
import { IoMdPerson, IoIosSettings } from "react-icons/io";
import { useMeQuery } from "../../generated/graphql";
import { ButtonNoOutline } from "../../ui/ButtonNoOutline";

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

export const RightPanel: React.FC = () => {
  const me = useMeQuery();
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
        <Flex bgColor="whiteAlpha.50" h="full" rounded="lg"></Flex>
      </Flex>
    </>
  );
};
