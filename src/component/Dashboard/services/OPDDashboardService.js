import authHeader from "../../../Authorization/auth";
import { opdApi, uApi, userServiceApi } from "../../../http-common";

export const getPatientSurvey = async (id) => {
  return await userServiceApi.get(`/dashboard/getPatientSurvey/${id}`, {
    headers: authHeader(),
  });
};
export const getDoctorStatusList = async (id) => {
  return await userServiceApi.get(`/dashboard/getDoctorStatusList/${id}`, {
    headers: authHeader(),
  });
};

export const getCustomerSatisfactionCount = async (id) => {
  return await userServiceApi.get(
    `/dashboard/getCustomerSatisfactionCount/${id}`,
    {
      headers: authHeader(),
    }
  );
};
export const getDashboardCount = async (id) => {
  return await userServiceApi.get(`/dashboard/getDashboardCount/${id}`, {
    headers: authHeader(),
  });
};

export const postAppointmentList = async (obj) => {
  return await opdApi.post(`/appointment/appointmentList`, obj, {
    headers: authHeader(),
  });
};
