import React from "react";
import { useMeQuery } from "../../generated/graphql";
import {
  Avatar,
  Box,
  chakra,
  Flex,
  Heading,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useStyles,
  useTab,
} from "@chakra-ui/react";

const StyledTab = chakra("button", {});

const CustomTab: React.ForwardRefExoticComponent<
  React.RefAttributes<any> | any
> = React.forwardRef((props, ref) => {
  const tabProps = useTab(props);
  const isSelected = !!tabProps["aria-selected"];

  const styles = useStyles();
  return (
    <StyledTab
      __css={styles.tab}
      border="none"
      display="flex"
      w="full"
      justifyContent="center"
      py="0"
      _focus={{
        boxShadow: "none",
      }}
      {...tabProps}
    >
      <Box
        position="relative"
        py="2.5"
        w="max-content"
        fontWeight="bold"
        color={isSelected ? "purple.200" : "white"}
      >
        {tabProps.children}
        {isSelected && (
          <Box
            position="absolute"
            bottom="0"
            h="1"
            w="full"
            rounded="full"
            bgColor="purple.200"
          ></Box>
        )}
      </Box>
    </StyledTab>
  );
});

export const Profile: React.FC = () => {
  const { data, loading } = useMeQuery();
  const u = data?.me;

  if (data && !loading)
    return (
      <>
        <Flex flexDirection="column" position="relative">
          <Flex
            h="2xs"
            overflow="hidden"
            position="relative"
            alignItems="center"
            rounded="lg"
          >
            <Image
              src={"/cover1.jpg"}
              alt="Picture of the author"
              minH="full"
              minW="full"
              h="max-content"
              w="max-content"
            />
          </Flex>
          <Box ml="5" sx={{ transform: "translateY(-50%)" }}>
            <Avatar
              src={
                u.picture
                  ? u.picture
                  : "https://pbs.twimg.com/profile_images/1397231638434697217/6ztb3kG8_400x400.jpg"
              }
              name={u.firstname}
              size="2xl"
              borderWidth="6px"
            />
          </Box>
        </Flex>
        <Box mt="-12" mx="5">
          <Heading size="md">
            {u.firstname} {u.lastname}
          </Heading>
          <Text color="whiteAlpha.600">@{u.firstname}</Text>
          <Text mt="3" color="gray.200">
            {u.bio}
          </Text>
        </Box>

        <Box mt="5">
          <Tabs isFitted>
            <TabList>
              <CustomTab>Teams</CustomTab>
              <CustomTab>No Ideas</CustomTab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <p>one!</p>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </>
    );
  return <></>;
};
