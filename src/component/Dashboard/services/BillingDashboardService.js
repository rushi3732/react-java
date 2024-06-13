// import authHeader from "../../../authentication/authservices/auth-header";
// import { ipdApi, mastersApi } from "../../../http-common";

export const getPatientSurvey = async (searchString) => {
  return await get(`user-service/dashboard/getPatientSurvey/${searchString}`);
};

export const getSearchedDiagnosis = (searchString) => {
  return get(`/user-service/dashboard/getPatientSurvey/{searchString}`);
};


// //Get MLC Details
// export const getMlcDetails = (visitId) => {
//   return ipdApi.get(`/emergency/getMclInfo?patientVisitId=${visitId}`, {
//     headers: authHeader(),
//   });
// };

// //Update MLC Details API
// export const updateMlcDetails = (updatedMlcData) => {
//   return ipdApi.put(`/emergency/updateMclInfo`, updatedMlcData, {
//     headers: authHeader(),
//   });
// };