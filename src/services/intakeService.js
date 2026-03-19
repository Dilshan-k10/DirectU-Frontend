import axiosClient from "../api/axiosClient";


// getIntakes: Fetches a list of all intakes.
export const getIntakes = async () => {
  try {
    const response = await axiosClient.get("/uniadmin/intakes");
    const intakes = response.data.data.intakes;
    return intakes.find((i) => i.status === "Active") || null;
  } catch (error) {
    console.error("Error fetching intakes:", error);
    throw error;
  }
};