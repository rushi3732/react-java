import authHeader from "../../../../Authorization/auth";
import { emergencyApi } from "../../../../http-common";

export const searchPatientForOpdTreatmentRecord = async (searchString) => {
  return await emergencyApi.get(
    `/etuCaseSheet/searchPatientForOpdTreatmentRecord/${searchString}`,
    {
      headers: authHeader(),
    }
  );
};
