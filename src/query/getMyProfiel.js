import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { QueryKey } from "@/constant/query";
import api from "@/lib/axios.js";

export const getMyProfile = () => {
  const token = Cookies.get("token");

  const queryFn = async () => {
    const url = `${import.meta.env.VITE_API_URL}/auth/me`;

    const { data } = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  };

  return useQuery({
    queryKey: [QueryKey.getMyProfile],
    queryFn,
    enabled: Boolean(token),
  });
};
