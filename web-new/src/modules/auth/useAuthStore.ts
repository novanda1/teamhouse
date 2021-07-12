import create from "zustand";
import { combine } from "zustand/middleware";

export interface IAuthStore {
  accessToken: string;
}

const getInitialStore = (): IAuthStore => ({ accessToken: "" });

export const useAuthStore = create(
  combine(getInitialStore(), (set) => ({
    setToken: (token: string) => set({ accessToken: token }),
  }))
);
