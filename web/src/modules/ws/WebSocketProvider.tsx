import React, { useContext } from "react";
import { io, ManagerOptions, Socket, SocketOptions } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { useGetId } from "../../hooks/useGetId";
import {
  TeamChatMessage,
  useChatTeamStore,
} from "../chat/team/useChatTeamStore";

interface WebSocketProviderProps {}

type V = Socket<DefaultEventsMap, DefaultEventsMap> | null;

export const WebSocketContext = React.createContext<{
  conn: V;
  options: Partial<ManagerOptions & SocketOptions>;
  sendMessage: (message) => void;
}>({
  conn: null,
  options: { path: "/team/", reconnectionDelayMax: 10000 },
  sendMessage: () => {},
});

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
}) => {
  const teamId = useGetId();
  const context = useContext(WebSocketContext);

  context.conn = io("ws://localhost:4000", {
    ...context.options,
    query: { teamId },
  });

  context.sendMessage = (message) => context.conn.emit("input", message);

  if (teamId)
    context.conn?.on("connect", () => {
      console.log("connect");
      context.conn?.emit("team", teamId);
    });

  context.conn?.on("output", (data: TeamChatMessage) => {
    useChatTeamStore.getState().addMessage(data);
  });

  context.conn?.on("change-team", (data: TeamChatMessage[]) => {
    useChatTeamStore.getState().setMessages(data);
    console.log(
      `useChatTeamStore.getState().messages`,
      useChatTeamStore.getState().messages
    );
  });

  return <>{children}</>;
};
