import { WaitForAuth } from "../modules/auth/WaitForAuth";

const Home = () => {
  return (
    <>
      <WaitForAuth>home</WaitForAuth>
    </>
  );
};

export default Home;
