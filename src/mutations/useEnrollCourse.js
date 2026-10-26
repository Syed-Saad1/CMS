import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/constant/query";
import Cookies from "js-cookie";
import api from "@/lib/axios.js";

export const useEnrollCourse = (id) => {
  const token = Cookies.get("token");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const url = `${import.meta.env.VITE_API_URL}/enrollment/create`;
      const { data } = await api.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.getCourses] });
    },
  });
};
