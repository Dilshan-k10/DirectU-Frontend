import axiosClient from "../api/axiosClient";

// login: Authenticates a user and retrieves a token.
export const login = async (email, password) => {
    try {
        const response = await axiosClient.post("/auth/login", { email, password });
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

// register: Creates a new user account.
export const register = async (name, email, password) => {
    try {
        const response = await axiosClient.post("/auth/register", { name, email, password });
        return response.data;
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
};