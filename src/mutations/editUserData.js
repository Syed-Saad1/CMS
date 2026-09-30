import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/constant/query";
import axios from "axios";
import Cookies from "js-cookie";

export const editUserData = (id) => {
  const token = Cookies.get("token");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const url = `${import.meta.env.VITE_API_URL}/auth/user/update/${id}`;
      const { data } = await axios.patch(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("payload", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.getUserById],
      });

      queryClient.invalidateQueries({
        queryKey: [QueryKey.getUser],
      });
    },
  });
};
