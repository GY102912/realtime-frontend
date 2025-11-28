import { axiosInstance } from "../api/axios";

export const checkEmailAvailability = (email) => {
  return axiosInstance.get("/users/emails/availability", {
    params: { email },
  });
};

export const checkNicknameAvailability = (nickname) => {
  return axiosInstance.get("/users/nicknames/availability", {
    params: { nickname },
  });
};

export const uploadProfileImage = (formData) => {
  return axiosInstance.post("/files/profile-images", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const signup = (email, password, nickname, profileImageUrl) => {
  return axiosInstance.post("/users", {
    email,
    password,
    nickname,
    profileImageUrl,
  });
};

export const signout = () => {
  return axiosInstance.delete("/users/me");
};

export const getMyProfile = () => {
  return axiosInstance.get("/users/me");
};

export const editMyProfile = (nickname, profileImageUrl) => {
  return axiosInstance.patch("/users/me", {
    nickname,
    profileImageUrl,
  });
};

export const updatePassword = (oldPassword, newPassword) => {
  return axiosInstance.put("/users/me/password", {
    oldPassword,
    newPassword,
  });
};
