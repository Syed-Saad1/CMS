import { QueryKey } from "@/constant/query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const deleteUser = () => {
  const token = Cookies.get("token");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      console.log("id", id);
      if (!id) {
        throw new Error("Course ID is required");
      }

      const url = `${import.meta.env.VITE_API_URL}/auth/users/${id}`;

      console.log("DELETE URL:", url);

      const { data } = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.getUser],
      });
    },
  });
};
