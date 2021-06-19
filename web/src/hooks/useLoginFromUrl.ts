import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  accessTokenKey,
  ITokenStore,
  useTokenStore,
} from "../modules/auth/useTokenStore";
import { useGetTokenFromUrl } from "./useGetTokenFromUrl";
import * as cookieCutter from "cookie-cutter";

export const useLoginFromUrl = () => {
  const { asPath, push } = useRouter();
  const tokenStore = useTokenStore();
  const token = useGetTokenFromUrl();

  useEffect(() => {
    if (asPath.includes("accessToken")) {
      localStorage.setItem(accessTokenKey, token);

      cookieCutter.set(accessTokenKey, token);
      tokenStore.set((s: ITokenStore) => {
        s.accessToken = token;
        s.isLoggedIn = "loggedIn";
      });

      if (tokenStore.isLoggedIn === "loggedIn") {
        push("/home");
      }
    }
  }, [asPath, tokenStore.isLoggedIn]);
};
