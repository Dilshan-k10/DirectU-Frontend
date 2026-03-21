import axiosClient from "../api/axiosClient";


// getIntakes: Fetches the current active intake.
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

// getAllIntakes: Fetches all intakes.
export const getAllIntakes = async () => {
  try {
    const response = await axiosClient.get("/uniadmin/intakes");
    return response.data.data.intakes;
  } catch (error) {
    console.error("Error fetching all intakes:", error);
    throw error;
  }
};