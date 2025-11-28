import { axiosInstance } from "../api/axios";

export const login = async (email, password) => {
  return await axiosInstance.post("/tokens", { email, password });
};

export const logout = async () => {
  return axiosInstance.delete("/tokens");
};

export const getAccessToken = async () => {
  return axiosInstance.post("/tokens/reissue");
};
