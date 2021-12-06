import create from "zustand";
import { combine } from "zustand/middleware";
import { ACCESS_TOKEN_NAME } from "../../constants";
import { User } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";

export interface IAuthStore {
  accessToken: string;
  me: User | null;
}

const getInitialStore = (): IAuthStore => {
  if (!isServer)
    try {
      return {
        accessToken: localStorage.getItem(ACCESS_TOKEN_NAME) || "",
        me: null,
      };
    } catch {}
};

export const useAuthStore = create(
  combine(getInitialStore(), (set) => ({
    setToken: (token: string) => set({ accessToken: token }),
    setMe: (me: User) => set({ me }),
    removeToken: () => {
      localStorage.removeItem(ACCESS_TOKEN_NAME);
      return set({ accessToken: "" });
    },
  }))
);
