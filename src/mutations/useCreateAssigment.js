import { QueryKey } from "@/constant/query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const useCreateAssigment = (id) => {
  const token = Cookies.get("token");
  const queryClient = useQueryClient();

  const mutationFn = async (payload) => {
    const url = `${import.meta.env.VITE_API_URL}/assignment/create-assignment/${id}`;
    const { data } = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  };

  return useMutation({
    mutationFn,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.getCourseById] });
    },
  });
};
