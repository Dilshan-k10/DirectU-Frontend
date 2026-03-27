import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // send cookies automatically
});

// On 401, attempt silent refresh then retry original request
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosClient(original))
          .catch((err) => Promise.reject(err));
      }

      original._retry = true;
      isRefreshing = true;

      try {
        console.log("[Auth] 401 detected, attempting token refresh...");
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        console.log("[Auth] Token refreshed successfully, retrying...");
        processQueue(null);
        return axiosClient(original);
      } catch (refreshError) {
        console.log("[Auth] Refresh failed:", refreshError.response?.data ?? refreshError.message);
        processQueue(refreshError, null);
        clearUser();
        window.dispatchEvent(new Event("auth:logout"));
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const saveUser = (user) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};

export const clearUser = () => {
  sessionStorage.removeItem("user");
};

export const getUser = () => {
  try {
    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export default axiosClient;
