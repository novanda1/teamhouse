import { Socket } from "socket.io-client";
import create from "zustand";
import { combine } from "zustand/middleware";
import { Team } from "../../generated/graphql";

interface IMessageSocketStore {
  socket: Socket;
  messages: any[];
  open: boolean;
  openedTeam: Team;
}

export const useMessageSocketStore = create(
  combine(
    {
      socket: null,
      messages: [],
      open: false,
      openedTeam: null,
    } as IMessageSocketStore,
    (set) => ({
      setSocket: (socket: Socket) => set({ socket }),
      setMessages: (messages: []) => set({ messages }),
      addMessage: (message: any) =>
        set((state) => ({ messages: [...state.messages, message] })),
      setOpenedTeam: (team: Team) => set({ openedTeam: team }),
      setOpen: (open: boolean) => set({ open }),
    })
  )
);
