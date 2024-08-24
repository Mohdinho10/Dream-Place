import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../config";

export function useGetPost(id) {
  const { isPending, data: post } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/posts/${id}`, {
          withCredentials: true,
        });
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return { isPending, post };
}
