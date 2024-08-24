import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function useAddPost() {
  const navigate = useNavigate();

  const { mutate: addPost, isPending: isAddPost } = useMutation({
    mutationFn: async (postData) => {
      try {
        const { data } = await axios.post(`${BASE_URL}/api/posts`, postData, {
          withCredentials: true,
        });
        console.log(data);
        navigate(`/list/${data.id}`, { replace: true });
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

  return { addPost, isAddPost };
}
