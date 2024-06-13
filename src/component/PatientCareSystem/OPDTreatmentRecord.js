import { yupResolver } from "@hookform/resolvers/yup";
import { Tooltip } from "@mui/material";
import React, { lazy, useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import CheckBoxField from "../../Common Components/FormFields/CheckBoxField";
import SearchBar from "../../Common Components/FormFields/SearchBar";
import UseCustomLoader from "../../Common Components/Custom Hooks/UseCustomLoader";
import {
  errorAlert,
  successAlert,
} from "../../Common Components/Toasts/CustomToasts";
import {
  HistoryIcon,
  VaccineIcon,
} from "../../Common Components/assets/commonassets/CommonAssets";
import CommonButton from "../common/CommonButton";
import {
  getEtuCaseSheetAndOPdTRById,
  postEtuCaseSheetAndOPdTR,
  putEtuCaseSheetAndOPdTR,
} from "./components/services/ETUCaseSheetService";
import { searchPatientForOpdTreatmentRecord } from "./components/services/OPDTreatmentRecordService";
import { capitalizeStatement } from "../../Common Components/Custom Hooks/CapitalizeStatement";
import CommonHeading from "../../Common Components/Custom Hooks/CommonHeading";

const Advice = lazy(() => import("./components/Advice"));
const Allergies = lazy(() => import("./components/Allergies"));
const Complaints = lazy(() => import("./components/Complaints"));
const Diagnosis = lazy(() => import("./components/Diagnosis"));
const TreatmentGivenInEmergency = lazy(() =>
  import("./components/TreatmentGivenInEmergency")
);
const GeneralExamination = lazy(() =>
  import("./components/GeneralExamination")
);

const InvestigationPathology = lazy(() =>
  import("./components/InvestigationPathology")
);
const InvestigationRadiology = lazy(() =>
  import("./components/InvestigationRadiology")
);
const Medication = lazy(() => import("./components/Medication"));
const MedicoLegalCase = lazy(() => import("./components/MedicoLegalCase"));
const PainAssessmentScale = lazy(() =>
  import("./components/PainAssessmentScale")
);
const PastHistory = lazy(() => import("./components/PastHistory"));
const SpecialInstruction = lazy(() =>
  import("./components/SpecialInstruction")
);
const SurgicalHistory = lazy(() => import("./components/SurgicalHistory"));
const SystemicExamination = lazy(() =>
  import("./components/SystemicExamination")
);

const Vitals = lazy(() => import("./components/Vitals"));

const OPDTreatmentRecord = () => {
  const [allergiesDetails, setAllergiesDetails] = useState([]);
  const [complaintDetails, setComplaintDetails] = useState([]);
  const [diagnosisDetails, setDiagnosisDetails] = useState([]);
  const [mlcRequestDtoList, setMlcRequestDtoList] = useState(null);
  const [generalDetails, setGeneralDetails] = useState(null);
  const [PainScoreDetails, setPainScoreDetails] = useState(null);
  const [pathologyDetails, setPathologyDetails] = useState([]);
  const [radiologyDetails, setRadiologyDetails] = useState([]);
  const [medicationDetails, setMedicationDetails] = useState([]);
  const [isMLCModalOpen, setIsMLCModalOpen] = useState(false);
  const [isAllergiesModalOpen, setIsAllergiesModalOpen] = useState(false);
  const [isComplaintsModalOpen, setIsComplaintsModalOpen] = useState(false);
  const [isMedicationsModalOpen, setIsMedicationsModalOpen] = useState(false);
  const [isDiagnosisModalOpen, setDiagnosisModalOpen] = useState(false);
  const [identificationList, setIdentificationList] = useState([]);
  const [broughtRecordList, setBroughtRecordList] = useState([]);
  const [searchStringList, setSearchStringList] = useState([]);
  const [adviceDetails, setAdviceDetails] = useState([]);
  const [sliderReset, setSliderReset] = useState(0);
  const [painScore, setPainScore] = useState(0);
  const [gcsScore, setGCSScore] = useState(0);
  const [response, setResponse] = useState(null);
  const [mlcId, setMlcId] = useState(0);
  const [pewsScore, setPEWSScore] = useState(0);
  const [etcCaseSheetId, setEtcCaseSheetId] = useState(0);
  const [patientVisitId, setPatientVisitId] = useState(0);

  const defaultValues = {
    isMlc: false,
    temp: 0,
    pulse: 0,
    systolicBp: 0,
    diastolicBp: 0,
    spO2: 0,
    weightCms: 0,
    heightCms: 0,
    bmi: 0,
    respiration: 0,
    bloodSugar: 0,
    rs: "",
    cvs: "",
    pa: "",
    cns: "",
    menstrualHistory: "",
    advice: "",
    specialInstruction: "",
    treatmentInEmergency: "",
    surgicalHistory: "",
    saturationWithO2: 0,
    saturationWithoutO2: 0,
    oxygenPerMin: 0,
    isExpired: false,
    isSelfVisit: false,
    isInformedToPolice: false,
    identificationMark: "",
    isBeing: null,
    patientInDate: new Date(),
    patientInTime: new Date(),
    mlcType: null,
    grievousInjury: "",
    diagnosis: null,
    dDiagnosis: null,
    policeStation: "",
    referredHospitalName: "",
    wardNumber: "",
    policeOfficerName: "",
    batchNumber: "",
    designation: "",
    caseRegDate: new Date(),
    caseRegTime: new Date(),
    probableCauseOfDeath: "",
    expiredTime: new Date(),
    expiredDate: new Date(),
    allergy: null,
    description: "",
    duration: null,
    since: "",
    isUrgent: false,
    chronic: false,
    status: null,
    cDuration: null,
    complaint: null,
    cSince: "",
    motorOptions: 1,
    verbalOptions: 1,
    eyeOpeningOptions: 1,
    totallyUnresponsive: "Totally Unresponsive",
    pleasecallforPICUNICU: "Please call for PICU/NICU for Consultation",
    painScore: "",
    doctorDetails: [{ doctor: null, department: null }],
    asthma: false,
    copd: false,
    dm: false,
    heartDisease: false,
    htn: false,
    true: false,
    liver: false,
    other: false,
    tb: false,
    asthmaDescription: "",
    copdDescription: "",
    description1Description: "",
    dmDescription: "",
    heartDiseaseDescription: "",
    htnDescription: "",
    liverDescription: "",
    otherDescription: "",
    tbDescription: "",
    startDate: new Date(),
    iVFlowRate: "",
    dosage: "",
    quantity: "",
    routes: null,
    durationIn: null,
    mSince: "",
    instruction: null,
    frequency: null,
    machineType: 1,
    rDuration: null,
    medication: null,
    rIsUrgent: false,
    pInvestigation: null,
    pDuration: null,
    pIsUrgent: false,
  };

  const [isMedicoLegalCase, setIsMedicoLegalCase] = useState(false);

  let baseisbringName;
  const schema = yup.object().shape({
    oxygenPerMin: yup.number().nullable(),
    saturationWithoutO2: yup.number().nullable(),
    saturationWithO2: yup.number().nullable(),

    temp: yup.number().max(125, "Invalid").nullable(),
    pulse: yup
      .number()
      .typeError("Invalid")
      .max(500, "Invalid")
      .notRequired()
      .nullable(),

    systolicBp: yup
      .number()
      .typeError("Invalid")
      .max(500, "Invalid")
      .nullable()
      .notRequired(),
    diastolicBp: yup
      .number()
      .typeError("Invalid")
      .max(500, "Invalid")
      .nullable()
      .notRequired(),
    spO2: yup
      .number()
      .typeError("Invalid")
      .max(100, "Invalid")
      .nullable()
      .notRequired(),
    weightCms: yup
      .number()
      .typeError("Invalid")
      .max(500, "Invalid")
      .nullable()
      .notRequired(),
    heightCms: yup
      .number()
      .typeError("Invalid")
      .max(300, "Invalid")
      .nullable()
      .notRequired(),
    bmi: yup.number().typeError("Invalid").max(50, "Invalid").notRequired(),
    respiration: yup
      .number()
      .typeError("Invalid")
      .max(100, "Invalid")
      .nullable()
      .notRequired(),
    bloodSugar: yup
      .number()
      .typeError("Invalid")
      .max(500, "Invalid")
      .nullable()
      .notRequired(),
    allergy: yup
      .object()
      .nullable()
      .when(() => {
        if (isAllergiesModalOpen === true) {
          return yup.object().required();
        }
      }),
    dDiagnosis: yup
      .object()
      .nullable()
      .when(() => {
        if (isDiagnosisModalOpen === true) {
          return yup.object().required();
        }
      }),
    since: yup
      .string()
      .nullable()
      .when(() => {
        if (isDiagnosisModalOpen === true) {
          return yup.string().required();
        }
      }),
    duration: yup
      .object()
      .nullable()
      .when(() => {
        if (isDiagnosisModalOpen === true) {
          return yup.object().required();
        }
      }),
    status: yup
      .object()
      .nullable()
      .when(() => {
        if (isDiagnosisModalOpen === true) {
          return yup.object().nullable().required();
        }
      }),
    chronic: yup
      .boolean()
      .nullable()
      .when(() => {
        if (isDiagnosisModalOpen === true) {
          return yup.boolean().required();
        }
      }),
    cDuration: yup
      .object()
      .nullable()
      .when(() => {
        if (isComplaintsModalOpen === true) {
          return yup.object().required();
        }
      }),
    cSince: yup
      .string()
      .nullable()
      .when(() => {
        if (isComplaintsModalOpen === true) {
          return yup.string().required();
        }
      }),
    complaint: yup
      .object()
      .nullable()
      .when(() => {
        if (isComplaintsModalOpen === true) {
          return yup.object().required();
        }
      }),
  });
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    control,
    watch,
    setValue,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = methods;
  const { fields, append } = useFieldArray({ control, name: "doctorDetails" });
  const isMlc = watch("isMlc");
  useEffect(() => {
    setIsMedicoLegalCase(isMlc);
  }, [isMlc]);

  // const dataArray = [
  //   {
  //     id: 1,
  //     value: "John Doe",
  //     label: "John Doe",
  //   },
  //   {
  //     id: 2,
  //     value: "Jane Smith",
  //     label: "Jane Smith",
  //   },
  //   {
  //     id: 3,
  //     value: " Doe",
  //     label: "John Doe",
  //   },
  //   {
  //     id: 4,
  //     value: "Smith",
  //     label: "Jane Smith",
  //   },
  //   {
  //     id: 5,
  //     value: "Sawant",
  //     label: "Jane Smith",
  //   },
  //   {
  //     id: 6,
  //     value: "Manoj",
  //     label: "Manoj",
  //   },
  //   {
  //     id: 8,
  //     value: "Vaibhav",
  //     label: "Vaibhav",
  //   },
  //   {
  //     id: 13,
  //     value: "Rax",
  //     label: "Jane Rax",
  //   },
  // ];

  const handleInputChange = (autoSearchString) => {
    if (autoSearchString != "") {
      searchPatientForOpdTreatmentRecord(autoSearchString)
        .then((res) => res.data.result)
        .then((res) => {
          setSearchStringList(res);
        })
        .catch((error) => {
          errorAlert(error.message);
        });
    }
  };

  const fetchData = async () => {
    try {
      setResponse({
        showAdvice: true,
        showAllergies: true,
        showComplaints: true,
        showDiagnosis: true,
        showDoctorDepartmentDetails: true,
        showGeneralExaminationMEWS: true,
        showGeneralExaminationPEWS: true,
        showInvestigationPathology: true,
        showInvestigationRadiology: true,
        showMedication: true,
        showMedicoLegalCase: true,
        showPainAssessmentScale: true,
        showPastHistory: true,
        showSpecialInstruction: true,
        showSurgicalHistory: true,
        showSystemicExaminationMEWS: true,
        showSystemicExaminationPEWS: true,
        showVitals: true,
        showPainAssessmentScale: true,
        showGeneralExaminationMEWS: true,
        showSpecialInstruction: true,
        showGeneralExaminationPEWS: true,
        showSpecialInstruction: true,
        showSystemicExaminationMEWS: true,
        showSystemicExaminationPEWS: true,
        showMedication: true,
        showAdvice: true,
        showTreatmentGivenInEmergency: true,
      });
    } catch (error) {
      setResponse(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const autoSelectValue = (autoSelectValue) => {
    if (autoSelectValue?.id !== null && autoSelectValue?.id !== undefined) {
      setPatientVisitId(autoSelectValue?.id);
      getEtuCaseSheetAndOPdTRById(autoSelectValue.id, false)
        .then((res) =>
          res?.data.result ? JSON.parse(res?.data.result) : res?.data.result
        )
        .then((res) => {
          if (res === undefined) {
            reset(defaultValues);
            setIdentificationList([]);
            setMedicationDetails([]);
            setDiagnosisDetails([]);
            setComplaintDetails([]);
            setAllergiesDetails([]);
            setMlcRequestDtoList([]);
            setBroughtRecordList([]);
            setAdviceDetails([]);
            setSliderReset(0);
            setPainScore(0);
            setGCSScore(0);
            setPEWSScore(0);
          } else {
            console.log("newobjnewobj", res);
            setValue("isMlc", res?.isMlc || false);
            setPainScore(res?.painScore === null ? 0 : res?.painScore);
            setSliderReset(res?.painScore);
            setGCSScore(res?.gcsScore);
            setPEWSScore(res?.pews);
            setMlcRequestDtoList([]);
            setEtcCaseSheetId(res?.id ? res?.id : 0);
            setComplaintDetails((mlcRequestDtoList) => {
              if (res && res.mlcDetails) {
                return [...mlcRequestDtoList, res.mlcDetails];
              } else {
                return mlcRequestDtoList;
              }
            });
            const resetValues = res?.patientPastHistory.reduce((acc, item) => {
              if (item.description !== null && item.description !== "") {
                const { type, description } = item;
                acc[type] = true;
                acc[`${type}Description`] = description;
              }
              return acc;
            }, {});
            const list =
              res?.allergiesDetails.reduce((accumulator, data) => {
                accumulator.push({
                  Allergies: data.allergy,
                  id: data.id,
                  "Allergy Description": data.description,
                });
                return accumulator;
              }, []) || [];
            setAllergiesDetails((allergiesDetails) => [
              ...allergiesDetails,
              ...list,
            ]);
            console.log("allergiesDetails", allergiesDetails);

            setComplaintDetails([]);
            const complaintList =
              res?.complaintDetails.reduce((accumulator, data) => {
                accumulator.push({
                  Complaints: data.complaint,
                  id: data.id,
                  Since: `${data.since} ${data.durationIn}`,
                });
                return accumulator;
              }, []) || [];
            setComplaintDetails((complaintDetails) => [
              ...complaintDetails,
              ...complaintList,
            ]);
            console.log("complaintDetails", complaintDetails);

            setDiagnosisDetails([]);
            const diagnosisList =
              res?.diagnosisDetails.reduce((accumulator, data) => {
                accumulator.push({
                  Diagnosis: data.description,
                  id: data.diagnosisId,
                  Since: `${data.since} ${data.duration}`,
                  Status: data.status,
                  "Chronic / NonChronic": data.isChronic,
                });
                return accumulator;
              }, []) || [];
            setDiagnosisDetails((diagnosisDetails) => [
              ...diagnosisDetails,
              ...diagnosisList,
            ]);

            setMedicationDetails([]);
            const prescriptionList = res?.prescriptions
              ? res?.prescriptions.reduce((accumulator, data) => {
                  accumulator.push({
                    id: data?.id,
                    "Drug Type": data.drugType,
                    "Drug Name": data.drugName,
                    Frequency: data.frequency,
                    FrequencyId: 1,
                    Dosage: data.dosage,
                    Instructions: data.instruction,
                    InstructionsId: 1,
                    Duration: `${data.since} ${data.durationIn}`,
                    DurationInId: 1,
                    Quantity: data.quantity,
                    Route: data.route,
                    RouteId: 1,
                    "IV Flow Rate": data.ivFlowRate,
                    "Start Date": data.startDate,
                  });
                  return accumulator;
                }, [])
              : [];

            setMedicationDetails(() => [
              ...medicationDetails,
              ...prescriptionList,
            ]);

            reset({
              isMlc: res?.isMlc || false,
              temp: res?.temp || 0,
              pulse: res?.pulse || 0,
              systolicBp: res?.systolicBp || 0,
              diastolicBp: res?.diastolicBp || 0,
              spO2: res?.spO2 || 0,
              weightCms: res?.weightCms || 0,
              heightCms: res?.heightCms || 0,
              bmi: res?.bmi || 0,
              respiration: res?.respiration || 0,
              bloodSugar: res?.bloodSugar || 0,
              rs: res?.rs || "",
              cvs: res?.cvs || "",
              pa: res?.pa || "",
              cns: res?.cns || "",
              menstrualHistory:
                capitalizeStatement(res?.menstrualHistory) || "",
              treatmentInEmergency:
                capitalizeStatement(res?.treatmentInEmergency) || "",
              surgicalHistory: capitalizeStatement(res?.surgicalHistory) || "",
              isExpired: res?.mlcDetails?.isExpired || false,
              isSelfVisit: res?.mlcDetails?.isSelfVisit || false,
              isInformedToPolice:
                capitalizeStatement(res?.mlcDetails?.isInformedToPolice) || "",
              identificationMark:
                capitalizeStatement(res?.IdentificationMarks?.[0]) || "",
              designation: res?.mlcDetails?.designation,
              caseRegDate: res?.mlcDetails?.caseRegDate
                ? new Date(res?.mlcDetails?.caseRegDate)
                : new Date(),
              caseRegTime: res?.mlcDetails?.caseRegTime
                ? new Date(
                    `${new Date().toISOString().split("T")[0]}T${
                      res?.mlcDetails?.caseRegTime
                    }`
                  )
                : new Date(),
              expiredDate: res?.mlcDetails?.expiredDate
                ? new Date(res?.mlcDetails?.expiredDate)
                : new Date(),
              expiredTime: res?.mlcDetails?.expiredTime
                ? new Date(
                    `${new Date().toISOString().split("T")[0]}T${
                      res?.mlcDetails?.expiredTime
                    }`
                  )
                : new Date(),
              patientInDate: res?.mlcDetails?.patientInDate
                ? new Date(res?.mlcDetails?.patientInDate)
                : new Date(),
              isBeing: res?.mlcDetails?.isBeing || "",
              // patientInDate: res?.mlcDetails?.patientInDate
              //   ? new Date(
              //       res?.mlcDetails?.patientInDate.split("-").reverse().join("-")
              //     )
              //   : new Date(),
              patientInTime: res?.mlcDetails?.patientInTime
                ? new Date(
                    `${new Date().toISOString().split("T")[0]}T${
                      res?.mlcDetails?.patientInTime
                    }`
                  )
                : new Date(),

              saturationWithoutO2: res?.saturationWithoutO2 || 0,
              saturationWithO2: res?.saturationWithO2 || 0,
              oxygenPerMin: res?.oxygenPerMin || 0,
              mlcType: res?.mlcDetails?.mlctypeId
                ? {
                    id: res?.mlcDetails?.mlctypeId,
                    label: capitalizeStatement(res?.mlcDetails?.mlctypeLabel),
                    value: res?.mlcDetails?.mlctypeValue,
                  }
                : null,
              grievousInjury:
                capitalizeStatement(res?.mlcDetails?.grievousInjury) || "",
              diagnosis: res?.mlcDetails?.diagnosis || null,
              batchNumber:
                capitalizeStatement(res?.mlcDetails?.batchNumber) || "",
              policeStation:
                capitalizeStatement(res?.mlcDetails?.policeStation) || "",
              policeOfficerName:
                capitalizeStatement(res?.mlcDetails?.policeOfficerName) || "",
              referredHospitalName:
                capitalizeStatement(res?.mlcDetails?.referredHospitalName) ||
                "",
              wardNumber:
                capitalizeStatement(res?.mlcDetails?.wardNumber) || "",
              ProbableCauseOfDeath:
                capitalizeStatement(res?.ProbableCauseOfDeath) || "",
              asthma: resetValues?.asthma,
              copd: resetValues?.copd,
              dm: resetValues?.dm,
              heartDisease: resetValues?.heartDisease,
              htn: resetValues?.htn,
              true: resetValues?.true,
              liver: resetValues?.liver,
              other: resetValues?.other,
              tb: resetValues?.tb,
              asthmaDescription: resetValues?.asthmaDescription,
              copdDescription: resetValues?.copdDescription,
              description1Description: resetValues?.description1Description,
              dmDescription: resetValues?.dmDescription,
              heartDiseaseDescription: resetValues?.heartDiseaseDescription,
              htnDescription: resetValues?.htnDescription,
              liverDescription: resetValues?.liverDescription,
              otherDescription: resetValues?.otherDescription,
              tbDescription: resetValues?.tbDescription,
            });

            setIdentificationList([]);
            res?.mlcDetails?.identificationMarks.map((data) => {
              setIdentificationList([
                {
                  "Identification Mark": capitalizeStatement(data),
                },
              ]);
            });
            setAdviceDetails([]);
            res?.advice.map((data) => {
              setAdviceDetails([
                {
                  Advice: data,
                },
              ]);
            });
            setBroughtRecordList([]);
            setMlcId(0);
            setMlcId(res?.mlcDetails?.id);
            res?.mlcDetails?.broughtToHospital.map((data) => {
              setBroughtRecordList([
                {
                  "Person Name": capitalizeStatement(data.personNameBroughtBy),
                  Address: capitalizeStatement(data.personAddressBroughtBy),
                  "Mobile Number": data.personMobileBroughtBy,
                },
              ]);
            });
            setMlcRequestDtoList(res?.mlcDetails);
          }
        })
        .catch((error) => {
          errorAlert(error.message);
        });
    } else {
      reset(defaultValues);
      setIdentificationList([]);
      setMedicationDetails([]);
      setDiagnosisDetails([]);
      setComplaintDetails([]);
      setAllergiesDetails([]);
      setMlcRequestDtoList([]);
      setBroughtRecordList([]);
      setAdviceDetails([]);
      setSliderReset(0);
      setPainScore(0);
      setGCSScore(0);
      setPEWSScore(0);
    }
  };

  const [
    temp,
    pulse,
    systolicBp,
    diastolicBp,
    spO2,
    weightCms,
    heightCms,
    respiration,
    bloodSugar,
    bmi,
  ] = watch([
    "temp",
    "pulse",
    "systolicBp",
    "diastolicBp",
    "spO2",
    "weightCms",
    "heightCms",
    "respiration",
    "bloodSugar",
    "bmi",
  ]);

  const onSubmit = async (data) => {
    const [
      asthmaDescription,
      copdDescription,
      dmDescription,
      heartDiseaseDescription,
      htnDescription,
      liverDescription,
      otherDescription,
      tbDescription,
    ] = watch([
      "asthmaDescription",
      "copdDescription",
      "dmDescription",
      "heartDiseaseDescription",
      "htnDescription",
      "liverDescription",
      "otherDescription",
      "tbDescription",
    ]);

    const [saturationWithO2, saturationWithoutO2, oxygenPerMin] = watch([
      "saturationWithO2",
      "saturationWithoutO2",
      "oxygenPerMin",
    ]);

    const pastHistorylisting = [
      { type: "asthma", description: asthmaDescription },
      { type: "copd", description: copdDescription },
      { type: "dm", description: dmDescription },
      { type: "heartDisease", description: heartDiseaseDescription },
      { type: "htn", description: htnDescription },
      { type: "liver", description: liverDescription },
      { type: "other", description: otherDescription },
      { type: "tb", description: tbDescription },
    ];

    const allergiesDetailslist = allergiesDetails.reduce(
      (accumulator, data) => {
        accumulator.push({
          allergy: capitalizeStatement(data.Allergies),
          id: data.id,
          description: data["Allergy Description"],
        });
        return accumulator;
      },
      []
    );

    const complaintDetailsList = complaintDetails.reduce(
      (accumulator, data) => {
        const splitString = data?.Since.split(" ");
        const [number, unit] = splitString;
        accumulator.push({
          complaint: capitalizeStatement(data.Complaints),
          id: data.id,
          since: number,
          durationIn: unit,
        });
        return accumulator;
      },
      []
    );

    const pastHistorylist = pastHistorylisting.reduce((acc, obj) => {
      if (obj.description !== null) {
        if (obj.description !== "") {
          acc.push(obj);
        }
      }
      return acc;
    }, []);

    let tempDiagnosisDetails = diagnosisDetails.map((obj) => {
      const splitString = obj?.Since.split(" ");
      const [number, unit] = splitString;
      return {
        description: capitalizeStatement(obj?.Diagnosis),
        since: number,
        durationIn: unit,
        status: obj?.Status,
        isChronic: obj["Chronic / NonChronic"],
      };
    });

    let prescriptionRequestDto = medicationDetails.map((data) => {
      const splitString = data?.Duration.split(" ");
      const [number, unit] = splitString;

      return {
        id: data?.id,
        code: "string",
        drugId: 0,
        drugType: data["Drug Type"],
        drugName: data["Drug Name"],
        genericDescription: "string",
        quantity: data.Quantity,
        localFrequency: "string",
        frequency: data.Frequency,
        localInstruction: "string",
        instruction: data.Instructions,
        since: number,
        durationIn: unit,
        durationInDays: data.DurationInId,
        route: data["Route"],
        ivFlowRate: data["IV Flow Rate"],
        startDate: data["Start Date"],
        dosage: data["Dosage"],
        onDischargeFlag: true,
        opdIpd: 0,
      };
    });
    const adviceRecordList = adviceDetails.map((data) => {
      return data["Advice"];
    });

    let postObj = {
      patientVisitId: {
        id: patientVisitId,
      },
      id: etcCaseSheetId,
      opdIpd: false,
      isMlc: data?.isMlc,
      temp: Number(temp),
      pulse: Number(pulse),
      systolicBp: Number(systolicBp),
      diastolicBp: Number(diastolicBp),
      spO2: Number(spO2),
      weightCms: Number(weightCms),
      heightCms: Number(heightCms),
      bmi: Number(bmi),
      respiration: Number(respiration),
      bloodSugar: Number(bloodSugar),
      surgicalHistory: capitalizeStatement(data?.surgicalHistory),
      treatmentInEmergency: capitalizeStatement(data?.treatmentInEmergency),
      saturationWithO2: saturationWithO2,
      saturationWithoutO2: saturationWithoutO2,
      oxygenPerMin: oxygenPerMin,
      gcsEye: generalDetails?.gcsEye,
      gcsVerbal: generalDetails?.gcsVerbal,
      gcsMotor: generalDetails?.gcsMotor,
      gcsScore: generalDetails?.gcsScore,
      avpu: 0,
      mews: 0,
      pews: generalDetails?.pews,
      rs: data?.rs,
      cvs: data?.cvs,
      cns: data?.cns,
      menstrualHistory: capitalizeStatement(data?.menstrualHistory),
      pa: data?.pa,
      painScore: PainScoreDetails?.painScore,
      painDescription: PainScoreDetails?.painDescription,
      patientPastHistories: pastHistorylist,
      allergiesDetails: allergiesDetailslist,
      diagnosisDetails: tempDiagnosisDetails,
      mlcRequestDtoList: mlcRequestDtoList,
      complaintDetails: complaintDetailsList,
      advice: adviceRecordList,
      investigationRequestDto: [...pathologyDetails, ...radiologyDetails],
      prescriptionRequestDto: prescriptionRequestDto,
    };
    console.log("postObjOPD123", postObj);
    if (etcCaseSheetId === 0) {
      if (patientVisitId !== 0) {
        postEtuCaseSheetAndOPdTR(postObj)
          .then((res) => {
            if (res.status === 200) {
              successAlert("OPDTreatmentRecord save successfully");
            } else {
              errorAlert("OPDTreatmentRecord can not save successfully");
            }
          })
          .catch((error) => {
            errorAlert(error.message);
          });
      }
    } else {
      if (patientVisitId !== 0) {
        putEtuCaseSheetAndOPdTR(postObj)
          .then((res) => {
            if (res.status === 200) {
              successAlert("  OPDTreatmentRecord Updated successfully");
              reset(defaultValues);
              setSliderReset(0);
              setPainScore(0);
              setGCSScore(0);
              setPEWSScore(0);
            } else {
              errorAlert("OPDTreatmentRecord can not Updated ");
            }
          })
          .catch((error) => {
            errorAlert(error.message);
          });
      }
    }
  };

  const patientData = {
    "Patient Name ": "Surekha Subhash Patil",
    UHID: "SJ/2022/000017",
    Age: "23Y 02M 04D",
    Gender: "FeMale",
    "Bed No": "1234",
    "Arrival Date & Time ": "12/02/2022, 12.30 AM",
    "Doctor Name": "Dr. Jayant Pawar",
  };

  const getAgeInYears = (ageString) => {
    const [years] = ageString.match(/\d+/g);
    return parseInt(years, 10);
  };
  const isPatientAgeBelow14 = getAgeInYears(patientData.Age) < 14;
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          methods.handleSubmit(onSubmit);
        }}
      >
        <h1 className=" flex justify-center  font-semibold ">
          OPD Treatment Record
        </h1>
        {/* {CommonHeading("OPD Treatment Record")} */}
        <div className="flex w-11/12 lg:w-10/12 ml-4 gap-2 items-center mb-2">
          <div className="w-2/5 z-40 ">
            <SearchBar
              name="searchetuCaseSheet"
              dataArray={searchStringList}
              placeholder="Search By UHID, Patient Name, Mobile No"
              label="Search By UHID, Patient Name, Mobile No."
              handleInputChange={handleInputChange}
              onChange={autoSelectValue}
              searchIcon={false}
            />
          </div>
        </div>
        <div className="border rounded shadow-md p-2  sticky top-[68px] bg-slate-100 z-30  ml-3">
          <div className=" grid lg:grid-cols-3   grid-cols-1 md:grid-cols-2   gap-y-4 mx-4 ">
            {Object.entries(patientData).map(([key, value]) => (
              <div key={key} className="flex">
                <p className="font-semibold  text-sm  lg:w-[35%] md:[45%] whitespace-nowrap">
                  {key}
                </p>
                <span className="font-semibold text-13px] mx-2">:</span>
                <p className=" text-sm font-normal whitespace-nowrap">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center my-2 ml-3">
          <div className="flex items-center whitespace-nowrap gap-2">
            <div className="text-black font-roboto text-[15px] font-semibold  whitespace-nowrap">
              Electronic Medical Record
              <span className="text-gray-600 font-roboto text-md font-normal">
                (EMR)
              </span>
            </div>
            <div className="flex">
              <fieldset
                onChange={(e) => {
                  console.log("eee123", e.target.checked);
                  if (e.target.checked === true) {
                    setIsMLCModalOpen(true);
                  }
                  if (isMlc === true && e.target.checked === false) {
                    setIsMLCModalOpen(true);
                    setValue("isMlc", true);
                  }
                }}
              >
                <CheckBoxField
                  name="isMlc"
                  label="Medico legal case"
                  className="whitespace-nowrap"
                  control={control}
                  defaultValue={isMlc?.checked}
                />
              </fieldset>
              <MedicoLegalCase
                mlcRequestDtoList={mlcRequestDtoList}
                isMLCModalOpen={isMLCModalOpen}
                setIsMLCModalOpen={setIsMLCModalOpen}
                setMlcRequestDtoList={setMlcRequestDtoList}
                baseisbringName={baseisbringName}
                identificationList={identificationList}
                setIdentificationList={setIdentificationList}
                broughtRecordList={broughtRecordList}
                setBroughtRecordList={setBroughtRecordList}
                mlcId={mlcId}
                setMlcId={setMlcId}
              />
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <Tooltip title="History" arrow>
              <button className="new Date(text-blue-500  flex justify-end">
                <HistoryIcon />
              </button>
            </Tooltip>
            <Tooltip title="Vaccine" arrow>
              <button className="text-blue-500  flex justify-end">
                <VaccineIcon />
              </button>
            </Tooltip>
            <CommonButton
              onClick={methods.handleSubmit(onSubmit)}
              type="submit"
              label="Complete"
              className="bg-[#4CAF50] text-white"
              disabled={false}
              searchIcon={false}
            />
          </div>
        </div>

        <div className="ml-3 h-auto">
          {response?.showVitals ? (
            <Vitals />
          ) : (
            <UseCustomLoader componentName="Vitals" />
          )}
        </div>
        <div className="ml-3 mt-2 h-auto">
          {response?.showPastHistory ? (
            <PastHistory />
          ) : (
            <UseCustomLoader componentName="Past History" />
          )}
        </div>
        <div className="ml-3 gap-3 my-2 ">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2">
            {response?.showAllergies ? (
              <Allergies
                allergiesDetails={allergiesDetails}
                setAllergiesDetails={setAllergiesDetails}
                isAllergiesModalOpen={isAllergiesModalOpen}
                setIsAllergiesModalOpen={setIsAllergiesModalOpen}
              />
            ) : (
              <UseCustomLoader componentName="Allergies" />
            )}
            {response?.showSurgicalHistory ? (
              <SurgicalHistory heightSH={"h-[228px]"} />
            ) : (
              <UseCustomLoader componentName="Surgical History" />
            )}
          </div>
        </div>
        <div className="ml-3 gap-3 my-2 ">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2">
            {response?.showComplaints ? (
              <Complaints
                complaintDetails={complaintDetails}
                setComplaintDetails={setComplaintDetails}
                isComplaintsModalOpen={isComplaintsModalOpen}
                setIsComplaintsModalOpen={setIsComplaintsModalOpen}
              />
            ) : (
              <UseCustomLoader componentName="Complaints" />
            )}

            {response?.showDiagnosis ? (
              <Diagnosis
                diagnosisDetails={diagnosisDetails}
                setDiagnosisDetails={setDiagnosisDetails}
                isDiagnosisModalOpen={isDiagnosisModalOpen}
                setDiagnosisModalOpen={setDiagnosisModalOpen}
              />
            ) : (
              <UseCustomLoader componentName="Diagnosis" />
            )}
          </div>
        </div>
        <div className="ml-3 gap-3 my-2 ">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2">
            <PainAssessmentScale
              setPainScoreDetails={setPainScoreDetails}
              sliderReset={sliderReset}
              setSliderReset={setSliderReset}
              painScore={painScore}
              setPainScore={setPainScore}
            />
            {response?.showGeneralExaminationMEWS ? (
              <GeneralExamination
                isPatientAgeBelow14={isPatientAgeBelow14}
                setGeneralDetails={setGeneralDetails}
                gcsScore={gcsScore}
                setGCSScore={setGCSScore}
                pewsScore={pewsScore}
                setPEWSScore={setPEWSScore}
              />
            ) : (
              <UseCustomLoader componentName="GeneralExaminationMEWS" />
            )}
          </div>
        </div>
        <div className="ml-3 gap-3 my-2 ">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2">
            {response?.showInvestigationPathology ? (
              <InvestigationPathology
                pathologyDetails={pathologyDetails}
                setPathologyDetails={setPathologyDetails}
              />
            ) : (
              <UseCustomLoader componentName="Pathology" />
            )}
            {response?.showInvestigationRadiology ? (
              <InvestigationRadiology
                radiologyDetails={radiologyDetails}
                setRadiologyDetails={setRadiologyDetails}
              />
            ) : (
              <UseCustomLoader componentName="Radiology" />
            )}
          </div>
        </div>
        <div className="ml-3 h-auto  my-2">
          {isPatientAgeBelow14 ? (
            <SystemicExamination examinationType="PEWS" />
          ) : (
            <SystemicExamination examinationType="MEWS" />
          )}
        </div>
        <div className="ml-3 h-auto  my-2">
          {response?.showMedication ? (
            <Medication
              setIsMedicationsModalOpen={setIsMedicationsModalOpen}
              isMedicationsModalOpen={isMedicationsModalOpen}
              medicationDetails={medicationDetails}
              setMedicationDetails={setMedicationDetails}
            />
          ) : (
            <UseCustomLoader componentName="Medication" />
          )}{" "}
        </div>
        <div className="ml-3 gap-3 my-2 ">
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2">
            {response?.showTreatmentGivenInEmergency ? (
              <TreatmentGivenInEmergency />
            ) : (
              <UseCustomLoader componentName="Advice" />
            )}
            {response?.showAdvice ? (
              <Advice
                adviceDetails={adviceDetails}
                setAdviceDetails={setAdviceDetails}
              />
            ) : (
              <UseCustomLoader componentName="Advice" />
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default OPDTreatmentRecord;
