import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTokenStore } from "./useTokenStore";

export const useVerifyLoggedIn = () => {
  const { replace, asPath, push } = useRouter();
  const hasTokens = useTokenStore((s) => !!s.accessToken);

  useEffect(() => {
    if (!hasTokens) {
      push(`?/next=${asPath}`);
    }
  }, [hasTokens, asPath, replace, push]);

  return hasTokens;
};
