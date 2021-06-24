import React, { memo, useContext, useEffect, useMemo, useState } from "react";
import { io, ManagerOptions, Socket, SocketOptions } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { useMeQuery, User } from "../../generated/graphql";
import { useGetId } from "../../hooks/useGetId";
import {
  IChatTeamStore,
  ITeamChat,
  useChatTeamStore,
} from "../chat/team/useChatTeamStore";

interface WebSocketProviderProps {
  shouldConnect: boolean;
}

type V = Socket<DefaultEventsMap, DefaultEventsMap> | null;

export const WebSocketContext = React.createContext<{
  conn: V;
  options: Partial<ManagerOptions & SocketOptions>;
}>({
  conn: null,
  options: { path: "/team/", reconnectionDelayMax: 10000 },
});

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  shouldConnect,
  children,
}) => {
  const context = useContext(WebSocketContext);
  const me = useMeQuery();
  const teamId = useGetId();

  const [count, setCount] = useState(0);

  const [options, setOptions] = useState<
    Partial<ManagerOptions & SocketOptions>
  >(context.options);

  useEffect(() => {
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

    context.conn.on("output", (data: ITeamChat) => {
      console.log(`data`, data);
      // setCount(0);
      // if (count === 0)
      //   useChatTeamStore.getState().set((s: IChatTeamStore) => {
      //     s.chat = [...s.chat, data];
      //   });
      // setCount(1);
    });
  }, [options, context?.options.auth]);

  useEffect(() => {}, []);

  return (
    <>
      <WebSocketContext.Provider
        value={useMemo(
          () => ({
            conn,
            setConn,
            setUser: (u: User) => {},
          }),
          [conn]
        )}
      >
        {children}
      </WebSocketContext.Provider>
    </>
  );
};
