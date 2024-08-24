import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../config";

export function useGetPosts(query) {
  const { isPending, data: posts } = useQuery({
    queryKey: ["posts", JSON.stringify(query)],
    queryFn: async () => {
      try {
        const params = new URLSearchParams(query);
        const response = await axios.get(
          `${BASE_URL}/api/posts?query=${params.toString()}`,
          {
            withCredentials: true,
          }
        );
        return response?.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return { isPending, posts };
}
