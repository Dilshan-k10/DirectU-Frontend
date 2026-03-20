import axiosClient, { saveTokens, clearTokens } from "../api/axiosClient";

export const login = async (email, password) => {
  const response = await axiosClient.post("/auth/login", { email, password });
  const { accessToken, refreshToken, data: user } = response.data;
  if (!accessToken || !refreshToken) throw new Error("Invalid login response");
  saveTokens(accessToken, refreshToken, user);
  window.dispatchEvent(new Event("auth:login"));
  return response.data;
};

export const adminRegister = async (name, email, password) => {
  const response = await axiosClient.post("/auth/register", { name, email, password, ro });
  return response.data;
};

export const logout = () => {
  clearTokens();
  window.dispatchEvent(new Event("auth:logout"));
};
