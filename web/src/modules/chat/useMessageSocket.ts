import { Socket } from "socket.io-client";
import create from "zustand";
import { combine } from "zustand/middleware";

export const useMessageSocketStore = create(
  combine(
    {
      socket: null,
      messages: [],
    },
    (set) => ({
      setSocket: (socket: Socket) => set({ socket }),
      setMessages: (messages: []) => set({ messages }),
      addMessage: (message: any) =>
        set((state) => ({ messages: [...state.messages, message] })),
    })
  )
);
