import axiosClient from "../api/axiosClient";


// getAllDegrees: Fetches a list of all degrees.
export const getIntakes = async () => {
  try {
    const response = await axiosClient.get("/intakes");
    return response.data;
  } catch (error) {
    console.error("Error fetching intakes:", error);
    throw error;
  }
};