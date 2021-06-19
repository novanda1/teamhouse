import { useRouter } from "next/router";

export const useGetTokenFromUrl = () => {
  const { asPath } = useRouter();
  const token = asPath?.split("=")[1]?.split("#").join("") || "";

  return token;
};
