import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../config";

export function useReadMessage(id) {
  const queryClient = useQueryClient();
  const { isPending, data: message } = useQuery({
    queryKey: ["message", id],
    queryFn: async () => {
      try {
        const response = await axios.put(`${BASE_URL}/chats/read/${id}`, {
          withCredentials: true,
        });
        console.log(response.data);
        console.log(id);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["message"]);
    },
  });
  return { isPending, message };
}
