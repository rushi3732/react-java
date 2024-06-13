import authHeader from "../../../../Authorization/auth";
import {
  emergencyApi,
  ipdApi,
  mastersApi,
  reportsApi,
} from "../../../../http-common";

export const searchPatientForEtuCaseSheet = async (searchString) => {
  return await emergencyApi.get(
    `/etuCaseSheet/searchPatientForEtuCaseSheet/${searchString}`,
    {
      headers: authHeader(),
    }
  );
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

export const getSystemDate = () => {
  return mastersApi.get(`/getDate`, { headers: authHeader() });
};

//Search Patient
export const getSearchPatientList = (searchKey, unitId, opdipd) => {
  return emergencyApi.get(
    `/searchPatientForEmr/${searchKey}/${unitId}/${opdipd}`,
    {
      headers: authHeader(),
    }
  );
};

// Vitals
//Vitas Chart Details
export const getIPDChartDetails = (patientId) => {
  return ipdApi.get(
    `/patientassessment/getPatientVitalsChart?patientId=${patientId}`,
    {
      headers: authHeader(),
    }
  );
};

//Allergies
//Allergies Types
export const getAllergies = (searchkey) => {
  return mastersApi.get(`/allergy/search/${searchkey}`, {
    headers: authHeader(),
  });
};

//Complaints
//Complaint List
export const getComplaints = (searchkey) => {
  return mastersApi.get(`/complaints/search/${searchkey}`, {
    headers: authHeader(),
  });
};

//Diagnosis
//ICD code List
export const getICDCode = (departmentId, searchkey) => {
  return mastersApi.get(
    `/icdCode/search?departmentId=${departmentId}&searchString=${searchkey}`,
    {
      headers: authHeader(),
    }
  );
};

//Surgery Details
//Surgeon List
export const getSurgeon = () => {
  // console.log(departmentId);
  return mastersApi.get(`/employees/surgeonDropdown`, {
    headers: authHeader(),
  });
};

//Surgery List
export const getSurgeryList = (departmentId, searchkey) => {
  return mastersApi.get(
    `/surgerydetails/searchForEmr?departmentId=${departmentId}&searchString=${searchkey}`,
    {
      headers: authHeader(),
    }
  );
};

//Prescription
//Drug Name List
export const getDrugName = (type, searchkey) => {
  return mastersApi.get(
    `/item/searchdrugsforprescription/${type}/${searchkey}`,
    {
      headers: authHeader(),
    }
  );
};

//Instruction List
export const getInstruction = (searchkey) => {
  return mastersApi.get(`/instructions/search/${searchkey}`, {
    headers: authHeader(),
  });
};

//Frequency List
export const getFrequency = () => {
  return mastersApi.get(`/frequency/dropdown`, {
    headers: authHeader(),
  });
};

//Doses
export const getDoses = () => {
  return mastersApi.get(`/dose/dropdown`, { headers: authHeader() });
};

//Route List
export const getRoute = () => {
  return mastersApi.get(`/route/dropdown`, {
    headers: authHeader(),
  });
};

//Doctor Details
//Department
export const getDepartment = () => {
  return mastersApi.get(`/departments/dropdown/1`, {
    headers: authHeader(),
  });
};

//Doctor List
export const getDoctors = (departmentId) => {
  return mastersApi.get(`/employees/dropdown/${departmentId}`, {
    headers: authHeader(),
  });
};

//Investigation Pathology
export const getPathologyInvestigations = () => {
  return ipdApi.get(`/tests/testDropdown/Pathology`, {
    headers: authHeader(),
  });
};
//Investigation Radiology
export const getRadiologyInvestigations = () => {
  return ipdApi.get(`/tests/testDropdown/Radiology`, {
    headers: authHeader(),
  });
};

//Pain Assessment
//Save Pain Score
export const savePainScore = (painScoreDetails) => {
  return ipdApi.post(
    `/patientassessment/savePatientPainAssessment`,
    painScoreDetails,
    { headers: authHeader() }
  );
};

//Get Pain Score List
export const getPainScoreDetails = (visitId) => {
  return ipdApi.get(
    `/patientassessment/getPatientPainAssessment?visitId=${visitId}`,
    { headers: authHeader() }
  );
};
//Delete Pain Score
export const deletePainScore = (deleteId) => {
  return ipdApi(`/patientassessment/deletePainAssessment/${deleteId}`, {
    headers: authHeader(),
  });
};

//Get Patient Details And Visit List in ETU//
export const getPatientDetailsAndVisitList = (patientId, emergencyId) => {
  return ipdApi(
    `/etu/getPatientInfoForEtu?emergencyId=${emergencyId}&patientId=${patientId}`,
    { headers: authHeader() }
  );
};

//API to get Details of Previous Visits
export const getPreviousVisitsData = (visitId) => {
  return ipdApi(
    `/patientipdemr/getPatientAssessmentDetails?visitId=${visitId}`,
    { headers: authHeader() }
  );
};

//API to get Details of Previous VisitsBased on Selected Visit List
export const getDetailsByVisitNumberList = (visitNumberList) => {
  return ipdApi.get(
    `/patientipdemr/getAllPatientAssessmentDetails`,
    visitNumberList,
    {
      headers: authHeader(),
    }
  );
};

//Pathology Print
export const getAllPathologyReports = (visitId) => {
  return reportsApi.get(
    `/generatePdf/pathologylabreports?patientVisitId=${visitId}`
  );
};

//Radiology Print
export const getAllRadiologyReports = (visitId) => {
  return reportsApi.get(
    `/generatePdf/radiologylabreports?patientVisitId=${visitId}`
  );
};

//Chips for Allergies
export const getAllergiesChips = () => {
  return mastersApi.get(`/allergy/getAllergies`, {
    headers: authHeader(),
  });
};

//Chips for Compalints
export const getComplaintsChips = () => {
  return mastersApi.get(`/complaints/getComplaints`, {
    headers: authHeader(),
  });
};

//Get MLC Details
export const getMlcDetails = (visitId) => {
  return ipdApi.get(`/emergency/getMclInfo?patientVisitId=${visitId}`, {
    headers: authHeader(),
  });
};

//Investigation API
//Investigation Dropdown List
export const getInvestigationList = (investigationObj) => {
  return mastersApi.get(
    `/tests/opdinvestigations?departmentId=${investigationObj.departmentId}&searchString=${investigationObj.searchString}&testTypeId=${investigationObj.testTypeId}`,
    {
      headers: authHeader(),
    }
  );
};

//Alernative Medication Services
export const getSearchedDrugList = (
  searchKey,
  prescriptionType,
  storeId,
  unitId
) => {
  return mastersApi(
    `/item/searchdrugsforpharmacy/${prescriptionType}/${searchKey}/${storeId}/${unitId}`,
    {
      headers: authHeader(),
    }
  );
};
export const getAlternativeDrugList = (selectedDrugId) => {
  return mastersApi.get(`/item/getdrugsbygenericid/${selectedDrugId}`, {
    headers: authHeader(),
  });
};


