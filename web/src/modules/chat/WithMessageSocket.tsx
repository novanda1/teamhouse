import { useRouter } from "next/router";
import { useEffect } from "react";
import socketIOClient from "socket.io-client";
import { useAuthStore } from "../auth/useAuthStore";
import { useMessageSocketStore } from "./useMessageSocket";

const ENDPOINT = "http://localhost:4000";

const WithMessageSocket: React.FC = ({ children }) => {
  const { query } = useRouter();
  const { me } = useAuthStore();
  const { socket, setSocket, setMessages, addMessage } =
    useMessageSocketStore();

  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT, {
      query: { groupid: query.id },
    });
    newSocket.on("allChats", (data) => {
      setMessages(data);
    });
    newSocket.on("newChat", (data) => {
      addMessage({ ...data, user: me });
    });

    setSocket(newSocket);
    return () => {
      newSocket.close();
      setMessages([]);
    };
  }, [setSocket, setMessages, addMessage, query.id, me]);

  if (socket) return <>{children}</>;
  else return <>socket error</>;
};

export default WithMessageSocket;
