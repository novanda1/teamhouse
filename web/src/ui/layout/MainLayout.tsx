import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  VStack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useAuthStore } from "../../modules/auth/useAuthStore";
import { BsFillPersonFill, BsGearFill } from "react-icons/bs";
import { IoExit } from "react-icons/io5";
import NavAva from "../component/NavAva";

export const MainLayout: React.FC = ({ children }) => {
  const { me } = useAuthStore();
  return (
    <>
      <Box w="100vw" top="0">
        <Container maxW="8xl" borderBottomWidth="1px" borderColor="gray.200">
          <HStack py="3" justifyContent="space-between">
            <Box>
              <NextLink href="/home">
                <Link>
                  <Heading size="md">TeamHouse</Heading>
                </Link>
              </NextLink>
            </Box>
            <Box>
              <NavAva me={me} />
            </Box>
          </HStack>
        </Container>
      </Box>
      <Container maxW="8xl">{children}</Container>
    </>
  );
};
