import axiosClient, { saveTokens, clearTokens } from "../api/axiosClient";

export const login = async (email, password) => {
  const response = await axiosClient.post("/auth/login", { email, password });
  const { accessToken, refreshToken, data: user } = response.data;
  saveTokens(accessToken, refreshToken, user);
  return response.data;
};

export const register = async (name, email, password) => {
  const response = await axiosClient.post("/auth/register", { name, email, password });
  return response.data;
};

export const logout = () => {
  clearTokens();
  window.location.href = "/login";
};
