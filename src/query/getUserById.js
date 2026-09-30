import { QueryKey } from "@/constant/query";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const getUserById = (id) => {
  const token = Cookies.get("token");

  const queryfn = async () => {
    const url = `${import.meta.env.VITE_API_URL}/auth/me/${id}`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  };

  return useQuery({
    queryKey: [QueryKey.getUserById, id],

    queryFn: queryfn,

    enabled: Boolean(token && id),
  });
};
