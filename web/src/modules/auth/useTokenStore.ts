import create from "zustand";
import { combine } from "zustand/middleware";
import cookieCutter from "cookie-cutter";
import { isServer } from "../../utils/isServer";
import produce from "immer";

export const accessTokenKey = "@auth/token";

export interface ITokenStore {
  isLoggedIn: "loading" | "loggedIn" | "notLoggedIn";
  accessToken: string;
}

const getAccessToken = (): ITokenStore => {
  if (!isServer) {
    try {
      return {
        isLoggedIn: "notLoggedIn",
        accessToken: localStorage.getItem(accessTokenKey) || "",
      };
    } catch {}
  }
};

export const useTokenStore = create(
  combine(getAccessToken(), (set) => ({
    set: (fn: any) => set(produce<ITokenStore>(fn)),
    setTokens: (x: {
      accessToken: string;
      // refreshToken: string
    }) => {
      try {
        cookieCutter.set(accessTokenKey, x.accessToken);
        // cookieCutter.set(refreshTokenKey, x.refreshToken);
      } catch {}

      set(x);
    },
  }))
);
