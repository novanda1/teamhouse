import produce from "immer";
import { useContext } from "react";
import create from "zustand";
import { combine } from "zustand/middleware";
import { User } from "../../../generated/graphql";
import { WebSocketContext } from "../../ws/WebSocketProvider";

interface TextToken {
  t: "text";
  v: string;
}
interface MentionToken {
  t: "mention";
  v: string;
}
interface LinkToken {
  t: "link";
  v: string;
}

interface BlockToken {
  t: "block";
  v: string;
}

interface EmoteToken {
  t: "emote";
  v: string;
}

export type TeamChatMessageToken =
  | TextToken
  | MentionToken
  | LinkToken
  | BlockToken
  | EmoteToken;

const colors = [
  "#ff2366",
  "#fd51d9",
  "#face15",
  "#8d4de8",
  "#6859ea",
  "#7ed321",
  "#56b2ba",
  "#00CCFF",
  "#FF9900",
  "#FFFF66",
];

function generateColorFromString(str: string) {
  let sum = 0;
  for (let x = 0; x < str.length; x++) sum += x * str.charCodeAt(x);
  return colors[sum % colors.length];
}

export interface TeamChatMessage {
  // id: string;
  userId: string;
  // avatarUrl: string;
  color: string;
  username: string;
  // displayName: string;
  tokens: any[];
  // deleted?: boolean;
  // deleterId?: string;
  // sentAt: string;
  // isWhisper?: boolean;
}

const getInitialTeamStore = () => {
  return {
    open: false,
    bannedUserIdMap: {} as Record<string, boolean>,
    messages: [] as TeamChatMessage[],
    newUnreadMessages: false,
    message: "" as string,
    isRoomChatScrolledToTop: false,
    frozen: false,
  };
};

export const useChatTeamStore = create(
  combine(getInitialTeamStore(), (set) => ({
    unbanUser: (userId: string) =>
      set(({ bannedUserIdMap: { [userId]: _, ...banMap }, ...s }) => ({
        messages: s.messages.filter((m) => m.userId !== userId),
        bannedUserIdMap: banMap,
      })),
    addBannedUser: (userId: string) =>
      set((s) => ({
        messages: s.messages.filter((m) => m.userId !== userId),
        bannedUserIdMap: { ...s.bannedUserIdMap, [userId]: true },
      })),
    addMessage: (m: TeamChatMessage) =>
      set((s) => ({
        newUnreadMessages: !s.open,
        messages: [
          ...(s.messages.length <= 100 || s.frozen
            ? s.messages
            : s.messages.slice(0, 100)),
          { ...m, color: generateColorFromString(m.userId) },
        ],
      })),
    setMessages: (messages: TeamChatMessage[]) =>
      set((s) => ({
        messages,
      })),
    clearChat: () =>
      set({
        messages: [],
        newUnreadMessages: false,
        bannedUserIdMap: {},
      }),
    reset: () =>
      set({
        messages: [],
        newUnreadMessages: false,
        message: "",
        bannedUserIdMap: {},
      }),
    setMessage: (message: string) =>
      set({
        message,
      }),
    setOpen: (open: boolean) => set((s) => ({ ...s, open })),
    setIsRoomChatScrolledToTop: (isRoomChatScrolledToTop: boolean) =>
      set({
        isRoomChatScrolledToTop,
      }),
    toggleFrozen: () => set((s) => ({ frozen: !s.frozen })),
  }))
);
