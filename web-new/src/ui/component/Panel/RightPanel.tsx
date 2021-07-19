import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BiDotsHorizontalRounded, BiMicrophone } from "react-icons/bi";

export const RightPanel: React.FC = ({}) => {
  return (
    <Flex
      flexDirection="column"
      borderLeft="1px solid"
      borderColor="blackAlpha.100"
      w="full"
      px="6"
      py="7"
    >
      <Box>
        <Flex w="full" justifyContent="space-between">
          <Heading size="md">
            Member
            <Text display="inline" fontWeight="normal">
              (
              <Text display="inline" color="blue.400">
                25
              </Text>
              )
            </Text>
          </Heading>
          <Link color="text.dimmed">View All</Link>
        </Flex>
        <Stack direction="row" mt="3">
          <Avatar size="sm">
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
          <Avatar size="sm">
            <AvatarBadge
              borderColor="papayawhip"
              bg="tomato"
              boxSize="1.25em"
            />
          </Avatar>
          <Avatar size="sm">
            <AvatarBadge
              borderColor="papayawhip"
              bg="tomato"
              boxSize="1.25em"
            />
          </Avatar>
          <Avatar size="sm">
            <AvatarBadge
              borderColor="papayawhip"
              bg="tomato"
              boxSize="1.25em"
            />
          </Avatar>
          <Avatar size="sm">
            <AvatarBadge
              borderColor="papayawhip"
              bg="tomato"
              boxSize="1.25em"
            />
          </Avatar>
          <Avatar size="sm">
            <AvatarBadge
              borderColor="papayawhip"
              bg="tomato"
              boxSize="1.25em"
            />
          </Avatar>
        </Stack>
      </Box>
      {/* chat */}
      <Box mt="7">
        <Flex flexDirection="column">
          <Heading size="md">Group Chat</Heading>
          <Flex mt="3" flexDirection="column" sx={{ gap: "15px" }}>
            <Flex alignItems="flex-end" sx={{ gap: "8px" }} maxW="80%">
              <Avatar size="xs">
                <AvatarBadge
                  borderColor="papayawhip"
                  bg="tomato"
                  boxSize="1.25em"
                />
              </Avatar>
              <Box
                p="2"
                borderRadius="lg"
                backgroundColor="thbg.secondary"
                borderBottomLeftRadius="none"
                boxShadow="sm"
              >
                Selamat Pagi ✨
              </Box>
            </Flex>
            {/*  */}
            <Flex
              alignItems="flex-end"
              alignSelf="flex-end"
              flexDirection="row-reverse"
              sx={{ gap: "8px" }}
              maxW="80%"
            >
              <Avatar size="xs">
                <AvatarBadge
                  borderColor="papayawhip"
                  bg="tomato"
                  boxSize="1.25em"
                />
              </Avatar>
              <Box
                p="2"
                borderRadius="lg"
                borderBottomRightRadius="none"
                backgroundColor="thc.primaryBlue"
                color="white"
                boxShadow="sm"
              >
                Pagi Mas Novan🔥
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      {/* nav */}
      <Flex mt="auto">
        <Input variant="filled" placeholder="Write here..." />
        <Flex ml="2">
          <Button backgroundColor="transparent" color="text.dimmed" px="0.5">
            <BiMicrophone size="1.3em" />
          </Button>
          <Button backgroundColor="transparent" color="text.dimmed" px="0.5">
            <BiDotsHorizontalRounded size="1.3em" />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
