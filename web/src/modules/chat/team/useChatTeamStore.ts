import produce from "immer";
import create from "zustand";
import { combine } from "zustand/middleware";
import { User } from "../../../generated/graphql";

export interface ITeamChat {
  user: User;
  teamId: number;
  text: string | any;
}

export interface IChatTeamStore {
  chat: ITeamChat[];
}

const getInitialTeamStore = (): IChatTeamStore => {
  return {
    chat: [],
  };
};

export const useChatTeamStore = create(
  combine(getInitialTeamStore(), (set) => ({
    set: (fn) => set(produce<IChatTeamStore>(fn)),
  }))
);
