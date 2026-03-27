import axiosClient, { saveUser, clearUser } from "../api/axiosClient";

export const login = async (email, password) => {
  try {
    const response = await axiosClient.post("/auth/login", { email, password });
    const { data: user } = response.data;
    saveUser(user);
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
  const { data: user } = response.data;
  saveUser(user);
  window.dispatchEvent(new Event("auth:login"));
  return response.data;
} catch (error) {
  console.log('Register error detail:', error.response?.data);
    throw error;
  }

};

export const adminRegister = async (name, email, password) => {
  try {
    const response = await axiosClient.post("/auth/register", { name, email, password, role: "ADMIN" });
    const { data: user } = response.data;
    saveUser(user);
    window.dispatchEvent(new Event("auth:login"));
    return response.data;
  } catch (error) {
    console.log('Register error detail:', error.response?.data);
    throw error;
  }
};

export const logout = () => {
  clearUser();
  window.dispatchEvent(new Event("auth:logout"));
};
