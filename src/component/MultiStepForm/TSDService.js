import authHeader from "../../../../Authorization/auth";
import { emergencyApi } from "../../../../http-common";
import { mastersApi } from "../../http-common";

export const getTariffsDropdownList = async () => {
  return await mastersApi.get(`//masters/tariffs/dropdown`, {
    headers: authHeader(),
  });
};

// The service is utilized for managing ETU Case Sheets and Outpatient Department (OPD) Treatment Records.
export const postEtuCaseSheetAndOPdTR = async (obj) => {
  return await emergencyApi.post(`/etuCaseSheet/save`, obj, {
    headers: authHeader(),
  });
};
// The service is utilized for managing ETU Case Sheets and Outpatient Department (OPD) Treatment Records.
export const putEtuCaseSheetAndOPdTR = async (obj) => {
  return await emergencyApi.put(`/etuCaseSheet/update`, obj, {
    headers: authHeader(),
  });
};

// The service is utilized for managing ETU Case Sheets and Outpatient Department (OPD) Treatment Records.
export const getEtuCaseSheetAndOPdTRById = async (id, ipdOpdFlag) => {
  return await emergencyApi.get(
    `/etuCaseSheet/getEtuCaseSheetById/${id}/${ipdOpdFlag}`,
    {
      headers: authHeader(),
    }
  );
};
