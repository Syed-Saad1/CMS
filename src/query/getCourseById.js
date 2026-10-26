import api from "@/lib/axios.js";
import { QueryKey } from "@/constant/query";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const getCourseById = (id) => {
  const token = Cookies.get("token");

  return useQuery({
    queryKey: [QueryKey.getCourseById, id],

    queryFn: async () => {
      const url = `${import.meta.env.VITE_API_URL}/course/${id}`;

      const { data } = await api.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    },

    enabled: Boolean(token && id),
  });
};
