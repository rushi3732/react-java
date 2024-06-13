import SearchIcon from "@mui/icons-material/Search";
import { Box, Modal, TableContainer } from "@mui/material";
import { format } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
import CommonTransactionTable from "../../../Common Components/CommonTable/CommonTransactionTable";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import DatePickerField from "../../../Common Components/FormFields/DatePickerField";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import InputField from "../../../Common Components/FormFields/InputField";
import SearchDropdown from "../../../Common Components/FormFields/searchDropdown";
import { errorAlert } from "../../../Common Components/Toasts/CustomToasts";
import {
  DeleteIcon,
  EditIcon,
} from "../../../Common Components/assets/commonassets/CommonAssets";
import CommonButton from "../../../Common Components/commonbutton/CommonButton";
import DrugSearch from "./medication/DrugSearch";
import {
  getFrequency,
  getInstruction,
  getRoute,
} from "./services/ETUCaseSheetService";
const Medication = (props) => {
  const {
    isMedicationsModalOpen,
    setIsMedicationsModalOpen,
    medicationDetails,
    setMedicationDetails,
  } = props;
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationProps, setConfirmationProps] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [index, setIndex] = useState();
  const [setectedMedication, setSetectedMedication] = useState(null);
  const [medicationId, setMedicationId] = useState(0);
  const [resetCount, setResetCount] = useState(0);
  const [selectedRow, setSelectedRow] = useState([]);
  const [frequencyChips, setFrequencyChips] = useState([]);
  const [instructionsList, setInstructionsList] = useState([]);
  const [routeChips, setRouteChips] = useState([]);

  const [selectedChips, setSelectedChips] = useState({
    medication: null,
    frequency: null,
    instruction: null,
    mSince: null,
    routes: null,
  });
  const [medicationChips, setMedicationChips] = useState([
    {
      id: 1,
      label: "Back Pain",
      value: "Back Pain",
      "Mark Common": false,
    },
    {
      id: 2,
      label: "Headaches",
      value: "Headaches",
      "Mark Common": true,
    },
    {
      id: 3,
      label: "Fatigue",
      value: "Fatigue",
      "Mark Common": false,
    },
    {
      id: 4,
      label: "Digestive Issues",
      value: "Digestive Issues",
      "Mark Common": true,
    },
    {
      id: 5,
      label: "Joint Pain",
      value: "Joint Pain",
      "Mark Common": false,
    },
    {
      id: 6,
      label: "Anxiety and Depression",
      value: "Anxiety and Depression",
      "Mark Common": true,
    },
    {
      id: 7,
      label: "High Blood Pressure",
      value: "High Blood Pressure",
      "Mark Common": false,
    },
    {
      id: 8,
      label: "Menstrual Irregularities and Pain",
      value: "Menstrual Irregularities and Pain",
      "Mark Common": true,
    },
    {
      id: 9,
      label: "Heartburn and Acid Reflux",
      value: "Heartburn and Acid Reflux",
      "Mark Common": false,
    },
    {
      id: 10,
      label: "Household Chemicals",
      value: "Household Chemicals",
      "Mark Common": true,
    },
  ]);

  const [durationChips, setDurationChips] = useState([
    { id: 1, value: "1 Day" },
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

  const [instructionsChips, setInstructionChips] = useState([
    {
      id: 1,
      value: 7,
      instruction: "After Meal",
      label: "01 | After Meal",
      instructionLocal: "जेवणानंतर",
    },
    {
      id: 2,
      value: 12,
      instruction: "After breakfast",
      label: "AB | After breakfast",
      instructionLocal: "न्याहारी नंतर",
    },
    {
      id: 3,
      value: 9,
      instruction: "Before Sleep",
      label: "03 | Before Sleep",
      instructionLocal: "झोपण्यापूर्वी",
    },
    {
      id: 4,
      value: 8,
      instruction: "Before Meal",
      label: "02 | Before Meal",
      instructionLocal: "जेवणाआधी ",
    },
    {
      id: 5,
      value: 11,
      instruction: "Early Morning",
      label: "04 | Early Morning",
      instructionLocal: "सकाळी",
    },
  ]);
  const requiredFields = [
    "medication",
    "frequency",
    "instruction",
    "durationIn",
    "mSince",
    "routes",
  ];
  const inputRef = useRef();

  const {
    setValue,
    watch,
    clearErrors,
    setError,
    control,
    formState: { errors },
  } = useFormContext();
  const [
    medication,
    startDate,
    iVFlowRate,
    dosage,
    quantity,
    routes,
    durationIn,
    mSince,
    instruction,
    frequency,
    machineType,
    typeDrugName,
    brandGeneric,
  ] = watch([
    "medication",
    "startDate",
    "iVFlowRate",
    "dosage",
    "quantity",
    "routes",
    "durationIn",
    "mSince",
    "instruction",
    "frequency",
    "machineType",
    "typeDrugName",
    "brandGeneric",
  ]);

  const durationIns = [
    {
      id: 1,
      value: mSince > 1 ? "Days" : "Day",
      label: mSince > 1 ? "Days" : "Day",
    },
    {
      id: 2,
      value: mSince > 1 ? "Months" : "Month",
      label: mSince > 1 ? "Months" : "Month",
    },
    {
      id: 3,
      value: mSince > 1 ? "Years" : "Year",
      label: mSince > 1 ? "Years" : "Year",
    },
  ];

  const openSecondModal = () => {
    setIsMedicationsModalOpen(true);
  };

  const closeSecondModal = () => {
    setIsMedicationsModalOpen(false);
  };

  const selectedDefaultValues = {
    medication: null,
    frequency: null,
    instruction: null,
    mSince: null,
    routes: null,
  };

  function getRouteData() {
    getRoute()
      .then((res) => res.data.result)
      .then((res) => {
        setRouteChips(res);
      })
      .catch((error) => {
        errorAlert(error.message);
      });
  }

  const handleChange = (e) => {
    getInstruction(e)
      .then((res) => res.data.result)
      .then((res) => {
        setInstructionsList(res);
      })
      .catch((error) => {
        errorAlert(error.message);
      });
  };

  useEffect(() => {
    if (selectedRow?.Frequency != "") {
      if (selectedRow?.Frequency != undefined) {
        handleClickChip(
          {
            id: selectedRow?.Id,
            value: selectedRow?.Id,
            label: selectedRow?.Frequency,
          },
          "frequency"
        );
      }
    }
    if (selectedRow?.Route != "") {
      if (selectedRow?.Route != undefined) {
        handleClickChip(
          {
            id: selectedRow?.Id,
            value: selectedRow?.Id,
            label: selectedRow?.Route,
          },
          "routes"
        );
      }
    }
  }, [selectedRow]);

  function getFrequencyData() {
    getFrequency()
      .then((res) => res.data.result)
      .then((res) => {
        setFrequencyChips(res);
      })
      .catch((error) => {
        errorAlert(error.message);
      });
  }

  useEffect(() => {
    getFrequencyData();
    getRouteData();
  }, []);

  const handleClickChip = (chip, type) => {
    setSelectedChips((prevState) => ({
      ...prevState,
      [type]: prevState[type] === chip.id ? null : chip.id,
    }));
    if (type !== "mSince") {
      if (type === "medication") {
        setSetectedMedication({
          id: chip?.id,
          value: chip?.value,
          label: chip.label,
        });
        setValue(type, chip);
        clearErrors(type);
      } else {
        setValue(type, chip);
        clearErrors(type);
      }
    } else {
      const splitString = chip?.value.split(" ");
      const [number, unit] = splitString;
      setValue("mSince", number);
      clearErrors(type);
      clearErrors("durationIn");
      setValue("durationIn", { id: number, value: unit, label: unit });
    }
  };

  useEffect(() => {
    let quantityValue;
    let durationPeriod = `${mSince} ${durationIn?.value}`;
    if (durationPeriod === "1 Month") {
      quantityValue = `30`;
    } else if (durationPeriod === "6 Months") {
      quantityValue = `180`;
    } else if (durationPeriod === "1 Year") {
      quantityValue = `365`;
    } else if (durationPeriod === "2 Years") {
      quantityValue = `730`;
    } else {
      quantityValue = mSince;
    }
    setValue("quantity", quantityValue);
  }, [mSince, durationIn]);

  const defaultValues = () => {
    setValue("machineType", 1);
    setValue("startDate", new Date());
    setValue("medication", null);
    setValue("iVFlowRate", "");
    setValue("dosage", "");
    setValue("routes", null);
    setValue("durationIn", null);
    setValue("quantity", "");
    setValue("mSince", "");
    setValue("instruction", null);
    setValue("frequency", null);
    setValue("typeDrugName", "");
    setValue("brandGeneric", "Brand");
  };

  const validateFields = (fields, setError) => {
    let hasError = false;
    const checkAndSetError = (field) => {
      if (eval(field) === null || eval(field) === "") {
        setError(field, { type: "custom", message: "required" });
        hasError = true;
      }
    };
    fields.forEach(checkAndSetError);
    return hasError;
  };

  const handleAdd = async () => {
    const hasError = validateFields(
      ["frequency", "instruction", "durationIn", "mSince", "routes"],
      setError
    );
    if (typeDrugName == "" || typeDrugName == undefined) {
      setError("typeDrugName", { type: "custom", message: "required" });
    }

    if (!hasError && typeDrugName != "" && typeDrugName != undefined) {
      setMedicationDetails([
        ...medicationDetails,
        {
          id: 0,
          "Drug Type":
            selectedRow.isGeneric === true ? "Generic" : "Brand Name",
          "Drug Name": selectedRow["Item Name"],
          Frequency: frequency?.label,
          FrequencyId: frequency?.id,
          Dosage: dosage,
          Instructions: instruction?.label,
          InstructionsId: instruction?.id,
          Duration: `${mSince}  ${
            durationIn?.value === undefined ? "" : durationIn?.value
          }`,
          DurationInId: durationIn?.id,
          Quantity: quantity,
          Route: routes?.label,
          RouteId: routes?.id,
          "IV Flow Rate": iVFlowRate,
          "Start Date":
            startDate === null ? "" : format(startDate, "yyyy-MM-dd"),
        },
      ]);
      setResetCount(resetCount + 1);
      defaultValues();
    }
  };

  const handleUpdate = async () => {
    const hasError = validateFields(requiredFields, setError);
    if (typeDrugName == "" || typeDrugName == undefined) {
      setError("typeDrugName", { type: "custom", message: "required" });
    }
    if (!hasError && typeDrugName != "" && typeDrugName != undefined) {
      const updatedData = [...medicationDetails];
      updatedData[index] = {
        id: medicationId,
        "Drug Type": brandGeneric?.label,
        "Drug Name": typeDrugName,
        Frequency: frequency?.label,
        FrequencyId: frequency?.id,
        Dosage: dosage,
        Instructions: instruction?.label,
        InstructionsId: instruction?.id,
        Duration: `${mSince} ${
          durationIn?.value === undefined ? "" : durationIn?.value
        }`,
        DurationInId: durationIn?.id,
        Quantity: quantity,
        Route: routes?.label,
        RouteId: routes?.id,
        "IV Flow Rate": iVFlowRate,
        "Start Date": startDate === null ? "" : format(startDate, "yyyy-MM-dd"),
      };
      setMedicationDetails([...updatedData]);
      setResetCount(resetCount + 1);
      defaultValues();
      setIsEditMode(false);
    }
  };

  const handleEdit = (data, index) => {
    const splitString = data?.Duration.split(" ");
    const [number, unit, value] = splitString;
    setIndex(index);
    setIsEditMode(true);
    setMedicationId(data?.id);
    setValue(
      "machineType",
      data["Drug Name"] === "Brand"
        ? 1
        : data["Drug Name"] === "Generic"
        ? 2
        : ""
    );
    setValue(
      "startDate",
      data["Start Date"] ? new Date(data["Start Date"]) : new Date()
    );
    clearErrors("startDate");
    setValue("iVFlowRate", data["IV Flow Rate"]);
    setValue("dosage", data?.Dosage);
    setValue("routes", {
      id: data?.RouteId,
      value: data?.Route,
      label: data?.Route,
    });
    setValue("durationIn", {
      id: data?.DurationInId,
      value: unit == "" ? value : unit,
      label: unit == "" ? value : unit,
    });
    setValue("quantity", data?.Quantity);
    setValue("mSince", number);
    setValue("medication", {
      id: data?.InstructionsId,
      value: data?.["Drug Type"],
      label: data?.["Drug Type"],
    });
    let drugObject = selectedRow;
    drugObject["Item Name"] = data?.["Drug Name"];
    setSelectedRow(drugObject);
    setValue("instruction", {
      id: data?.InstructionsId,
      value: data?.Instructions,
      label: data?.Instructions,
    });
    setValue("frequency", {
      id: data?.FrequencyId,
      value: data?.Frequency,
      label: data?.Frequency,
    });
    setValue("typeDrugName", data?.["Drug Name"]);
    setValue("brandGeneric", data?.["Drug Type"]);
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
    const updatedData = [...medicationDetails];
    updatedData.splice(index, 1);
    setMedicationDetails([...updatedData]);
  };

  return (
    <div>
      <div className="rounded border ">
        <div className="bg-purple-200 sticky  p-1 border  shadow-md flex justify-between">
          <div className="flex items-center">
            <div className="text-sm font-semibold flex items-center justify-start ml-2">
              Medication
            </div>
          </div>
          <div className="flex justify-end w-1/3  mr-2">
            <div
              className={`px-3 py-[3px] placeholder-slate-300 relative  bg-white rounded text-sm border 
                  border-slate-300 text-slate-600
              outline-none hover:outline-none hover:ring w-2/3 flex justify-between`}
              onClick={() => {
                openSecondModal();
                setValue("typeDrugName", "");
              }}
            >
              <div className="flex justify-start items-center">Medication</div>
              <div className="flex justify-end">
                <SearchIcon className="text-slate-500 " />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`bg-white ${
            medicationDetails.length == undefined ||
            medicationDetails.length == 0
              ? "p-3"
              : ""
          }`}
        >
          <div className="flex justify-between gap-3 mb-2">
            <div className="w-full ">
              <div className="w-full top-0 -mt-2 -mb-[14px] ">
                {medicationDetails.length > 0 ? (
                  <CommonTransactionTable
                    dataResult={medicationDetails}
                    removeHeaders={[
                      "id",
                      "FrequencyId",
                      "InstructionsId",
                      "RouteId",
                      "DurationInId",
                    ]}
                    renderActions={(row, index) =>
                      medicationDetails.length > 0 ? (
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => {
                              handleEdit(row, index);
                              openSecondModal();
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
                    editableColumns={[""]}
                    SelectCheckbox={false}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <Modal
          open={isMedicationsModalOpen}
          aria-labelledby="modal-modal-title"
          className=""
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
            className="  w-[90%]  overflow-auto    overflow-y-auto   absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-background-paper border bg-white border-gray-300   p-4"
          >
            <div className="grid grid-cols-2 items-center  mb-3">
              <div className="flex font-bold justify-start">Medication</div>
              <div className="justify-end">
                <CancelPresentationIconButton
                  onClick={() => {
                    closeSecondModal();
                    defaultValues();
                  }}
                />
              </div>
            </div>
            <div>
              <div className="">
                <DrugSearch
                  selectedRow={selectedRow}
                  setSelectedRow={setSelectedRow}
                  resetCount={resetCount}
                />
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-2">
                  <div className="rounded border">
                    <div className="bg-[#FFE6C9]  z-40  sticky  p-1 border  shadow-md flex justify-between">
                      <div className="flex items-center">
                        <div className="text-sm font-semibold flex items-center justify-start ml-2">
                          Frequency
                        </div>
                      </div>
                      <div className="flex justify-end w-1/3  mr-2">
                        <DropdownField
                          control={control}
                          error={errors.frequency}
                          name="frequency"
                          placeholder="Frequency*"
                          dataArray={frequencyChips}
                          isClearable={true}
                          isSearchable={true}
                        />
                      </div>
                    </div>
                    <TableContainer
                      square={true}
                      elevation={1}
                      sx={{
                        "&::-webkit-scrollbar": {
                          width: 7,
                          height: 10,
                          marginY: "4px",
                          overflow: "visible",
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
                      className="rounded  h-[70px] "
                    >
                      <div className=" bg-white">
                        <div className="flex justify-between gap-3 p-2">
                          <div className="gap-3">
                            {frequencyChips.map((chip, index) => (
                              <>
                                <button
                                  type="button"
                                  key={chip?.id}
                                  variant="outlined"
                                  label={chip?.label}
                                  onClick={() =>
                                    handleClickChip(chip, "frequency")
                                  }
                                  className={` mr-[5px] mb-1  h-[27px] px-3 w-max rounded text-sm border-gray-300  whitespace-nowrap ${
                                    chip?.id === selectedChips.frequency
                                      ? "bg-[#007EA9] text-white rounded-full border"
                                      : " text-black rounded-full border"
                                  }`}
                                >
                                  {" "}
                                  {chip?.label}
                                </button>
                              </>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TableContainer>
                  </div>
                  <div className="rounded border">
                    <div className="bg-[#FCE7F3] sticky z-40 p-1 border  shadow-md flex justify-between">
                      <div className="flex items-center">
                        <div className="text-sm font-semibold flex items-center justify-start ml-2">
                          Instructions
                        </div>
                      </div>
                      <div className="flex justify-end w-1/3  mr-2">
                        <SearchDropdown
                          handleInputChange={handleChange}
                          control={control}
                          error={errors.instruction}
                          name="instruction"
                          placeholder="Instructions*"
                          dataArray={instructionsList}
                          isClearable={true}
                          isSearchable={true}
                          searchIcon={true}
                        />
                      </div>
                    </div>
                    <TableContainer
                      square={true}
                      elevation={1}
                      sx={{
                        "&::-webkit-scrollbar": {
                          width: 7,
                          height: 10,
                          marginY: "4px",
                          overflow: "visible",
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
                      className="rounded  h-[70px] "
                    >
                      <div className=" bg-white">
                        <div className="flex justify-between gap-3 p-2">
                          <div className="gap-3">
                            {instructionsChips?.map((chip, index) => (
                              <>
                                <button
                                  type="button"
                                  key={chip?.id}
                                  variant="outlined"
                                  label={chip?.label}
                                  onClick={() =>
                                    handleClickChip(chip, "instruction")
                                  }
                                  className={` mr-[5px] mb-1  h-[27px] px-3 w-max rounded text-sm border-gray-300  whitespace-nowrap ${
                                    chip?.id === selectedChips.instruction
                                      ? "bg-[#007EA9] text-white rounded-full border"
                                      : " text-black rounded-full border"
                                  }`}
                                >
                                  {" "}
                                  {chip?.label}
                                </button>
                              </>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TableContainer>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-2">
                  {" "}
                  <div className="rounded border">
                    <div className="bg-[#FCCBF7] sticky    p-1 border flex justify-between shadow-md items-center">
                      <div className=" items-center  justify-start">
                        <div className="text-sm font-semibold  items-center  ml-2">
                          Since
                        </div>
                      </div>
                      <div className=" justify-end grid grid-cols-2 gap-1 mr-2">
                        <div className="flex-1 mb-2 sm:mb-0">
                          <InputField
                            name="mSince"
                            control={control}
                            variant="outlined"
                            label="Since *"
                            error={errors.mSince}
                          />
                        </div>
                        <div className="flex-1">
                          <DropdownField
                            control={control}
                            error={errors.durationIn}
                            name="durationIn"
                            placeholder="Duration In *"
                            dataArray={durationIns}
                            isClearable={true}
                            isSearchable={true}
                            isDisabled={mSince <= 0 ? true : false}
                          />
                        </div>
                      </div>
                    </div>
                    <TableContainer
                      square={true}
                      elevation={1}
                      sx={{
                        "&::-webkit-scrollbar": {
                          width: 7,
                          height: 10,
                          marginY: "4px",
                          overflow: "visible",
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
                      className="rounded  h-[70px]"
                    >
                      <div className=" bg-white">
                        <div className=" p-2">
                          <div className="gap-3">
                            {durationChips.map((chip, index) => (
                              <button
                                type="button"
                                key={chip?.id}
                                variant="outlined"
                                label={chip?.value}
                                onClick={() => handleClickChip(chip, "mSince")}
                                className={` mr-[5px] mb-1  h-[27px] px-3 w-max rounded text-sm border-gray-300  whitespace-nowrap ${
                                  chip?.id === selectedChips.mSince
                                    ? "bg-[#007EA9] text-white rounded-full border"
                                    : " text-black rounded-full border"
                                }`}
                              >
                                {" "}
                                {chip?.value}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TableContainer>
                  </div>
                  <div className="rounded border">
                    <div className="bg-[#DCFCE7] sticky  p-1 border  shadow-md flex justify-between">
                      <div className="flex items-center">
                        <div className="text-sm font-semibold flex items-center justify-start ml-2">
                          Route
                        </div>
                      </div>
                      <div className="flex justify-end w-1/3  mr-2">
                        <DropdownField
                          control={control}
                          error={errors.routes}
                          name="routes"
                          placeholder="Routes*"
                          dataArray={routeChips}
                          isClearable={true}
                          isSearchable={true}
                        />
                      </div>
                    </div>
                    <TableContainer
                      square={true}
                      elevation={1}
                      sx={{
                        "&::-webkit-scrollbar": {
                          width: 7,
                          height: 10,
                          marginY: "4px",
                          overflow: "visible",
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
                      className="rounded  h-[70px] "
                    >
                      <div className=" bg-white">
                        <div className="flex justify-between gap-3 p-2">
                          <div className="gap-3">
                            {routeChips.map((chip, index) => (
                              <>
                                <button
                                  type="button"
                                  key={chip?.id}
                                  variant="outlined"
                                  label={chip?.label}
                                  onClick={() =>
                                    handleClickChip(chip, "routes")
                                  }
                                  className={` mr-[5px] mb-1  h-[27px] px-3 w-max rounded text-sm border-gray-300  whitespace-nowrap ${
                                    chip?.id === selectedChips.routes
                                      ? "bg-[#007EA9] text-white rounded-full border"
                                      : " text-black rounded-full border"
                                  }`}
                                >
                                  {" "}
                                  {chip?.label}
                                </button>
                              </>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TableContainer>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2 mt-3">
                  <div className="flex  items-center  gap-2 w-full">
                    <div className="flex justify-between items-center gap-2 w-1/2">
                      <InputField
                        name="quantity"
                        variant="outlined"
                        label="Quantity"
                        error={errors.quantity}
                        control={control}
                      />
                      <InputField
                        name="dosage"
                        variant="outlined"
                        label="Dosage"
                        error={errors.dosage}
                        control={control}
                      />
                    </div>
                    <div className="w-1/2">
                      <InputField
                        name="iVFlowRate"
                        type="number"
                        variant="outlined"
                        label="IV Flow Rate"
                        error={errors.iVFlowRate}
                        control={control}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between gap-2">
                    <div>
                      <DatePickerField
                        name="startDate"
                        label="Start Date"
                        control={control}
                        defaultValue={null}
                        disableFuture={false}
                        size="small"
                        inputFormat="dd-MM-yyyy"
                      />
                    </div>
                    <div className="flex">
                      <CommonButton
                        label={isEditMode ? "Update" : "Add"}
                        type="button"
                        onClick={() => {
                          isEditMode ? handleUpdate() : handleAdd();
                          setSelectedChips(selectedDefaultValues);
                        }}
                        className="border border-blue-500 text-blue-500 hover:shadow px-4 py-2 rounded"
                      />
                    </div>
                  </div>
                </div>
                {medicationDetails.length !== 0 ? (
                  <div>
                    <div className="mt-1 overflow-auto">
                      <CommonTransactionTable
                        dataResult={medicationDetails}
                        tableClass={"max-h-36"}
                        removeHeaders={[
                          "id",
                          "FrequencyId",
                          "InstructionsId",
                          "RouteId",
                          "DurationInId",
                        ]}
                        renderActions={(row, index) =>
                          medicationDetails.length > 0 ? (
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
                        highlightRow={false}
                        rowBackgroundColor={(row, index) => {
                          return index % 2 === 0 ? "bg-gray-300" : "bg-white";
                        }}
                        handleSelectedRow={(row, index) => {
                          console.log("Selected Row:", row, "Index:", index);
                        }}
                        editableColumns={[""]}
                        SelectCheckbox={false}
                      />
                    </div>
                    <div className="flex justify-end gap-2 mt-2">
                      <CommonButton
                        label="Reset"
                        onClick={() => {
                          defaultValues();
                        }}
                        type="button"
                        className="h-10 px-3 mx-4 border border-customRed bg-white text-customRed rounded text-base font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
                      />
                      <CommonButton
                        label="Save"
                        type="button"
                        onClick={() => {
                          closeSecondModal();
                          setSelectedChips(selectedDefaultValues);
                        }}
                        className="saveButton bg-[#073763] text-white"
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
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
    </div>
  );
};

export default Medication;
