import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";
import { useUser } from "../context/UserContext";

export function useSavePost() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { mutate: savePost, isPending: isSavePost } = useMutation({
    mutationFn: async (postId) => {
      if (!user) {
        toast.error("Please login to save post");
        return;
      }

      try {
        await axios.post(`${BASE_URL}/api/posts/save`, postId, {
          withCredentials: true,
        });
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  return { savePost, isSavePost };
}
