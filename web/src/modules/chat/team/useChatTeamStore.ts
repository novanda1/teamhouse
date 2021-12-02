import create from "zustand";
import { combine } from "zustand/middleware";
import { Message } from "../../../generated/graphql";

const getInitialTeamStore = () => {
  return {
    messages: [],
    message: "",
  };
};

export const useChatTeamStore = create(
  combine(getInitialTeamStore(), (set) => ({
    // unbanUser: (userId: string) =>
    //   set(({ bannedUserIdMap: { [userId]: _, ...banMap }, ...s }) => ({
    //     messages: s.messages.filter((m) => m.userId !== userId),
    //     bannedUserIdMap: banMap,
    //   })),
    // addBannedUser: (userId: string) =>
    //   set((s) => ({
    //     messages: s.messages.filter((m) => m.userId !== userId),
    //     bannedUserIdMap: { ...s.bannedUserIdMap, [userId]: true },
    //   })),
    addMessage: (m: Message) =>
      set((s) => ({
        messages: [
          ...(s.messages.length <= 100 ? s.messages : s.messages.slice(0, 100)),
          { ...m },
        ],
      })),
    setMessages: (messages: Message[]) =>
      set((s) => ({
        messages,
      })),
    clearChat: () =>
      set({
        messages: [],
      }),
    reset: () =>
      set({
        messages: [],
        message: "",
      }),
    setMessage: (message: string) =>
      set({
        message,
      }),
    setOpen: (open: boolean) => set((s) => ({ ...s, open })),
    // setIsRoomChatScrolledToTop: (isRoomChatScrolledToTop: boolean) =>
    //   set({
    //     isRoomChatScrolledToTop,
    //   }),
    // toggleFrozen: () => set((s) => ({ frozen: !s.frozen })),
  }))
);
