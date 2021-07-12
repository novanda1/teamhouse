import { useRouter } from "next/router";

export const useAuthLogin = () => {
  const router = useRouter();

  const onLoginButtonClick = () => {
    router.push("http://localhost:4000/google");
  };

  return {
    onLoginButtonClick,
  };
};
