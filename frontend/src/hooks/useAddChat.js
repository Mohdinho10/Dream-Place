import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function useAddChat() {
  const navigate = useNavigate();

  const { mutate: addChat, isPending: isAddChat } = useMutation({
    mutationFn: async ({ receiverId }) => {
      try {
        const { data } = await axios.post(
          `${BASE_URL}/api/chats`,
          { receiverId },
          {
            withCredentials: true,
          }
        );
        console.log(data);
        navigate(`/profile`, { replace: true });
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        throw error;
      }
    },
    // onSuccess: () => {
    //   navigate(`${data.id}`, { replace: true });
    // },
  });

  return { addChat, isAddChat };
}
