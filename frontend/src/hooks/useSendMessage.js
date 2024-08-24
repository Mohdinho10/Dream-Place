import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";

export function useSendMessage(chatId) {
  const queryClient = useQueryClient();

  const {
    mutate: sendMessage,
    isPending: isSendingMessage,
    data: messages,
  } = useMutation({
    mutationFn: async (text) => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/chats/message/${chatId}`,
          text,
          {
            withCredentials: true,
          }
        );
        console.log(response);
        return response.data;
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  return { sendMessage, isSendingMessage, messages };
}
