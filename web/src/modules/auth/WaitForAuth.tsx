import React, { useEffect, useState } from "react";
import { useTokenStore } from "./useTokenStore";
import { useVerifyLoggedIn } from "./useVerifyLoggedIn";

interface WaitForWsAndAuthProps {}

export const WaitForAuth: React.FC<WaitForWsAndAuthProps> = ({ children }) => {
  useVerifyLoggedIn();
  const hasTokens = useTokenStore((s) => !!(s.accessToken && s.refreshToken));
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (hasTokens) setLoggedIn(hasTokens);
  }, [hasTokens]);

  if (loggedIn) return <>{children}</>;
  return <></>;
};
