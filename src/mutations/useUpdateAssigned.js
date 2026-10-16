import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/constant/query";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import api from "../lib/axios";

export const useUpdateAssigned = (id) => {
  const token = Cookies.get("token");
  const queryClient = useQueryClient();

  const mutationFn = async (payload) => {
    const { data } = await api.patch(
      `/assignment/update-assignment/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data;
  };

  return useMutation({
    mutationFn,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.getUser],
      });

      toast.success("Assinged updated successfully");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to update Assigned",
      );
    },
  });
};
