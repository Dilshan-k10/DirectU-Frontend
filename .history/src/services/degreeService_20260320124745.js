import axiosClient from "../api/axiosClient";


// getAllDegrees: Fetches a list of all degrees.
export const getDegrees = async () => {
    try {
      const response = await axiosClient.get("/uniadmin/degrees");
      return response.data.data.degrees;
    } catch (error) {
      console.error("Error fetching degrees:", error);
      throw error;
    }
};
  

// getActiveDegrees: Fetches a list of active degrees.
export const getActiveDegrees = async () => {
  try {
      const response = await axiosClient.get("/uniadmin/degrees?status=active");
      return response.data.data.degrees;
    } catch (error) {