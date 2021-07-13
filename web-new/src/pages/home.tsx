import { WaitForAuth } from "../modules/auth/WaitForAuth";
import { MainLayout } from "../ui/layout/MainLayout";

const Home = () => {
  return (
    <>
      <WaitForAuth>
        <MainLayout />
      </WaitForAuth>
    </>
  );
};

export default Home;
