import React, { useEffect } from "react";
import { ITokenStore, useTokenStore } from "./useTokenStore";
import { useVerifyLoggedIn } from "./useVerifyLoggedIn";

interface WaitForWsAndAuthProps {}

export const WaitForAuth: React.FC<WaitForWsAndAuthProps> = ({ children }) => {
  useVerifyLoggedIn();
  const hasTokens = useTokenStore((s) => !!s.accessToken);
  const tokens = useTokenStore();

  useEffect(() => {
    if (hasTokens)
      tokens.set((s: ITokenStore) => void (s.isLoggedIn = "loggedIn"));
    else tokens.set((s: ITokenStore) => void (s.isLoggedIn = "notLoggedIn"));
  }, [hasTokens]);

  if (tokens.isLoggedIn === "loggedIn") return <>{children}</>;
  return <></>;
};
