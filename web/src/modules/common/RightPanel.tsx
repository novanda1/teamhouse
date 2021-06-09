import {
  Avatar,
  Button,
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

const SingleMenu: React.FC<{
  title: string;
  to: string;
  icon?: ReactElement;
}> = ({ to, icon, title }) => {
  const { push } = useRouter();
  const onClick = useCallback(() => {
    push(to);
  }, [push]);
  return (
    <>
      <ListItem display="flex">
        <Button bg="transparent" w="full" rounded="none" onClick={onClick}>
          <Flex alignItems="center">
            {icon}
            <Text ml="1">{title}</Text>
          </Flex>
        </Button>
      </ListItem>
    </>
  );
};

export const RightPanel: React.FC = () => {
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
                icon={<Avatar name="a" size="sm" />}
              />
            </PopoverTrigger>
            <PopoverContent
              w="max-content"
              _focus={{ outline: "none" }}
              bgColor="gray.700"
            >
              <UnorderedList listStyleType="none" m="0">
                <SingleMenu
                  icon={<IoMdPerson size="20px" />}
                  title="Profile"
                  to="/profile"
                />
                <SingleMenu title="Log out" to="/profile" />
              </UnorderedList>
            </PopoverContent>
          </Popover>
        </Flex>
        <Flex bgColor="whiteAlpha.50" h="full" rounded="lg"></Flex>
      </Flex>
    </>
  );
};
