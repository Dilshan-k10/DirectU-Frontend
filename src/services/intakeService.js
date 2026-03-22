import axiosClient from "../api/axiosClient";

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

export const createIntake = async (intakeData) => {
  try {
    const response = await axiosClient.post("/uniadmin/intakes", intakeData);
    return response.data.data.intake;
  } catch (error) {
    console.error("Error creating intake:", error);
    throw error;
  }
};

export const updateIntake = async (intakeId, intakeData) => {
  try {
    const response = await axiosClient.put(`/uniadmin/intakes/${intakeId}`, intakeData);
    return response.data.data.intake;
  } catch (error) {
    console.error("Error updating intake:", error);
    throw error;
  }
};