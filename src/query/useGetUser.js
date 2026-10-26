import api from "@/lib/axios.js";
import { QueryKey } from "@/constant/query";
import { useQuery } from "@tanstack/react-query";

import Cookies from "js-cookie";

export const useGetUser = () => {
  const token = Cookies.get("token");
  const queryfn = async () => {
    const url = `${import.meta.env.VITE_API_URL}/auth/users`;
    const { data } = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  };
  return useQuery({
    queryKey: [QueryKey.getUser],
    queryFn: queryfn,
    enabled: !!token,
  });
};
