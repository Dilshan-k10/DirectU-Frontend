import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.API_BASE_URL, // from .env
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach token automatically
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ❌ Handle errors globally
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;