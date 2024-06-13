import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Modal } from "@mui/material";
import { useFormContext } from "react-hook-form";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
import CommonTransactionTable from "../../../Common Components/CommonTable/CommonTransactionTable";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import { capitalizeStatement } from "../../../Common Components/Custom Hooks/CapitalizeStatement";
import CheckBoxField from "../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import InputField from "../../../Common Components/FormFields/InputField";
import { warningAlert } from "../../../Common Components/Toasts/CustomToasts";
import {
  DeleteIcon,
  EditIcon,
} from "../../../Common Components/assets/commonassets/CommonAssets";
import CommonButton from "../../../Common Components/commonbutton/CommonButton";
import { getICDCode } from "./services/ETUCaseSheetService";

const Diagnosis = (props) => {
  const {
    diagnosisDetails,
    setDiagnosisDetails,
    isDiagnosisModalOpen,
    setDiagnosisModalOpen,
  } = props;

  const [selectedChip, setSelectedChip] = useState(null);
  const [selectedSince, setSelectedSince] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationProps, setConfirmationProps] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [index, setIndex] = useState();
  const inputRef = useRef(null);
  const [complaintsList, setComplaintsList] = useState();
  const [diagnosisSince] = useState([
    { id: 1, value: "1 Days" },
    { id: 2, value: "2 Days" },
    { id: 3, value: "3 Days" },
    { id: 4, value: "4 Days" },
    { id: 5, value: "5 Days" },
    { id: 6, value: "7 Days" },
    { id: 7, value: "1 Week" },
    { id: 8, value: "15 Days" },
    { id: 9, value: "1 Month" },
    { id: 10, value: "6 Month" },
    { id: 11, value: "1 Year" },
    { id: 12, value: "2 Years" },
  ]);

  const [chips, setChips] = useState([
    {
      id: 1,
      label: "Cold",
      value: "cold",
    },
    {
      id: 2,
      label: "Flu",
      value: "flu",
    },
    {
      id: 3,
      label: "Migraine",
      value: "migraine",
    },
    {
      id: 4,
      label: "Allergies",
      value: "allergies",
    },
    {
      id: 5,
      label: "Sore throat",
      value: "sore_throat",
    },
    {
      id: 6,
      label: "Back pain",
      value: "back_pain",
    },
    {
      id: 7,
      label: "Stomach flu",
      value: "stomach_flu",
    },
    {
      id: 8,
      label: "Sinus infection",
      value: "sinus_infection",
    },
  ]);

  const {
    setValue,
    watch,
    trigger,
    clearErrors,
    control,
    formState: { errors },
  } = useFormContext();

  const [duration, since, status, dDiagnosis, chronic] = watch([
    "duration",
    "since",
    "status",
    "dDiagnosis",
    "chronic",
  ]);

  const statusList = [
    { id: 1, value: "Provisional", label: "Provisional" },
    { id: 2, value: "Final", label: "Final" },
  ];

  const durationPeriod = [
    {
      id: 1,
      value: since > 1 ? "Days" : "Day",
      label: since > 1 ? "Days" : "Day",
    },
    {
      id: 2,
      value: since > 1 ? "Months" : "Month",
      label: since > 1 ? "Months" : "Month",
    },
    {
      id: 3,
      value: since > 1 ? "Years" : "Year",
      label: since > 1 ? "Years" : "Year",
    },
  ];

  const openModal = () => {
    setDiagnosisModalOpen(true);
  };

  const closeModal = () => {
    setDiagnosisModalOpen(false);
    setIsEditMode(false);
    defaultValue();
    setSelectedChip(null);
  };

  const diagnosisRecords = [
    {
      "Diagnosis ": "Back Pain",
      "Mark Common": false,
    },
    {
      "Diagnosis ": "Headaches",
      "Mark Common": true,
    },
    {
      "Diagnosis ": "Fatigue",
      "Mark Common": false,
    },
    {
      "Diagnosis ": "Digestive Issues",
      "Mark Common": true,
    },
    {
      "Diagnosis ": "Joint Pain",
      "Mark Common": false,
    },
    {
      "Diagnosis ": "Anxiety and Depression",
      "Mark Common": true,
    },
    {
      "Diagnosis ": "High Blood Pressure",
      "Mark Common": false,
    },
    {
      "Diagnosis ": "Menstrual Irregularities and Pain",
      "Mark Common": true,
    },
    {
      "Diagnosis ": "Heartburn and Acid Reflux",
      "Mark Common": false,
    },
    {
      "Diagnosis ": "Household Chemicals",
      "Mark Common": true,
    },
  ];
  // useEffect(() => {
  //   getICDCode(1, null)
  //     .then((res) => res.data.result)
  //     .then((res) => {
  //       setChips(
  //         res.map((item) => ({
  //           id: item.value,
  //           icdcode: item.icdcode,
  //           label: item.label,
  //         }))
  //       );
  //     })
  //     .catch((error) => {});
  // }, []);

  const renderInput = (row, rowIndex, column) => {
    return (
      <div className="flex">
        {diagnosisDetails.length > 0 && column === "Chronic / NonChronic" && (
          <input
            type="checkbox"
            className="text-center"
            defaultChecked={row?.["Chronic / NonChronic"] ? true : false}
            onChange={(e) => {
              let tempData = [...diagnosisDetails];
              tempData[rowIndex]["Chronic / NonChronic"] = e.target.checked;
              setDiagnosisDetails(tempData);
            }}
          />
        )}
      </div>
    );
  };

  const handleClickChip = (chip) => {
    if (chip?.id === selectedChip) {
      setSelectedChip(null);
      setValue("dDiagnosis", null);
    } else {
      setSelectedChip(chip.id);
      setValue("dDiagnosis", chip);
    }
  };

  const handleClickSince = (data) => {
    const splitString = data.value.split(" ");
    const [number, unit] = splitString;
    const duration = {
      id: number,
      value: unit,
      label: capitalizeStatement(unit),
    };
    setValue("since", number);
    setValue("duration", duration);
  };

  useEffect(() => {
    clearErrors(["duration", "since", "dDiagnosis"]);
  }, [duration, since, dDiagnosis]);

  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, [duration, since, status, dDiagnosis, chronic]);

  const defaultValue = () => {
    setValue("duration", null);
    setValue("since", "");
    setValue("status", null);
    setValue("dDiagnosis", null);
    setValue("chronic", false);
    setSelectedChip(null);
    setSelectedSince(null);
  };

  const handleAdd = async () => {
    const isValid = await trigger([
      "duration",
      "since",
      "status",
      "dDiagnosis",
    ]);
    if (isValid) {
      const newAllergyValue = capitalizeStatement(duration?.label);
      const isDuplicate = diagnosisDetails.some(
        (data) => data.Diagnosis === newAllergyValue
      );
      if (isDuplicate) {
        warningAlert(
          "Duplicate Complaints value. Please choose a different value"
        );
      } else {
        defaultValue();
        setDiagnosisDetails([
          ...diagnosisDetails,
          {
            Diagnosis: capitalizeStatement(dDiagnosis?.label),
            id: duration?.id,
            Since: `${since} ${duration?.value}`,
            Status: status?.value,
            durationId: selectedSince,
            statusId: status?.id,
            "Chronic / NonChronic": chronic,
          },
        ]);
        if (inputRef.current && inputRef.current.focus) {
          inputRef.current.focus();
        }
      }
    }
  };

  const handleUpdate = async () => {
    const isValid = await trigger([
      "duration",
      "since",
      "status",
      "dDiagnosis",
    ]);
    if (isValid) {
      const newAllergyValue = capitalizeStatement(duration?.label);

      const isDuplicate = diagnosisDetails.some(
        (data, i) => i !== index && data.Diagnosis === newAllergyValue
      );

      if (isDuplicate) {
        warningAlert(
          "Duplicate Complaints value. Please choose a different value"
        );
      } else {
        const updatedData = diagnosisDetails.map((data, i) =>
          i === index
            ? {
                Diagnosis: capitalizeStatement(dDiagnosis?.label),
                id: duration?.id,
                Since: `${since} ${duration?.value}`,
                Status: status.value,
                statusId: status.id,
                durationId: selectedSince,
                "Chronic / NonChronic": chronic,
              }
            : data
        );

        setDiagnosisDetails(updatedData);
        defaultValue();
        setIsEditMode(false);
      }
    }
  };

  const handleEdit = (data, index) => {
    const splitString = data?.Since.split(" ");
    const [number, unit] = splitString;
    setIndex(index);
    setIsEditMode(true);
    setValue("dDiagnosis", {
      id: data?.id,
      value: data?.id,
      label: data["Diagnosis"],
    });
    setValue("since", number);
    setSelectedChip(data?.id);
    setSelectedSince(parseInt(data?.durationId));
    setValue("status", {
      id: data.statusId,
      value: data.Status,
      label: data.Status,
    });
    setValue("duration", { id: number, value: unit, label: unit });
    setValue("chronic", data["Chronic / NonChronic"]);
  };

  const handleDelete = (index) => {
    setConfirmationProps({
      confirmationMsg: `Are you sure you want to delete?`,
      confirmationButtonMsg: "Delete",
      confirmationLabel: "Confirm Deletion",
      confirmationSubmitFunc: () => {
        confirmDelete(index);
        setConfirmationOpen(false);
      },
    });
    setConfirmationOpen(true);
  };

  const confirmDelete = (index) => {
    const updatedData = [...diagnosisDetails];
    updatedData.splice(index, 1);
    setDiagnosisDetails([...updatedData]);
  };

  const handleDiagnosisSubmit = () => {
    closeModal();
    setSelectedChip(null);
  };

  return (
    <div>
      <div className="rounded border h-60">
        <div className="bg-[#D6FEF4]  sticky  p-1 border  shadow-md flex justify-between">
          <div className="flex items-center">
            <div className="text-sm font-semibold flex items-center justify-start ml-2">
              Diagnosis
            </div>
          </div>
          <div className="flex justify-end w-1/2  mr-2">
            <div
              className={`px-3 py-[3px] placeholder-slate-300 relative  bg-white rounded text-sm border 
                  border-slate-300 text-slate-600
              outline-none hover:outline-none hover:ring w-2/3 flex justify-between`}
              onClick={() => {
                openModal();
                setSelectedChip(null);
                setValue("dDiagnosis", null);
              }}
            >
              <div className="flex justify-start items-center">Diagnosis</div>
              <div className="flex justify-end">
                <SearchIcon className="text-slate-500 " />
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-white">
          <div className="flex justify-between gap-3 ">
            <div className="w-full">
              <div className="flex justify-between gap-3 h-24 p-2">
                <div className="gap-3">
                  {chips.map((chip, index) => (
                    <button
                      type="button"
                      key={chip?.id}
                      variant="outlined"
                      aria-label={chip?.label}
                      onClick={() => {
                        handleClickChip(chip);
                        openModal();
                      }}
                      className={` mr-[5px] mb-1  h-[27px] px-3 w-max rounded text-sm border border-gray-300  whitespace-nowrap ${
                        chip?.id === selectedChip
                          ? "bg-[#32819b] text-white rounded-full border"
                          : " text-black rounded-full border"
                      }`}
                    >
                      {chip?.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className=" w-full -mt-[12px]">
                {diagnosisDetails.length > 0 ? (
                  <CommonTransactionTable
                    dataResult={diagnosisDetails}
                    removeHeaders={["id", "statusId", "durationId"]}
                    tableClass="h-[102px] -mt[5px] -mb-1"
                    renderActions={(row, index) =>
                      diagnosisDetails.length > 0 ? (
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => {
                              handleEdit(row, index);
                              openModal();
                            }}
                          >
                            <EditIcon />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(index)}
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      ) : (
                        ""
                      )
                    }
                    highlightRow={false}
                    rowBackgroundColor={(row, index) => {
                      return index % 2 === 0 ? "bg-gray-300" : "bg-white";
                    }}
                    handleSelectedRow={(row, index) => {
                      console.log("Selected Row:", row, "Index:", index);
                    }}
                    renderInput={renderInput}
                    editableColumns={["Chronic / NonChronic"]}
                    SelectCheckbox={true}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <Modal
          open={isDiagnosisModalOpen}
          aria-labelledby="modal-modal-title"
          onClose={closeModal}
        >
          <Box
            style={{ width: "90%" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-75 bg-background-paper border bg-white border-gray-300 rounded shadow-md p-4"
          >
            <div className="grid grid-cols-2 items-center  mb-3">
              <div className="flex font-bold justify-start">Diagnosis</div>
              <div className="justify-end">
                <CancelPresentationIconButton onClick={closeModal} />
              </div>
            </div>
            <div className="">
              <div className="border rounded  p-2 bg-white">
                <div>
                  {chips.map((chip) => {
                    return (
                      <button
                        type="button"
                        key={chip?.id}
                        variant="outlined"
                        aria-label={chip?.label}
                        className={` mr-[5px] mb-1  h-[27px] px-3 w-max rounded text-sm border border-gray-300  whitespace-nowrap ${
                          chip?.id === selectedChip
                            ? "bg-[#32819b] text-white rounded-full border"
                            : " text-black rounded-full border"
                        }`}
                        onClick={() => {
                          handleClickChip(chip);
                        }}
                      >
                        {chip?.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className=" border  p-2 rounded  my-2 bg-[#EFFBFF]">
                <div>
                  {diagnosisSince.map((chip) => {
                    return (
                      <button
                        key={chip?.id}
                        variant="outlined"
                        label={chip?.value}
                        className={` mr-[5px] mb-1  h-[27px] px-3 w-max rounded text-sm border border-gray-300  whitespace-nowrap ${
                          chip?.id === selectedSince
                            ? "bg-[#32819b] text-white rounded-full border"
                            : " text-black rounded-full border"
                        }`}
                        onClick={() => {
                          handleClickSince(chip);
                        }}
                      >
                        {chip?.value}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className=" mt-4">
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-2 w-full">
                  <div className="col-span-2">
                    <DropdownField
                      control={control}
                      error={errors.dDiagnosis}
                      name="dDiagnosis"
                      placeholder="Diagnosis *"
                      dataArray={complaintsList}
                      isClearable={true}
                      inputRef={inputRef}
                      isSearchable={true}
                    />
                  </div>
                  <InputField
                    name="since"
                    closeModal
                    variant="outlined"
                    label="Since *"
                    error={errors.since}
                    control={control}
                  />
                  <DropdownField
                    control={control}
                    error={errors.duration}
                    name="duration"
                    placeholder="Duration *"
                    dataArray={durationPeriod}
                    isClearable={true}
                    isSearchable={true}
                  />
                  <DropdownField
                    control={control}
                    error={errors.status}
                    name="status"
                    placeholder="Status *"
                    dataArray={statusList}
                    isClearable={true}
                    isSearchable={true}
                  />
                  <div className="col-span-2">
                    <div className=" grid-cols-2">
                      <CheckBoxField
                        name="chronic"
                        error={errors.chronic}
                        label="Chronic"
                        className="whitespace-nowrap"
                        control={control}
                        defaultValue={chronic?.checked}
                      />
                      <CommonButton
                        label={isEditMode ? "Update" : "Add"}
                        type="button"
                        onClick={() => {
                          isEditMode ? handleUpdate() : handleAdd();
                        }}
                        className="border border-blue-500 text-blue-500 hover:shadow px-4 py-2 rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {diagnosisDetails.length !== 0 ? (
                <div>
                  <div className=" w-full h-full">
                    <CommonTransactionTable
                      dataResult={diagnosisDetails}
                      tableClass={" max-h-40"}
                      removeHeaders={["id", "statusId", "durationId"]}
                      renderActions={(row, index) =>
                        diagnosisDetails.length > 0 ? (
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() => handleEdit(row, index)}
                            >
                              <EditIcon />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(index)}
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                        ) : (
                          ""
                        )
                      }
                      renderInput={renderInput}
                      highlightRow={false}
                      rowBackgroundColor={(row, index) => {
                        return index % 2 === 0 ? "bg-gray-300" : "bg-white";
                      }}
                      handleSelectedRow={(row, index) => {
                        console.log("Selected Row:", row, "Index:", index);
                      }}
                      editableColumns={["Chronic / NonChronic"]}
                      SelectCheckbox={true}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <CommonButton
                      label="Reset"
                      type="button"
                      onClick={() => {
                        defaultValue();
                      }}
                      className="h-10 px-3 mx-4 border border-customRed bg-white text-customRed rounded text-base font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
                    />

                    <CommonButton
                      label="Save"
                      type="button"
                      className="saveButton bg-[#073763] text-white"
                      onClick={() => {
                        handleDiagnosisSubmit();
                      }}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </Box>
        </Modal>
        <ConfirmationModal
          confirmationOpen={confirmationOpen}
          confirmationHandleClose={() => setConfirmationOpen(false)}
          {...confirmationProps}
        />
      </div>
    </div>
  );
};

export default Diagnosis;
