/* eslint-disable react/prop-types */
import { io } from "socket.io-client";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  useEffect(() => {
    user && socket?.emit("newUser", user.id);
  }, [user, socket]);

  // console.log(user);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

// Cities custom hook
// eslint-disable-next-line react-refresh/only-export-components
export function useSocket() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("SocketContext was used outside the SocketProvider");
  }
  return context;
}
