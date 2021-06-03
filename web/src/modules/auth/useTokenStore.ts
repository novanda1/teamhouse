import create from "zustand";
import {combine} from 'zustand/middleware'
import cookieCutter from 'cookie-cutter'
import { isServer } from "../../utils/isServer";

const accessTokenKey = 'ctx'
const refreshTokenKey = 'rtx'

const getAccessToken = () => {
  if (!isServer) {
    try {
      return {
        accessToken: cookieCutter.get(accessTokenKey) || "",
        refreshToken: cookieCutter.get(refreshTokenKey)
      }
    } catch {}
  }

  return {
    accessToken: "",
    refreshToken: ""
  };
};

export const useTokenStore = create(
    combine(
        getAccessToken(),
        (set) => ({
            setTokens: (x: { accessToken: string, refreshToken: string }) => {
                try {
                    cookieCutter.set(accessTokenKey, x.accessToken)
                    cookieCutter.set(refreshTokenKey, x.refreshToken)
                } catch {}

                set(x)
            }
        })
    )
)