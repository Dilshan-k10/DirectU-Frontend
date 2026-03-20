import axiosClient from "../api/axiosClient";

// getAllApplicants: Fetches a list of all Applicants.
export const getDegrees = async () => {
    try {
      const response = await axiosClient.get("/uniadmin/applicants");
      return response.data.data.degrees;
    } catch (error) {
      console.error("Error fetching degrees:", error);
      throw error;
    }
  };