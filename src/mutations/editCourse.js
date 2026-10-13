// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { QueryKey } from "@/constant/query";
// import axios from "axios";
// import Cookies from "js-cookie";

// export const editCourse = (id) => {
//   const token = Cookies.get("token");
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (payload) => {
//       const url = `${import.meta.env.VITE_API_URL}/update/${id}`;
//       const { data } = await axios.patch(url, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log("payload", payload);
//       return data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: [QueryKey.getCourseById],
//       });

//       queryClient.invalidateQueries({
//         queryKey: [QueryKey.getCourses],
//       });
//     },
//   });
// };

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QueryKey } from "@/constant/query";

import axios from "axios";

import Cookies from "js-cookie";

export const editCourse = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const token = Cookies.get("token");

      const url = `${import.meta.env.VITE_API_URL}/course/update/${id}`;

      console.log("PATCH URL:", url);

      const { data } = await axios.patch(url, payload, {
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
