import { useRouter } from "next/router";
import { useEffect } from "react";
import { ACCESS_TOKEN_NAME } from "../../constants";
import { useAuthStore } from "./useAuthStore";

export const useAuthLogin = () => {
  const router = useRouter();
  const authStore = useAuthStore();
  const hasToken = authStore.accessToken;
  
  const onLoginButtonClick = () => {
    router.push("http://localhost:4000/google");
  };
  
  useEffect(() => {
    const savedToken = localStorage?.getItem(ACCESS_TOKEN_NAME);
    const accessToken = router?.query?.accessToken as string;

    if (savedToken) authStore.setToken(savedToken);

    if (accessToken && !hasToken) {
      authStore.setToken(accessToken);
      localStorage.setItem(ACCESS_TOKEN_NAME, accessToken);
    }

    if (hasToken) router.push("/home");

  }, [router, authStore, hasToken]);

  return {
    onLoginButtonClick,
  };
};
