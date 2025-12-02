import { useAuthContext } from "../context/AuthContext";

export function useUserApi() {
  const { publicAxios, privateAxios } = useAuthContext();

  const checkEmailAvailability = (email) => {
    return publicAxios.get("/users/emails/availability", {
      params: { email },
    });
  };

  const checkNicknameAvailability = (nickname) => {
    return publicAxios.get("/users/nicknames/availability", {
      params: { nickname },
    });
  };

  const uploadProfileImage = (formData) => {
    return publicAxios.post("/files/profile-images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const signup = (email, password, nickname, profileImageUrl) => {
    return publicAxios.post("/users", {
      email,
      password,
      nickname,
      profileImageUrl,
    });
  };

  const signout = () => {
    return privateAxios.delete("/users/me");
  };

  const editMyProfile = (nickname, profileImageUrl) => {
    return privateAxios.patch("/users/me", {
      nickname,
      profileImageUrl,
    });
  };

  const updatePassword = (oldPassword, newPassword) => {
    return privateAxios.put("/users/me/password", {
      oldPassword,
      newPassword,
    });
  };

  return {
    checkEmailAvailability, 
    checkNicknameAvailability,
    uploadProfileImage,
    signup, 
    signout,
    editMyProfile, 
    updatePassword,
  };
}
