import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { QueryKey } from "@/constant/query";

export const getMyProfile = () => {
  const token = Cookies.get("token");

  const queryFn = async () => {
    const url = `${import.meta.env.VITE_API_URL}/auth/me`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("MY PROFILE API:", data);

    return data;
  };

  return useQuery({
    queryKey: [QueryKey.getMyProfile],
    queryFn,
    enabled: Boolean(token),
  });
};
