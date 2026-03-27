import axiosClient from '../api/axiosClient';

export async function fetchExamQuestions(degreeId) {
  const encoded = encodeURIComponent(degreeId);
  const response = await axiosClient.get(`/exam/questions/${encoded}`, { timeout: 60000 });
  return response.data;
}

export async function submitExamAnswers({ studentId, degreeId, answers }) {
  const response = await axiosClient.post('/exam/submit', {
    studentId,
    degreeId,
    answers,
  });
  return response.data;
}

export async function calculateExamScore({ studentId, degreeId }) {
  const response = await axiosClient.post('/exam/calculate-score', {
    studentId,
    degreeId,
  });
  return response.data;
}


export async function getApplicantExamDetails(applicationId) {
 
  