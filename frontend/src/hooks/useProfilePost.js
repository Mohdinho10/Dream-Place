import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../config";

export function useProfilePost() {
  const { isPending, data: profilePosts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/posts/profile`, {
          withCredentials: true,
        });
        return response?.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return { isPending, profilePosts };
}
