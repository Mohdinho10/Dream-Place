import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { BASE_URL } from "../config";

export function useGetChats() {
  const { socket } = useSocket();
  const {
    isPending,
    data: chats,
    refetch,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/chats`, {
          withCredentials: true,
        });
        return response?.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", () => {
        refetch();
      });

      socket.on("messageRead", () => {
        refetch();
      });
    }

    return () => {
      if (socket) {
        socket.off("newMessage");
        socket.off("messageRead");
      }
    };
  }, [socket, refetch]);

  return { isPending, chats, refetch };
}
