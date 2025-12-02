import { useAuthContext } from "../context/AuthContext";

export function useAuthApi() {
  const { publicAxios, privateAxios } = useAuthContext();

  function login(email, password) {
    return publicAxios.post("/tokens", { email, password });
  };

  function logout() {
    return privateAxios.delete("/tokens");
  };

  function reissue() {
    return publicAxios.post("/tokens/reissue");
  };

  function getMyProfile() {
    return privateAxios.get("/users/me");
  };

  return { login, logout, reissue, getMyProfile, };
};
