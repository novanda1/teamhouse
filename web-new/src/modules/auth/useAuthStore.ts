import create from "zustand";
import { combine } from "zustand/middleware";
import { ACCESS_TOKEN_NAME } from "../../constants";
import { isServer } from "../../utils/isServer";

export interface IAuthStore {
  accessToken: string;
}

const getInitialStore = (): IAuthStore => ({
  accessToken: isServer ? "" : localStorage.getItem(ACCESS_TOKEN_NAME),
});


export const useAuthStore = create(
  combine(getInitialStore(), (set) => ({
    setToken: (token: string) => set({ accessToken: token }),
  }))
);
