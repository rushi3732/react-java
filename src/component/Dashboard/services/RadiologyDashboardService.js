import authHeader from "../../../Authorization/auth";
import { limsApi, mastersApi, userServiceApi } from "../../../http-common";

export const postRadiologyProcedureQueueList = async (obj) => {
  return await limsApi.post(
    `/patientinvestigations/radiologyProcedureQueueList/`,
    obj,
    {
      headers: authHeader(),
    }
  );
};
export const postFilterwiseworkorderslist = async (obj) => {
  return await limsApi.post(`/workorders/filterwiseworkorderslist/`, obj, {
    headers: authHeader(),
  });
};

export const postRadiologyDashboardCount = async (obj) => {
  return await limsApi.post(
    `/patientinvestigations/radiologyDashboardCount`,
    obj,
    {
      headers: authHeader(),
    }
  );
};

export const getfilterwiseworkorderslist = async (obj) => {
  return await mastersApi.get(`/categories/search/${obj}`, {
    headers: authHeader(),
  });
};

export const getCategoryWisePerformedTestDetails = async (categoryId) => {
  return await limsApi.get(
    `/patientinvestigations/categoryWisePerformedTestDetails?categoryId=${categoryId}`,
    {
      headers: authHeader(),
    }
  );
};
export const getDoctorStatusList = async (obj) => {
  return await userServiceApi.get(`/dashboard/getDoctorStatusList/${obj}`, {
    headers: authHeader(),
  });
};

export const getRadiologyDashboardDayWiseGraphCounts = async (unitId) => {
  return await limsApi.get(
    `/patientinvestigations/radiologyDashboardDayWiseGraphCount?unitId=${unitId}`,
    {
      headers: authHeader(),
    }
  );
};

export const getradiologyDashboardGraphCounts = async () => {
  return await limsApi.get(
    `/patientinvestigations/radiologyDashboardGraphCounts`,
    {
      headers: authHeader(),
    }
  );
};

