import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/popover";
import {
  Avatar,
  Button,
  Divider,
  Flex,
  IconButton,
  Text,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { BsFillPersonFill, BsGearFill } from "react-icons/bs";
import { IoExit } from "react-icons/io5";
import { User } from "../../generated/graphql";
import { useAuthStore } from "../../modules/auth/useAuthStore";

const NavAva: React.FC<{ me: User }> = ({ me }) => {
  const { removeToken } = useAuthStore();
  const handleLogout = useCallback(() => {
    removeToken();
  }, []);
  return (
    <Popover placement="top-end">
      <PopoverTrigger>
        <IconButton
          icon={<Avatar name={me?.username} size="sm" />}
          variant="outline"
          rounded="full"
          aria-label="profile menu"
        />
      </PopoverTrigger>
      <PopoverContent maxW="200px">
        <Flex flexDirection="column">
          <Button
            display="flex"
            justifyContent="flex-start"
            textAlign="left"
            w="full"
            variant="no-style"
          >
            <BsFillPersonFill />
            <Text ml="2">Profile</Text>
          </Button>
          <Divider />
          <Button
            display="flex"
            justifyContent="flex-start"
            textAlign="left"
            w="full"
            variant="no-style"
          >
            <BsGearFill />
            <Text ml="2">Settings</Text>
          </Button>
          <Divider />

          <Button
            display="flex"
            justifyContent="flex-start"
            textAlign="left"
            w="full"
            variant="no-style"
            onClick={handleLogout}
          >
            <IoExit />
            <Text ml="2">Logout</Text>
          </Button>
        </Flex>
      </PopoverContent>
    </Popover>
  );
};

export default NavAva;
