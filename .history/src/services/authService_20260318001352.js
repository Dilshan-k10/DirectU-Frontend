import axiosClient from "../api/axiosClient";

// login: Authenticates a user and retrieves a token.
export const login = async (email, password) => {
    try {
        