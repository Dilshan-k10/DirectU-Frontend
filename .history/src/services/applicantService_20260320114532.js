import axiosClient from "../api/axiosClient";

// getAllApplicants: Fetches a list of all Applicants.
export const getApplicants = async () => {
    try {
        const response = await axiosClient.get("/uniadmin/applicants");
        console.log(response.data.data.applicants);
        return response.data.data.applicants;
        
    } catch (error) {
      console.error("Error fetching applicants:", error);
      throw error;
    }
};
  

export const getApplicants = async () => {
  const response = await axiosClient.get('/applications');
  return response.data;
};
