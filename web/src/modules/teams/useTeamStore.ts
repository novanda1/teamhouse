import produce from "immer";
import create from "zustand";
import { combine } from "zustand/middleware";
import {
  CreateTeamInputsDto,
  CreateTeamMutationResult,
  Team,
  UpdateTeamMutationResult,
} from "../../generated/graphql";

export interface ITeamStore {
  modalType: "add" | "update" | "addMember" | "";
  modalIsOpen: boolean;
  modalData?: Team | null;
  form?: {
    initialData: Omit<CreateTeamInputsDto, "__typename">;
    createTeamResponse?:
      | Promise<CreateTeamMutationResult | UpdateTeamMutationResult>
      | any;
  };
}

const getInitialTeamStore = (): ITeamStore => {
  return {
    modalType: "",
    modalIsOpen: false,
    modalData: null,
    form: {
      initialData: {
        name: "",
        description: "",
      },
    },
  };
};

export const useTeamStore = create(
  combine(getInitialTeamStore(), (set) => ({
    set: (fn) => set(produce<ITeamStore>(fn)),
    onClose: (s: ITeamStore) =>
      set(
        produce<ITeamStore>((s) => {
          s.modalIsOpen = false;
          s.modalIsOpen = false;
          s.modalData = null;
          s.modalType = "";
        })
      ),
  }))
);
