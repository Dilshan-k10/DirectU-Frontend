import axiosClient from '../api/axiosClient';

export async function getApplicationResult(applicationId) {
  if (!applicationId) throw new Error('Missing applicationId');
  const response = await axiosClient.get(`/evaluation/${encodeURIComponent(applicationId)}`);
  return response.data;
}

export async function reconsiderApplication(applicationId, newProgramId) {
  if (!applicationId) throw new Error('Missing applicationId');
  if (!newProgramId) throw new Error('Missing newProgramId');
  const response = await axiosClient.put(`/evaluation/${encodeURIComponent(applicationId)}/selected-program`, {
    programId: newProgramId,
  });
  return response.data;
}


// ------------------------------------------------------------Dilshan------------------------------------------------------------


export const submitApplication = async (programId, intakeId, document) => {
  const formData = new FormData();
  formData.append("programId", programId);
  formData.append("intakeId", intakeId);
  formData.append("document", document);
  const response = await axiosClient.post("/applications/apply", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};


// getAllApplications: Fetches a list of all applications.
export const getApplications = async () => {
  try {
    const response = await axiosClient.get("/applications/all/applications");
    return { data: response.data};
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw error;
  }
};

