import ax

export const getIntakes = async () => {
  try {
    const response = await get("/intakes");
    return response.data;
  } catch (error) {
    console.error("Error fetching intakes:", error);
    throw error;
  }
};