import api from "@/lib/axios.js";
import { QueryKey } from "@/constant/query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useLogin = () => {
  const token = Cookies.get("token");
  const queryClient = useQueryClient();

  const mutationFn = async (payload) => {
    const { data } = await api.post("/auth/login", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };

  return useMutation({
    mutationFn,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.getCourses] });
    },
  });
};
