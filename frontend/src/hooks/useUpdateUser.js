import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../config";
import { useUser } from "../context/UserContext";

export function useUpdateUser() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const queryClient = useQueryClient();

  const { mutate: updatedUser, isPending: isUpdateUser } = useMutation({
    mutationFn: async ({ userId, userData, avatar }) => {
      try {
        const { data: updatedUser } = await axios.put(
          `${BASE_URL}/users/${userId}`,
          { ...userData, avatar },
          { withCredentials: true }
        );
        setUser(updatedUser);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Successfully updated");
      navigate("/profile", { replace: true });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  return { updatedUser, isUpdateUser };
}
