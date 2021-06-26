import React, { memo, useContext, useEffect, useMemo, useState } from "react";
import { io, ManagerOptions, Socket, SocketOptions } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { useMeQuery } from "../../generated/graphql";
import { useGetId } from "../../hooks/useGetId";
import { Fn } from "../../types";
import {
  TeamChatMessage,
  useChatTeamStore,
} from "../chat/team/useChatTeamStore";

interface WebSocketProviderProps {
  shouldConnect: boolean;
}

type V = Socket<DefaultEventsMap, DefaultEventsMap> | null;

export const WebSocketContext = React.createContext<{
  conn: V;
  options: Partial<ManagerOptions & SocketOptions>;
  sendMessage: (message: TeamChatMessage) => void;
}>({
  conn: null,
  options: { path: "/team/", reconnectionDelayMax: 10000 },
  sendMessage: () => {},
});

export const WebSocketProvider: React.FC<WebSocketProviderProps> = memo(
  ({ shouldConnect, children }) => {
    const context = useContext(WebSocketContext);
    const me = useMeQuery();
    const teamId = useGetId();

    const [options, setOptions] = useState<
      Partial<ManagerOptions & SocketOptions>
    >(context.options);

    const sendMessage = (message: TeamChatMessage) => {
      context.conn.emit("input", message);
    };

    useEffect(() => {
      context.sendMessage = sendMessage;

      if (me?.data) {
        setOptions((s) => ({
          ...s,
          auth: {
            user: (({ __typename, ...o }) => o)(me.data?.me),
          },
          query: {
            teamId: teamId?.toString(),
          },
        }));
      }
    }, [me?.data]);

    useEffect(() => {
      context.options = options;
      if (
        context?.options.query?.teamId !== null &&
        context?.options.auth !== null
      ) {
        context.conn = io("http://localhost:4000", context.options);
      }

      context.conn.on("connect", () => {
        context.conn.emit("room", teamId);
      });

      context.conn.on("message", (data) => {
        console.log(data);
      });

      context.conn.on("output", (data: TeamChatMessage) => {
        console.log(data.userId);

        useChatTeamStore.getState().addMessage(data);
      });
    }, [options, context?.options.auth]);

    useEffect(() => {}, []);

    return (
      <>
        <WebSocketContext.Provider
          value={useMemo(
            () => ({
              conn: context.conn,
              options: context.options,
              sendMessage,
            }),
            [context]
          )}
        >
          {children}
        </WebSocketContext.Provider>
      </>
    );
  }
);
