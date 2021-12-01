import { Heading } from "@chakra-ui/react";
import { WaitForAuth } from "../modules/auth/WaitForAuth";
import { MainLayout } from "../ui/layout/MainLayout";

const Home = () => {
  return (
    <>
      <WaitForAuth>
        <MainLayout>
          <Heading size="md">Select Team</Heading>
        </MainLayout>
      </WaitForAuth>
    </>
  );
};

export default Home;
