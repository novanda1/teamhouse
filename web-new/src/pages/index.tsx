import { Link } from "@chakra-ui/react";
import NextLink from "next/link";

const Index: React.FC = () => {
  return (
    <>
      <NextLink href="http://localhost:4000/google">
        <Link  href="http://localhost:4000/google">login</Link>
      </NextLink>
    </>
  );
};

export default Index;
