import api from "@/lib/axios.js";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const googleLogin = async (credential) => {
  const response = await api.post(`${API_BASE_URL}/auth/google`, {
    credential,
  });

  return response.data;
};
