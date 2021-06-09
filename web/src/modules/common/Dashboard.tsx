import { Box, Button, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { memo, useCallback } from "react";
import { TeamList } from "../teams/TeamList";

interface Props {}

export const Dashboard: React.FC<Props> = memo(() => {
  const { push } = useRouter();
  const onClick = useCallback(() => {
    push("/home");
  }, [push]);
  return (
    <>
      <Box py="10" position="sticky">
        <Heading color="brand.100" as="h1" size="lg" pb="60px">
          <Button variant="unstyled" sx={{ font: "inherit" }} onClick={onClick}>
            Teamhouse
          </Button>
        </Heading>
        <TeamList />
      </Box>
    </>
  );
});
