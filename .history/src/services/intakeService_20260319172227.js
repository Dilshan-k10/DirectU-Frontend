import axiosClient from "../api/axiosClient";


// getIntakes: Fetches a list of all intakes.
export const getIntakes = async () => {
  try {
    const response = await axiosClient.get("/intakes");
    return response.data;
  } catch (error) {
    console.error("Error fetching intakes:", error);
    throw error;
  }
};