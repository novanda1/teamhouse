import {
  Avatar,
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
import { IoMdPerson } from "react-icons/io";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { ButtonNoOutline } from "../../ui/ButtonNoOutline";

const SingleMenu: React.FC<{
  title: string;
  to: string;
  icon?: ReactElement;
}> = ({ to, icon, title }) => {
  const { push } = useRouter();
  const [logout] = useLogoutMutation();
  const isLogout = to === "/logout";
  const onClick = useCallback(() => {
    push(to);
  }, [push]);
  return (
    <>
      <ListItem display="flex">
        {isLogout ? (
          <ButtonNoOutline
            as={isLogout ? "a" : "button"}
            // @ts-ignore
            href={isLogout ? "/logout" : ""}
            bg="transparent"
            color="whiteAlpha.900"
            w="full"
            rounded="none"
            onClick={onClick}
          >
            <Flex alignItems="center">
              {icon}
              <Text ml={icon ? "1" : "0"} fontSize="sm">
                {title}
              </Text>
            </Flex>
          </ButtonNoOutline>
        ) : (
          <ButtonNoOutline
            bg="transparent"
            color="whiteAlpha.900"
            w="full"
            rounded="none"
            onClick={onClick}
          >
            <Flex alignItems="center">
              {icon}
              <Text ml={icon ? "1" : "0"} fontSize="sm">
                {title}
              </Text>
            </Flex>
          </ButtonNoOutline>
        )}
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
                icon={<Avatar name={me.data?.me.user.username} size="sm" />}
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
                <SingleMenu title="Log out" to="/logout" />
              </UnorderedList>
            </PopoverContent>
          </Popover>
        </Flex>
        <Flex bgColor="whiteAlpha.50" h="full" rounded="lg"></Flex>
      </Flex>
    </>
  );
};
