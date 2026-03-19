import axiosClient from '../api/axiosClient';

export async function getApplicationResult(applicationId) {
  if (!applicationId) throw new Error('Missing applicationId');
  try {
    const response = await axiosClient.get(`/evaluation/${encodeURIComponent(applicationId)}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function reconsiderApplication(applicationId, newProgramId) {
  if (!applicationId) throw new Error('Missing applicationId');
  if (!newProgramId) throw new Error('Missing newProgramId');
  try {
    const response = await axiosClient.put(`/evaluation/${encodeURIComponent(applicationId)}/selected-program`, {
      programId: newProgramId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}