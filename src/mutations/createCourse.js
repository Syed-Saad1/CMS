import { QueryKey } from "@/constant/query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const createCourse = () => {
  const token = Cookies.get("token");
  const queryClient = useQueryClient();

  const mutationFn = async (courseData) => {
    const url = `${import.meta.env.VITE_API_URL}/course/create`;
    const { data } = await axios.post(url, courseData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  };

  return useMutation({
    mutationFn,

    onSuccess: () => {
      // 3. Force-refresh the active course list query.
      // Replace 'QueryKey.courseList' with your actual course list query key constant!
      queryClient.invalidateQueries({ queryKey: [QueryKey.getCourses] });
    },
  });
};
