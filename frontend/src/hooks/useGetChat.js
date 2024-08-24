import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../config";

export function useGetChat(id) {
  const { isPending, data: chat } = useQuery({
    queryKey: ["chat", id],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/chats/${id}`, {
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return { isPending, chat };
}
