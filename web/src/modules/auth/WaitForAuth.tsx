import React from "react";
import { useTokenStore } from "./useTokenStore";
import { useVerifyLoggedIn } from "./useVerifyLoggedIn";

interface WaitForWsAndAuthProps {}

export const WaitForAuth: React.FC<WaitForWsAndAuthProps> = ({ children }) => {
  useVerifyLoggedIn();
  const hasTokens = useTokenStore((s) => !!(s.accessToken && s.refreshToken));

  if (hasTokens) return <>{children}</>;
  return <></>;
};
