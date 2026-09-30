import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const useUploadAvatar = (userId) => {
  const token = Cookies.get("token");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();

      formData.append("avatar", file);

      const url = `${import.meta.env.VITE_API_URL}/auth/upload-avatar`;

      const { data } = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getUserById", userId],
      });
    },
  });
};
