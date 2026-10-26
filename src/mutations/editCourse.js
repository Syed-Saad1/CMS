import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QueryKey } from "@/constant/query";

import axios from "axios";

import Cookies from "js-cookie";
import api from "@/lib/axios.js";

export const editCourse = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const token = Cookies.get("token");

      const url = `${import.meta.env.VITE_API_URL}/course/update/${id}`;

      const { data } = await api.patch(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QueryKey.getCourseById, id],
      });

      await queryClient.invalidateQueries({
        queryKey: [QueryKey.getCourses],
      });
    },
  });
};
