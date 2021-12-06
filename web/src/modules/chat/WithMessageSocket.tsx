import { useEffect } from "react";
import socketIOClient from "socket.io-client";
import { useAuthStore } from "../auth/useAuthStore";
import { useMessageSocketStore } from "./useMessageSocket";

const ENDPOINT = "http://localhost:4000";

const WithMessageSocket: React.FC = ({ children }) => {
  const { openedTeam } = useMessageSocketStore();
  const { me } = useAuthStore();
  const { socket, setSocket, setMessages, addMessage } =
    useMessageSocketStore();

  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT, {
      query: { groupid: openedTeam?.id || "" },
    });
    newSocket.on("allChats", (data) => {
      console.log(`data`, data);
      setMessages(data);
    });
    newSocket.on("newChat", (data) => {
      console.log(`data`, data);
      addMessage({ ...data, user: me });
    });

    setSocket(newSocket);
    return () => {
      newSocket.close();
      setMessages([]);
    };
  }, [setSocket, setMessages, addMessage, openedTeam, me]);

  if (socket) return <>{children}</>;
  else return <>socket error</>;
};

export default WithMessageSocket;
