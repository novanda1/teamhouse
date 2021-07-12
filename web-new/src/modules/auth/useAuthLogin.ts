import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthStore } from "./useAuthStore";

export const useAuthLogin = () => {
  const router = useRouter();
  const authStore = useAuthStore();
  const hasToken = authStore.accessToken;

  const onLoginButtonClick = () => {
    router.push("http://localhost:4000/google");
  };

  useEffect(() => {
    const accessToken = router?.query?.accessToken;

    if (accessToken && !hasToken) {
      authStore.setToken(accessToken as string);
    }

    if (hasToken && !accessToken) router.push("/home");
  }, [router, authStore, hasToken]);

  return {
    onLoginButtonClick,
  };
};
