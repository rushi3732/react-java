import SearchIcon from "@mui/icons-material/Search";
import { Box, Modal, TableContainer, Tooltip } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
import CommonTransactionTable from "../../../Common Components/CommonTable/CommonTransactionTable";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import InputField from "../../../Common Components/FormFields/InputField";
import {
  errorAlert,
  warningAlert,
} from "../../../Common Components/Toasts/CustomToasts";
import {
  DeleteIcon,
  EditIcon,
} from "../../../Common Components/assets/commonassets/CommonAssets";
import CommonButton from "../../../Common Components/commonbutton/CommonButton";
import ModalComponent from "./ModalComponent";
import { getComplaintsChips } from "./services/ETUCaseSheetService";
import { capitalizeStatement } from "../../../Common Components/Custom Hooks/CapitalizeStatement";

const Complaints = (props) => {
  const {
    complaintDetails,
    setComplaintDetails,
    isComplaintsModalOpen,
    setIsComplaintsModalOpen,
  } = props;

  const inputRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChip, setSelectedChip] = useState(null);
  const [selectedSince, setSelectedSince] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationProps, setConfirmationProps] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [index, setIndex] = useState();
  const [chips, setChips] = useState([
    {
      id: 1,
      value: 1,
      label: "Headache",
      Complaints: "headache",
      "Mark Common": true,
    },
    {
      id: 2,
      value: 2,
      label: "Stomachache",
      Complaints: "stomachache",
      "Mark Common": true,
    },
    {
      id: 3,
      value: 3,
      label: "Fever",
      Complaints: "fever",
      "Mark Common": true,
    },
    {
      id: 4,
      value: 4,
      label: "Cough",
      Complaints: "cough",
      "Mark Common": true,
    },
    {
      id: 5,
      value: 5,
      label: "Fatigue",
      Complaints: "fatigue",
      "Mark Common": true,
    },
    {
      id: 6,
      value: 6,
      label: "Nausea",
      Complaints: "nausea",
      "Mark Common": true,
    },
    {
      id: 7,
      value: 7,
      label: "Dizziness",
      Complaints: "dizziness",
      "Mark Common": true,
    },
    {
      id: 8,
      value: 8,
      label: "Back pain",
      Complaints: "back_pain",
      "Mark Common": true,
    },
    {
      id: 9,
      value: 9,
      label: "Sore throat",
      Complaints: "sore_throat",
      "Mark Common": true,
    },
    {
      id: 10,
      value: 10,
      label: "Shortness of breath",
      Complaints: "shortness_of_breath",
      "Mark Common": true,
    },
  ]);
  const [complainSince, setComplainSince] = useState([
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

  const {
    setValue,
    watch,
    trigger,
    clearErrors,
    control,
    formState: { errors },
  } = useFormContext();
  let getSince = watch("cSince");
  const durationPeriod = [
    {
      id: 1,
      value: getSince > 1 ? "Days" : "Day",
      label: getSince > 1 ? "Days" : "Day",
    },
    {
      id: 2,
      value: getSince > 1 ? "Months" : "Month",
      label: getSince > 1 ? "Months" : "Month",
    },
    {
      id: 3,
      value: getSince > 1 ? "Years" : "Year",
      label: getSince > 1 ? "Years" : "Year",
    },
  ];

  // useEffect(() => {
  //   getComplaintsChips()
  //     .then((res) => res.data.result)
  //     .then((res) => {
  //       setChips(
  //         res.map((item) => ({
  //           Complaints: item?.label,
  //           label: item?.label,
  //           id: item?.id,
  //           value: item?.value,
  //           "Mark Common": item?.isCommon,
  //         }))
  //       );
  //     })
  //     .catch((error) => {
  //       errorAlert(error.message);
  //     });
  // }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openSecondModal = () => {
    setIsComplaintsModalOpen(true);
    setIsEditMode(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeSecondModal = () => {
    setIsComplaintsModalOpen(false);
    setSelectedChip(null);
    defaultValue();
  };

  const dataArray = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
  ];

  const handleInputChange = (inputValue) => {
    console.log("Input changed to:", inputValue);
  };

  const onChange = (selectedOption) => {
    console.log("Option selected:", selectedOption);
  };

  const handleSearchClick = () => {
    console.log("handleSearchClick");
  };
  // const ComplaintsRecords = [
  //   {
  //     "Complaints ": "Back Pain",
  //     "Mark Common": false,
  //   },
  //   {
  //     "Complaints ": "Headaches",
  //     "Mark Common": true,
  //   },
  //   {
  //     "Complaints ": "Fatigue",
  //     "Mark Common": false,
  //   },
  //   {
  //     "Complaints ": "Digestive Issues",
  //     "Mark Common": true,
  //   },
  //   {
  //     "Complaints ": "Joint Pain",
  //     "Mark Common": false,
  //   },
  //   {
  //     "Complaints ": "Anxiety and Depression",
  //     "Mark Common": true,
  //   },
  //   {
  //     "Complaints ": "High Blood Pressure",
  //     "Mark Common": false,
  //   },
  //   {
  //     "Complaints ": "Menstrual Irregularities and Pain",
  //     "Mark Common": true,
  //   },
  //   {
  //     "Complaints ": "Heartburn and Acid Reflux",
  //     "Mark Common": false,
  //   },
  //   {
  //     "Complaints ": "Household Chemicals",
  //     "Mark Common": true,
  //   },
  // ];

  const renderInput = (row, rowIndex, column) => {
    return (
      <div className="flex">
        {column === "Mark Common" && (
          <input
            type="checkbox"
            className="text-center"
            defaultChecked={row["Mark Common"] ? true : false}
            onChange={(e) => {
              let tempData = [...chips];
              tempData[rowIndex]["Mark Common"] = e.target.checked;
              setChips(tempData);

              console.log("tempData", tempData);
            }}
          />
        )}
      </div>
    );
  };

  const handleClickChip = (chip) => {
    if (chip?.id === selectedChip) {
      setSelectedChip(null);
      setValue("complaint", null);
    } else {
      setSelectedChip(chip.id);
      setValue("complaint", chip);
    }
  };

  const handleClickSince = (data) => {
    if (data?.id === selectedSince) {
      setSelectedSince(null);
      setValue("cSince", "");
      setValue("cDuration", null);
    } else {
      setSelectedSince(data?.id);
      const splitString = data.value.split(" ");
      const [number, unit] = splitString;
      setValue("cSince", number);
      setValue("cDuration", { id: number, value: unit, label: unit });
    }
  };

  const [complaint, cSince, cDuration] = watch([
    "complaint",
    "cSince",
    "cDuration",
  ]);

  const defaultValue = () => {
    setValue("complaint", null);
    setValue("cSince", "");
    setValue("cDuration", null);
    setSelectedSince(null);
    setSelectedChip(null);
    setIsEditMode(false);
  };

  const handleAdd = async () => {
    const isValid = await trigger(["complaint", "cSince", "cDuration"]);
    if (isValid) {
      const newAllergyValue = complaint.Complaints;
      const isDuplicate = complaintDetails.some(
        (data) => data.Complaints === newAllergyValue
      );

      if (isDuplicate) {
        warningAlert(
          "Duplicate Complaints value. Please choose a different value"
        );
      } else {
        setComplaintDetails([
          ...complaintDetails,
          {
            Complaints: capitalizeStatement(complaint?.Complaints),
            id: complaint?.id,
            durationId: selectedSince,
            Since: `${cSince} ${cDuration?.value}`,
          },
        ]);
        defaultValue();
      }
    }
  };

  const handleUpdate = async () => {
    const isValid = await trigger(["complaint", "cSince", "cDuration"]);
    if (isValid) {
      const newAllergyValue = complaint.Complaints;

      const isDuplicate = complaintDetails.some(
        (data, i) => i !== index && data.Complaints === newAllergyValue
      );

      if (isDuplicate) {
        warningAlert(
          "Duplicate Complaints value. Please choose a different value"
        );
      } else {
        const updatedData = complaintDetails.map((data, i) =>
          i === index
            ? {
                Complaints: capitalizeStatement(complaint?.Complaints),
                id: complaint?.id,
                durationId: selectedSince,
                Since: `${cSince} ${cDuration?.value}`,
              }
            : data
        );

        setComplaintDetails(updatedData);
        defaultValue();
        setIsEditMode(false);
      }
    }
  };

  const handleEdit = (data, index) => {
    setIndex(index);
    console.log(isEditMode);
    setIsEditMode(true);
    const splitString = data.Since.split(" ");
    const [number, unit] = splitString;
    setValue("complaint", {
      id: data?.id,
      value: data?.id,
      label: data["Complaints"],
      Complaints: data["Complaints"],
    });
    setSelectedChip(data?.id);
    setSelectedSince(parseInt(data?.durationId));
    setValue("cSince", number);
    setIsEditMode(!isEditMode);
    setValue("cDuration", { id: number, value: unit, label: unit });
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
    const updatedData = [...complaintDetails];
    updatedData.splice(index, 1);
    setComplaintDetails([...updatedData]);
  };

  const handleComplaintsSubmit = () => {
    closeSecondModal();
    setSelectedChip(null);
  };

  useEffect(() => {
    if (complaint !== null) {
      clearErrors("complaint");
    }
  }, [complaint]);

  return (
    <div>
      <div className="rounded border h-60">
        <div className="bg-[#DCFCE7] sticky  p-1 border  shadow-md flex justify-between">
          <div className="flex items-center">
            <div className="text-sm font-semibold flex items-center justify-start ml-2">
              Complaints
            </div>
          </div>
          <div className="flex justify-end w-1/2  mr-2">
            <div
              className={`px-3 py-[3px] placeholder-slate-300 relative  bg-white rounded text-sm  
                   text-slate-600
              outline-none hover:outline-none hover:ring w-2/3 flex justify-between`}
              onClick={() => {
                openSecondModal();
                setSelectedChip(null);
                setValue("complaint", null);
              }}
            >
              <div className="flex justify-start items-center">Complaints</div>
              <div className="flex justify-end">
                <SearchIcon className="text-slate-500 " />
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-white">
          <div className="flex justify-between gap-3 ">
            <div className="w-full">
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
                className="rounded  h-[85px] "
              >
                <div className="flex justify-between gap-3 p-2">
                  <div className="gap-3 ">
                    {chips.map((chip, index) => {
                      return chip?.["Mark Common"] === true ? (
                        <button
                          type="button"
                          key={chip?.id}
                          variant="outlined"
                          label={chip?.Complaints}
                          onClick={() => {
                            handleClickChip(chip);
                            openSecondModal();
                          }}
                          className={` mr-[5px] mb-1  h-[27px] px-3 w-max rounded text-sm border border-gray-300  whitespace-nowrap ${
                            chip?.id === selectedChip
                              ? "bg-[#32819b] text-white rounded-full border"
                              : " text-black rounded-full border"
                          }`}
                        >
                          {chip?.Complaints}
                        </button>
                      ) : null;
                    })}
                  </div>

                  <div className="flex justify-end">
                    <Tooltip title="Add Allergies" placement="left" arrow>
                      <button
                        type="button"
                        className="text-blue-500 mr-1 flex justify-end"
                        onClick={openModal}
                      >
                        <EditIcon />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </TableContainer>
              <div className="w-full">
                {complaintDetails.length > 0 ? (
                  <CommonTransactionTable
                    dataResult={complaintDetails}
                    removeHeaders={["id", "label", "durationId"]}
                    renderActions={(row, index) =>
                      complaintDetails.length > 0 ? (
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
                    tableClass="h-[120px] -mt[5px]"
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
        <ModalComponent
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          dataArray={dataArray}
          placeholder="Search By UHID, Patient Name, Mobile No"
          isClearable={true}
          label="Search By UHID, Patient Name, Mobile No."
          handleSearchClick={handleSearchClick}
          dataResult={chips}
          renderInput={renderInput && renderInput}
          handleInputChange={handleInputChange}
          onChange={onChange}
          inputRef={inputRef}
          searchIcon={false}
          clearSearchBar={true}
          removeHeaders={["id", "durationId", "value", "label"]}
          modalTitle="Complaints"
        />
        <Modal
          open={isComplaintsModalOpen}
          aria-labelledby="modal-modal-title"
          onClose={closeSecondModal}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            style={{ width: "63%" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-75 bg-background-paper border bg-white border-gray-300 rounded shadow-md p-4"
          >
            <div className="grid grid-cols-2 items-center  mb-3">
              <div className="flex font-bold justify-start">Complaints</div>
              <div className="justify-end">
                <CancelPresentationIconButton onClick={closeSecondModal} />
              </div>
            </div>
            <div className="">
              <div className="border  p-2 rounded bg-white">
                <div>
                  {chips.map((chip) => {
                    return (
                      <>
                        {chip?.["Mark Common"] === true && (
                          <button
                            type="button"
                            key={chip?.id}
                            variant="outlined"
                            onClick={() => {
                              handleClickChip(chip);
                            }}
                            label={chip?.Complaints}
                            className={` mr-[5px] mb-1  h-[27px] px-3 w-max rounded text-sm border border-gray-300  whitespace-nowrap ${
                              chip?.id === selectedChip
                                ? "bg-[#32819b] text-white rounded-full border"
                                : " text-black rounded-full border"
                            }`}
                          >
                            {chip?.Complaints}
                          </button>
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
              <div className=" border  p-2 rounded  my-2 bg-[#EFFBFF]">
                <div>
                  {complainSince.map((chip) => {
                    return (
                      <>
                        <button
                          type="button"
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
                        </button>{" "}
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2 mt-4">
                <div>
                  <DropdownField
                    control={control}
                    error={errors.complaint}
                    name="complaint"
                    placeholder="Complaints *"
                    dataArray={chips?.filter(
                      (val) => val?.["Mark Common"] === true
                    )}
                    isClearable={true}
                    isSearchable={true}
                  />
                </div>
                <div className="flex gap-2 mr-3">
                  <InputField
                    name="cSince"
                    variant="outlined"
                    label="Since *"
                    error={errors.cSince}
                    control={control}
                    InputLabelProps={{ shrink: true }}
                  />
                  <DropdownField
                    control={control}
                    error={errors.cDuration}
                    name="cDuration"
                    placeholder="Duration *"
                    dataArray={durationPeriod}
                    isClearable={true}
                    isSearchable={true}
                  />
                  <div className="">
                    <CommonButton
                      label={isEditMode ? "Update" : "Add"}
                      type="button"
                      className="border border-blue-500 text-blue-500 hover:shadow px-4 py-2 rounded"
                      onClick={() => {
                        isEditMode ? handleUpdate() : handleAdd();
                      }}
                    />
                  </div>
                </div>
              </div>
              {complaintDetails?.length > 0 ? (
                <div>
                  <div className="mt-2">
                    <CommonTransactionTable
                      dataResult={complaintDetails}
                      removeHeaders={["id", "durationId"]}
                      renderActions={(row, index) =>
                        complaintDetails.length > 0 ? (
                          <div className="flex items-center">
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
                      tableClass={" max-h-40"}
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
                  <div className=" mt-2 flex justify-end gap-2">
                    <CommonButton
                      label="Reset"
                      type="button"
                      onClick={() => {
                        defaultValue();
                      }}
                      className="h-10 px-3 mx-4 border border-customRed bg-white text-customRed rounded text-base font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition cDuration-300 ease-out"
                    />

                    <CommonButton
                      label="Save"
                      type="button"
                      className="saveButton bg-[#073763] text-white"
                      onClick={() => {
                        handleComplaintsSubmit();
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

export default Complaints;
