import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
import CommonTransactionTable from "../../../Common Components/CommonTable/CommonTransactionTable";
import CheckBoxField from "../../../Common Components/FormFields/CheckBoxField";
import DatePickerField from "../../../Common Components/FormFields/DatePickerField";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import InputField from "../../../Common Components/FormFields/InputField";
import TimePickerField from "../../../Common Components/FormFields/TimePickerField";
import { DeleteIcon } from "../../../Common Components/assets/commonassets/CommonAssets";
import CommonButton from "../../../Common Components/commonbutton/CommonButton";
import * as yup from "yup";
import { format } from "date-fns";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import dontAllowOnKeyUpDownSpecialChar from "../../../Common Components/Custom Hooks/dontAllowOnKeyUpDownSpecialChar";
import { capitalizeStatement } from "../../../Common Components/Custom Hooks/CapitalizeStatement";

const MedicoLegalCase = (props) => {
  const {
    isMLCModalOpen,
    setIsMLCModalOpen,
    mlcRequestDtoList,
    setMlcRequestDtoList,
    identificationList,
    setIdentificationList,
    broughtRecordList,
    setBroughtRecordList,
    setMlcId,
    mlcId,
  } = props;

  let { baseisbringName } = props;

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationProps, setConfirmationProps] = useState({});
  const broughtList = [
    {
      name: "personNameBroughtBy",
      label: "Name Of Person",
      value: "",
    },
    {
      name: "personAddressBroughtBy",
      label: "Address",
      value: "",
    },
    {
      name: "personMobileBroughtBy",
      label: "Mobile Number",
      value: "",
    },
  ];
  const policeDetailsList = [
    {
      name: "policeStation",
      label: "Police Station *",
      value: "",
    },
    {
      name: "policeOfficerName",
      label: "Police Officer Name *",
      value: "",
    },
    {
      name: "batchNumber",
      label: "Batch No *",
      value: "",
    },
    {
      name: "designation",
      label: "Designation *",
      value: "",
    },
  ];

  const isBeingList = [
    {
      id: 1,
      value: 1,
      label: "Treated",
    },
    {
      id: 2,
      value: 2,
      label: "LAMA",
    },
    {
      id: 3,
      value: 3,
      label: "DisCharged",
    },
    {
      id: 4,
      value: 4,
      label: "IPD",
    },
    {
      id: 5,
      value: 5,
      label: "OPD",
    },
    {
      id: 6,
      value: 6,
      label: "Referred Hospital Name",
    },
  ];
  const mlcTypeList = [
    {
      id: 1,
      value: "IPD",
      label: "IPD",
    },
    {
      id: 2,
      value: "OPD",
      label: "OPD",
    },
  ];
  const diagnosisList = [
    {
      id: 1,
      value: "IPD",
      label: "IPD",
    },
    {
      id: 2,
      value: "OPD",
      label: "OPD",
    },
  ];

  const {
    control,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const [
    isExpired,
    isSelfVisit,
    isInformedToPolice,
    expireddateValue,
    isbring,
    getWardNumber,
  ] = watch([
    "isExpired",
    "isSelfVisit",
    "isInformedToPolice",
    "expireddateValue",
    "isbring",
    "getWardNumber",
  ]);

  let baseisbringLabel;
  switch (isbring?.label) {
    case "Referred Hospital Name":
      baseisbringLabel = "Referred Hospital Name";
      baseisbringName = "referredHospitalName";
      break;
    case "IPD":
      baseisbringLabel = "Ward No";
      baseisbringName = "wardNumber";
      break;
    default:
      baseisbringLabel = null;
      baseisbringName = "";
  }

  const handleAddIdentification = () => {
    const identificationMark = watch("identificationMark");
    if (identificationMark === "") {
      setError("identificationMark", {
        type: "custom",
        message: "custom message",
      });
    }
    if (identificationMark !== "") {
      setIdentificationList([
        ...identificationList,
        {
          "Identification Mark": capitalizeStatement(identificationMark),
        },
      ]);
      setValue("identificationMark", "");
    }
  };
  const mobileSchema = yup
    .string()
    .min(10)
    .max(14)
    .matches(/^[0-9]+$/)
    .required("Mobile number is required");

  const handleAddBroughtList = () => {
    const [personMobileBroughtBy, personNameBroughtBy, personAddressBroughtBy] =
      watch([
        "personMobileBroughtBy",
        "personNameBroughtBy",
        "personAddressBroughtBy",
      ]);

    function validateField(fieldName, fieldValue) {
      if (fieldValue === "") {
        setError(fieldName, {
          type: "custom",
          message: "custom message",
        });
      }
    }

    validateField("personNameBroughtBy", personNameBroughtBy);
    validateField("personMobileBroughtBy", personMobileBroughtBy);
    validateField("personAddressBroughtBy", personAddressBroughtBy);

    if (
      [
        personNameBroughtBy,
        personMobileBroughtBy,
        personAddressBroughtBy,
      ].every((value) => value !== "") &&
      mobileSchema.validate(personMobileBroughtBy)
    ) {
      setBroughtRecordList([
        ...broughtRecordList,
        {
          "Person Name": capitalizeStatement(personNameBroughtBy),
          Address: capitalizeStatement(personAddressBroughtBy),
          "Mobile Number": personMobileBroughtBy,
        },
      ]);
      setValue("personNameBroughtBy", "");
      setValue("personMobileBroughtBy", "");
      setValue("personAddressBroughtBy", "");
    }
  };

  const handleDelete = (list, index) => {
    setConfirmationProps({
      confirmationMsg: `Are you sure you want to delete?`,
      confirmationButtonMsg: "Delete",
      confirmationLabel: "Confirm Deletion",
      confirmationSubmitFunc: () => {
        confirmDelete(list, index);
        setConfirmationOpen(false);
      },
    });
    setConfirmationOpen(true);
  };

  const confirmDelete = (list, index) => {
    const updatedData = [...list];
    updatedData.splice(index, 1);
    if (list === identificationList) {
      setIdentificationList([...updatedData]);
    } else if (list === broughtRecordList) {
      setBroughtRecordList([...updatedData]);
    }
  };

  const onSubmit = async () => {
    const [
      isExpired,
      isSelfVisit,
      isInformedToPolice,
      identificationMark,
      isBeing,
      patientInDate,
      patientInTime,
      mlcType,
      grievousInjury,
      diagnosis,
      policeStation,
      referredHospitalName,
      wardNumber,
      policeOfficerName,
      batchNumber,
      designation,
      caseRegDate,
      caseRegTime,
      probableCauseOfDeath,
      expiredTime,
      expiredDate,
    ] = watch([
      "isExpired",
      "isSelfVisit",
      "isInformedToPolice",
      "identificationMark",
      "isBeing",
      "patientInDate",
      "patientInTime",
      "mlcType",
      "grievousInjury",
      "diagnosis",
      "policeStation",
      "referredHospitalName",
      "wardNumber",
      "policeOfficerName",
      "batchNumber",
      "designation",
      "caseRegDate",
      "caseRegTime",
      "probableCauseOfDeath",
      "expiredTime",
      "expiredDate",
    ]);

    function extractMlcType(mlcType) {
      return {
        id: mlcType?.id,
      };
    }

    function extractDiagnosis(diagnosisArray) {
      return diagnosisArray?.map((diagnosis) => ({
        id: diagnosis?.id,
        value: diagnosis?.id,
        label: diagnosis?.label,
      }));
    }

    const identificationRecordList = identificationList.map((data) => {
      return data["Identification Mark"];
    });
    const broughtListing = broughtRecordList.map((data) => {
      return {
        personNameBroughtBy: data["Person Name"],
        personAddressBroughtBy: data.Address,
        personMobileBroughtBy: data["Mobile Number"],
      };
    });

    const setErrorIfEmpty = (field, fieldName) => {
      if (!field) {
        setError(fieldName, {
          type: "custom",
          message: "This field is required",
        });
      }
    };

    if (baseisbringName === "referredHospitalName") {
      setErrorIfEmpty(referredHospitalName, "referredHospitalName");
    } else if (baseisbringName === "wardNumber") {
      setErrorIfEmpty(wardNumber, "wardNumber");
    }

    setErrorIfEmpty(mlcType, "mlcType");
    setErrorIfEmpty(grievousInjury, "grievousInjury");

    if (isInformedToPolice) {
      const fields = [
        "batchNumber",
        "policeStation",
        "policeOfficerName",
        "designation",
      ];
      fields.forEach((field) => {
        if (!eval(field)) {
          setError(field, {
            type: "custom",
            message: "This field is required",
          });
        }
      });
    }
    let allFieldsNotEmpty;
    if (isInformedToPolice) {
      allFieldsNotEmpty = [
        batchNumber,
        policeStation,
        policeOfficerName,
        designation,
        grievousInjury,
        mlcType,
      ].every((value) => value !== "");
    }

    if (
      isInformedToPolice
        ? allFieldsNotEmpty
        : [grievousInjury, mlcType].every((value) => value !== "")
    ) {
      clearErrors([
        "personMobileBroughtBy",
        "batchNumber",
        "policeStation",
        "policeOfficerName",
        "designation",
        "grievousInjury",
        "mlcType",
        "referredHospitalName",
        "wardNumber",
      ]);
      setMlcRequestDtoList([]);
      setMlcRequestDtoList({
        id: mlcId ? mlcId : 0,
        isExpired: isExpired,
        isBeing: !isExpired ? isBeing?.value : null,
        isSelfVisit: isSelfVisit,
        mlcType: extractMlcType(mlcType),
        identificationMarks: identificationRecordList,
        broughtToHospital: broughtListing,
        diagnosis: extractDiagnosis(diagnosis),
        grievousInjury: grievousInjury,
        referredHospitalName: !isExpired
          ? baseisbringLabel === "Referred Hospital Name"
            ? capitalizeStatement(referredHospitalName)
            : ""
          : "",
        wardNumber: !isExpired
          ? baseisbringLabel === "IPD"
            ? capitalizeStatement(wardNumber)
            : ""
          : "",
        policeStation: capitalizeStatement(policeStation),
        patientInTime: format(patientInTime, "hh:MM:ss"),
        patientInDate:
          patientInDate !== null ? format(patientInDate, "yyyy-MM-dd") : "",
        policeOfficerName: capitalizeStatement(policeOfficerName),
        batchNumber: batchNumber,
        designation: capitalizeStatement(designation),
        isInformedToPolice: isInformedToPolice,
        caseRegDate:
          caseRegDate !== null ? format(caseRegDate, "yyyy-MM-dd") : "",
        caseRegTime: format(caseRegTime, "hh:MM:ss"),
        expiredDate:
          expiredDate === false ? format(expiredDate, "yyyy-MM-dd") : "",
        expiredTime: format(expiredTime, "hh:MM:ss"),
        probableCauseOfDeath: capitalizeStatement(probableCauseOfDeath),
      });
      setIsMLCModalOpen(false);
    }
  };

  return (
    <div>
      <Modal
        open={isMLCModalOpen}
        aria-labelledby="modal-modal-title"
        className="rounded"
      >
        <Box
          sx={{
            "&::-webkit-scrollbar": {
              width: 7,
              height: 10,
              marginY: "4px",
              overflowY: "auto",
              
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#d1d5db",
              borderRadius: "0.25rem",
              padding: "2px !important",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f8fafc",
              borderRadius: "0.25rem",
              padding: "2px !important",
            },
          }}
          className=" h-[90%] 2xl:h-auto 2xl:w-[70%] w-[70%]  overflow-clip   overflow-y-auto   absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-75 bg-background-paper border bg-white border-gray-300  shadow-md p-4"
        >
          <div>
            <div className=" flex  justify-between">
              <div className="md:mx-2 lg:px-2 font-bold text-gray-700 whitespace-nowrap">
                Medico Legal Case Information
              </div>

              <CancelPresentationIconButton
                onClick={() => {
                  if (mlcRequestDtoList === null) {
                    setValue("isMlc", false);
                    setIsMLCModalOpen(false);
                  } else {
                    setIsMLCModalOpen(false);
                  }
                }}
              />
            </div>
            <div className=" mt-3 mx-4 mb-4">
              <div>
                <fieldset className=" ">
                  <div className="h-[80%]">
                    <div className="pb-2 pl-3 -mt-2 pr-2">
                      <CheckBoxField
                        name="isExpired"
                        label="Expired"
                        className="whitespace-nowrap"
                        control={control}
                        defaultValue={isExpired?.checked}
                      />
                      <div>
                        <p className="font-bold text-sm w-4/12 whitespace-nowrap">
                          Identification Mark
                        </p>
                      </div>
                      <div className=" grid grid-cols-4 gap-2 mt-2">
                        <div className="col-span-2">
                          <InputField
                            name="identificationMark"
                            variant="outlined"
                            label="Identification Mark"
                            error={errors.identificationMark}
                            control={control}
                            dontCapitalize={true}
                          />
                        </div>
                        <div className="col-span-1">
                          <CommonButton
                            onClick={() => {
                              handleAddIdentification();
                            }}
                            label="Add"
                            type="button"
                            className="border border-blue-500 text-blue-500 hover:shadow px-4 py-2 rounded"
                          />
                        </div>
                      </div>
                      <div>
                        {identificationList.length !== 0 ? (
                          <CommonTransactionTable
                            dataResult={identificationList}
                            removeHeaders={["id"]}
                            renderActions={(row, index) => (
                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(identificationList, index)
                                }
                              >
                                <DeleteIcon />
                              </button>
                            )}
                            highlightRow={false}
                            rowBackgroundColor={(row, index) => {
                              return index % 2 === 0
                                ? "bg-gray-300"
                                : "bg-white";
                            }}
                            handleSelectedRow={(row, index) => {
                              console.log(
                                "Selected Row:",
                                row,
                                "Index:",
                                index
                              );
                            }}
                            editableColumns={[""]}
                            SelectCheckbox={false}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-sm whitespace-nowrap">
                          Brought To Hospital
                        </p>
                        <CheckBoxField
                          name="isSelfVisit"
                          label="Self Visit"
                          className="whitespace-nowrap"
                          control={control}
                          defaultValue={isSelfVisit?.checked}
                        />
                      </div>
                      {isSelfVisit !== true ? (
                        <div className="grid items-center grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-2 w-full mt-2 ">
                          {broughtList.map((value, index) => (
                            <div
                              key={index}
                              className="flex justify-between  mb-2"
                            >
                              <div
                                onKeyDown={(e) => {
                                  if (value.name === "personMobileBroughtBy") {
                                    dontAllowOnKeyUpDownSpecialChar(e);
                                  }
                                }}
                              >
                                <div className="w-full">
                                  <InputField
                                    key={index}
                                    dontCapitalize={true}
                                    label={value.label}
                                    name={value.name}
                                    error={errors[value.name]}
                                    setMlcRequestDtoList
                                    variant="outlined"
                                    type={
                                      "personMobileBroughtBy" === value.name
                                        ? "number"
                                        : "text"
                                    }
                                    control={control}
                                    focused={false}
                                    disabled={false}
                                    inputProps={{ maxLength: 20 }}
                                    onKeyDown={(e) => console.log(e.key)}
                                    shrink={true}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                          <div className="-mt-[5px]">
                            <CommonButton
                              label="Add"
                              type="button"
                              onClick={() => {
                                handleAddBroughtList();
                              }}
                              className="border border-blue-500 text-blue-500 hover:shadow px-4 py-2 rounded"
                            />
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <div>
                        {isSelfVisit !== true &&
                        broughtRecordList.length !== 0 ? (
                          <CommonTransactionTable
                            dataResult={broughtRecordList}
                            removeHeaders={["id"]}
                            renderActions={(row, index) => (
                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(broughtRecordList, index)
                                }
                              >
                                <DeleteIcon />
                              </button>
                            )}
                            highlightRow={false}
                            rowBackgroundColor={(row, index) => {
                              return index % 2 === 0
                                ? "bg-gray-300"
                                : "bg-white";
                            }}
                            handleSelectedRow={(row, index) => {
                              console.log(
                                "Selected Row:",
                                row,
                                "Index:",
                                index
                              );
                            }}
                            editableColumns={[""]}
                            SelectCheckbox={false}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        {isExpired ? (
                          <div>
                            <div>
                              <p className="font-bold text-sm whitespace-nowrap">
                                Expired
                              </p>
                            </div>

                            <div className="grid grid-cols-1 mb-2 items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2 w-full mt-2">
                              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-2">
                                <DatePickerField
                                  control={control}
                                  name="expiredDate"
                                  label="Expired Date "
                                  value={new Date()}
                                  size="small"
                                  inputFormat="dd-MM-yyyy"
                                />
                                <TimePickerField
                                  control={control}
                                  className="bg-white"
                                  label="Time"
                                  name="expiredTime"
                                />
                              </div>
                              <div className="sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1">
                                <InputField
                                  name="probableCauseOfDeath"
                                  variant="outlined"
                                  label="Probable Cause of Death"
                                  error={errors.probableCauseOfDeath}
                                  control={control}
                                  dontCapitalize={true}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 mt-2">
                            <div>
                              <p className="font-bold text-sm  whitespace-nowrap">
                                Is Being
                              </p>
                            </div>
                            <div className="w-1/3">
                              <DropdownField
                                control={control}
                                error={errors.isBeing}
                                name="isBeing"
                                placeholder="Is Being *"
                                dataArray={isBeingList}
                                isSearchable={true}
                              />
                            </div>
                            {baseisbringLabel !== null ? (
                              <div className="w-1/3">
                                <InputField
                                  name={baseisbringName}
                                  label={baseisbringLabel}
                                  error={errors[baseisbringName]}
                                  control={control}
                                  dontCapitalize={true}
                                  type="text"
                                />
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-sm  whitespace-nowrap">
                          Patient-In Date & Time
                        </p>
                      </div>
                      <div>
                        <div className="grid grid-cols-1 items-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 w-full mt-2 ">
                          <div className="grid grid-cols-1  sm:grid-cols-1 md:grid-cols-2 gap-2">
                            <DatePickerField
                              name="patientInDate"
                              label="Patient In Date"
                              control={control}
                              defaultValue={null}
                              size="small"
                              inputFormat="dd-MM-yyyy"
                            />
                            <TimePickerField
                              control={control}
                              label="Patient In time"
                              name="patientInTime"
                            />
                          </div>
                          <DropdownField
                            control={control}
                            error={errors.mlcType}
                            name="mlcType"
                            placeholder="MLC Type "
                            dataArray={mlcTypeList}
                            isSearchable={true}
                          />
                          <InputField
                            name="grievousInjury"
                            variant="outlined"
                            label="Grievous Hurt/Head Injury/Burns"
                            error={errors.grievousInjury}
                            control={control}
                            dontCapitalize={true}
                          />
                          <DropdownField
                            control={control}
                            name="diagnosis"
                            placeholder="Diagnosis"
                            dataArray={diagnosisList}
                            isSearchable={true}
                            isMulti={true}
                            isClearable={true}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div>
                          <p className="font-bold text-sm  whitespace-nowrap">
                            Police Officer's Details
                          </p>
                        </div>
                        <div>
                          <CheckBoxField
                            name="isInformedToPolice"
                            label="InFormed"
                            className="whitespace-nowrap"
                            control={control}
                            defaultValue={isInformedToPolice?.checked}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 items-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 w-full mt-2 ">
                        {policeDetailsList.map((value, index) => (
                          <div
                            key={index}
                            className="flex justify-between  mb-2"
                          >
                            <div className="w-full">
                              <InputField
                                key={index}
                                label={value.label}
                                name={value.name}
                                variant="outlined"
                                error={errors[value.name]}
                                type="text"
                                control={control}
                                focused={false}
                                false
                                disabled={false}
                                inputProps={{ maxLength: 20 }}
                                onKeyDown={(e) => console.log(e.key)}
                                shrink={true}
                                dontCapitalize={true}
                              />
                            </div>
                          </div>
                        ))}
                        <div className="grid grid-cols-1 -mt-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2">
                          <DatePickerField
                            name="caseRegDate"
                            label="Reg Case Date"
                            control={control}
                            defaultValue={null}
                            size="small"
                            inputFormat="dd-MM-yyyy"
                          />
                          <TimePickerField
                            control={control}
                            label="Given Time"
                            name="caseRegTime"
                            inputFormat="dd-MM-yyyy"
                          />
                        </div>
                        <div className="text-right -mt-1">
                          <CommonButton
                            label="Save"
                            type="button"
                            className="saveButton bg-customGreen text-white"
                            onClick={() => {
                              onSubmit();
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      <ConfirmationModal
        confirmationOpen={confirmationOpen}
        confirmationHandleClose={() => setConfirmationOpen(false)}
        {...confirmationProps}
      />
    </div>
  );
};

export default MedicoLegalCase;
