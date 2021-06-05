import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTokenStore } from "./useTokenStore";

export const useVerifyLoggedIn = () => {
  const { replace, asPath, push } = useRouter();
  const hasTokens = useTokenStore((s) => !!(s.accessToken && s.refreshToken));

  useEffect(() => {
    if (!hasTokens) {
      push(`/`);
    }
  }, [hasTokens, asPath, replace, push]);

  return hasTokens;
};
