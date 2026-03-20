import axiosClient from "../api/axiosClient";


// getAllUsers: Fetches a list of all users.
export const getUsers = async () => {
    try {
        const response = await axiosClient.get("/uniadmin/users");