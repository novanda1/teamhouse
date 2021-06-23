import React, { createContext, useEffect, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { useMeQuery, User } from "../../generated/graphql";
import { useTokenStore } from "../auth/useTokenStore";

interface WebSocketProviderProps {
  shouldConnect: boolean;
}

type V = Socket<DefaultEventsMap, DefaultEventsMap> | null;

export const WebSocketContext = React.createContext<{
  conn: V;
  setUser: (u: User) => void;
  setConn: (u: V) => void;
}>({
  conn: null,
  setUser: () => {},
  setConn: () => {},
});

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  shouldConnect,
  children,
}) => {
  const me = useMeQuery();

  const [conn, setConn] = useState<V>(null);
  const [user, setUser] = useState<User>();
  const [options, setOptions] = useState<{ [key: string]: any }>({
    path: "/team/",
    reconnectionDelayMax: 10000,
    auth: {
      user,
    },
  });

  const client = shouldConnect ? io("http://localhost:4000", options) : null;

  useEffect(() => {
    if (me?.data) {
      setUser(me.data.me);
      setOptions((s) => ({
        ...s,
        auth: {
          ...s.auth,
          user: (({ __typename, ...o }) => o)(me.data?.me),
        },
      }));
    }
  }, [me?.data]);

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
