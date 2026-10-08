import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/constant/query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const useUpdatePassword = (id) => {
  const token = Cookies.get("token");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const url = `${import.meta.env.VITE_API_URL}/auth/user/updatePassword/${id}`;
      const { data } = await axios.patch(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.getUpdateRole] });
      queryClient.invalidateQueries({ queryKey: [QueryKey.getUser] });
      toast.success("Update Password Succesfully");
    },
  });
};
