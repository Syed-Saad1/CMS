import api from "@/lib/axios.js";
import { QueryKey } from "@/constant/query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const deleteCourse = () => {
  const token = Cookies.get("token");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      if (!id) {
        throw new Error("Course ID is required");
      }

      const url = `${import.meta.env.VITE_API_URL}/course/delete/${id}`;

      const { data } = await api.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.getCourses],
      });
    },
  });
};
