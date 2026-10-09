import api from "@/lib/axios.js";
import { QueryKey } from "@/constant/query";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const getAllCourses = () => {
  const token = Cookies.get("token");
  const queryfn = async () => {
    const { data } = await api.get("/course/courses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  };
  return useQuery({
    queryFn: queryfn,
    queryKey: [QueryKey.getCourses],
    enabled: !!token,
  });
};
