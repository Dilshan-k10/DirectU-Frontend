import axiosClient from "../api/axiosClient";


// getAllDegrees: Fetches a list of all degrees.
export const getDegrees = async () => {
    try {
      const response = await axiosClient.get("uniadmin/degrees");
      return response.data;
    } catch (error) {
      console.error("Error fetching degrees:", error);
      throw error;
    }
  };