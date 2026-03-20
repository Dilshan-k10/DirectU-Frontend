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


// get All qualified applications: Fetches a list of all qualified applications.
export const getQualifiedApplications = async () => {
  try {
    const response = await axiosClient.get("/applications/all/applications");
    const qualifiedApps = response.data.data.filter(app => app.status === "qualified");
    return { data: qualifiedApps, count: qualifiedApps.length };
  } catch (error) {
    console.error("Error fetching qualified applications:", error);
    throw error;
  }
};

// get All not qualified applications: Fetches a list of all not qualified applications.
export const getNotQualifiedApplications = async () => {
  try {
    const response = await axiosClient.get("/applications/all/applications");
    const notQualifiedApps = response.data.data.filter(app => app.status === "not_qualified");
    return { data: notQualifiedApps, count: notQualifiedApps.length };
  } catch (error) {
    console.error("Error fetching not qualified applications:", error);
    throw error;
  }
};


// get All pending test applications: Fetches a list of all pending test applications.
export const getPendingTestApplications = async () => {
  try {
    const response = await axiosClient.get("/applications/all/applications");
    const pendingTestApps = response.data.data.filter(app => app.status === "test_pending");
    return { data: pendingTestApps, count: pendingTestApps.length };
  } catch (error) {
    console.error("Error fetching pending test applications:", error);
    throw error;
  }
};

// get all rejected applications: Fetches a list of all rejected applications.
export const getRejectedApplications = async () => {
  try {
    const response = await axiosClient.get("/applications/all/applications");
    const rejectedApps = response.data.data.filter(app => app.status === "rejected");
    return { data: rejectedApps, count: rejectedApps.length };
  } catch (error) {
    console.error("Error fetching rejected applications:", error);
    throw error;
  }
};


// get number of 