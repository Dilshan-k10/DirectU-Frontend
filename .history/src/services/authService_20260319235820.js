import axiosClient, { saveTokens, clearTokens } from "../api/axiosClient";

export const login = async (email, password) => {
  try {
    const response = await axiosClient.post("/auth/login", { email, password });
    const { accessToken, refreshToken, data: user } = response.data;
    if (!accessToken || !refreshToken) throw new Error("Invalid login response");
    saveTokens(accessToken, refreshToken, user);
    window.dispatchEvent(new Event("auth:login"));
    return response.data;
  }catch (error) {
    console.log('Login error detail:', error.response?.data);
    throw error;
  }
};

export const userRegister = async (name, email, password, role) => {
  try {
  const response = await axiosClient.post("/auth/register", { name, email, password, role });
  const { accessToken, refreshToken, data: user } = response.data;
  if (!accessToken || !refreshToken) throw new Error("Invalid register response");
  saveTokens(accessToken, refreshToken, user);
  window.dispatchEvent(new Event("auth:login"));
  return response.data;
} catch (error) {
  console.log('Register error detail:', error.response?.data);
    throw error;
  }
  
  

};

export const logout = () => {
  clearTokens();
  window.dispatchEvent(new Event("auth:logout"));
};
