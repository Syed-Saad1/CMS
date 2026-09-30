import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/constant/query";
import axios from "axios";
import Cookies from "js-cookie";

export const useEnrollCourse = () => {
  const token = Cookies.get("token");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const url = `${import.meta.env.VITE_API_URL}/enrollment/create`;
      const { data } = await axios.post(url, payload, {
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
