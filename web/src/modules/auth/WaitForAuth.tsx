import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTokenStore } from "./useTokenStore";
import { useVerifyLoggedIn } from "./useVerifyLoggedIn";

interface WaitForWsAndAuthProps {}

export const WaitForAuth: React.FC<WaitForWsAndAuthProps> = ({ children }) => {
  useVerifyLoggedIn();
  const { push, query } = useRouter();
  const next = query?.next; // /login?next=thisIsTheOutput

  /**
   * @todo make this better
   */
  const [isLoggedIn, setIsLoggedIn] =
    useState<"loading" | "no" | "yeah">("loading");

  const hasTokens = useTokenStore((s) => !!(s.accessToken && s.refreshToken));

  useEffect(() => {
    hasTokens ? setIsLoggedIn("yeah") : setIsLoggedIn("no");
  }, [hasTokens, push, next, isLoggedIn]);

  if (isLoggedIn === "yeah") return <>{children}</>;
  return <></>;
};
