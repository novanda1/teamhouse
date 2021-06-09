import produce from "immer";
import create from "zustand";
import { combine } from "zustand/middleware";

export interface IPanelStore {
  mainPanel: "team" | "profile" | "idle";
}

const getPanelStoreInitial = (): IPanelStore => {
  return {
    mainPanel: "idle",
  };
};

export const usePanelStore = create(
  combine(getPanelStoreInitial(), (set) => ({
    set: (fn: any) => set(produce<IPanelStore>(fn)),
  }))
);
