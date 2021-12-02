import create from "zustand";
import { combine } from "zustand/middleware";
import { ACCESS_TOKEN_NAME } from "../../constants";
import { isServer } from "../../utils/isServer";

export interface IAuthStore {
  accessToken: string;
}

const getInitialStore = (): IAuthStore => {
  if (!isServer)
    try {
      return {
        accessToken: localStorage.getItem(ACCESS_TOKEN_NAME) || "",
      };
    } catch {}
};

export const useAuthStore = create(
  combine(getInitialStore(), (set) => ({
    setToken: (token: string) => set({ accessToken: token }),
    removeToken: () => {
      localStorage.removeItem(ACCESS_TOKEN_NAME);
      return set({ accessToken: "" });
    },
  }))
);
