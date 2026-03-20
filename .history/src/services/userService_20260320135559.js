import axiosClient from "../api/axiosClient";


// getAllUsers: Fetches a list of all users.
export const getUsers = async () => {
    try {
        const response = await axiosClient.get("/uniadmin/users");
        console.log(response.data.data.users);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

