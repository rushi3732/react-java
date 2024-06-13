import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Modal, TableContainer } from "@mui/material";
import { useFormContext } from "react-hook-form";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
import CommonTransactionTable from "../../../Common Components/CommonTable/CommonTransactionTable";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import { capitalizeStatement } from "../../../Common Components/Custom Hooks/CapitalizeStatement";
import CheckBoxField from "../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../Common Components/FormFields/DropdownField";
import { warningAlert } from "../../../Common Components/Toasts/CustomToasts";
import {
  DeleteIcon,
  EditIcon,
} from "../../../Common Components/assets/commonassets/CommonAssets";
import CommonButton from "../../../Common Components/commonbutton/CommonButton";
import { getRadiologyInvestigations } from "./services/ETUCaseSheetService";

const InvestigationRadiology = (props) => {
  const { radiologyDetails, setRadiologyDetails } = props;
  const inputRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChip, setSelectedChip] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationProps, setConfirmationProps] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [index, setIndex] = useState();
  const [record, setRecord] = useState([]);
  const [chips, setChips] = useState([
    {
      id: 1,
      value: "Headache",
      label: "Headache",
      "Mark Common": false,
    },
    {
      id: 2,
      value: "Anaphylaxis",
      label: "Anaphylaxis",
      "Mark Common": true,
    },
    {
      id: 3,
      value: "Back Pain",
      label: "Back Pain",
      "Mark Common": false,
    },
    {
      id: 4,
      value: "Digestive Issues",
      label: "Digestive Issues",
      "Mark Common": true,
    },
    {
      id: 5,
      value: "Cough and Cold",
      label: "Cough and Cold",
      "Mark Common": false,
    },
    {
      id: 6,
      value: "Joint Pain",
      label: "Joint Pain",
      "Mark Common": true,
    },
    {
      id: 7,
      value: "Anxiety and Depression",
      label: "Anxiety and Depression",
      "Mark Common": false,
    },
    {
      id: 8,
      value: "Chip 8",
      label: "Chip 8",
      "Mark Common": true,
    },
    { id: 9, value: "Chip 9", label: "Chip 9", "Mark Common": false },
    {
      id: 10,
      value: "Chip 10",
      label: "Chip 10",
      "Mark Common": false,
    },
    {
      id: 11,
      value: "Chip 11",
      label: "Chip 11",
      "Mark Common": false,
    },
    {
      id: 12,
      value: "Chip 12",
      label: "Chip 12",
      "Mark Common": false,
    },
  ]);

  const {
    setValue,
    watch,
    control,
    setError,
    clearErrors,
    trigger,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    getRadiologyInvestigations()
      .then((res) => res.data.result)
      .then((res) => {
        setChips(res);
      })
      .catch((error) => {});
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedChip(null);
  };

  const renderInput = (row, rowIndex, column) => {
    return (
      <div className="flex">
        {record.length > 0 && column === "Is Urgent" && (
          <input
            type="checkbox"
            className="text-center"
            defaultChecked={row["Is Urgent"] ? true : false}
            onChange={(e) => {
              let tempData = [...record];
              tempData[rowIndex]["Is Urgent"] = e.target.checked;
              setRecord(tempData);
            }}
          />
        )}
      </div>
    );
  };

  const handleClickChip = (chip) => {
    if (chip?.id === selectedChip) {
      setSelectedChip(null);
      setValue("investigation", null);
    } else {
      setSelectedChip(chip.id);
      setValue("investigation", chip);
      clearErrors("investigation");
    }
  };

  const [investigation, rIsUrgent] = watch(["investigation", "rIsUrgent"]);

  const handleAdd = async () => {
    const isValid = await trigger("investigation");
    if (isValid && investigation !== null) {
      setRecord([
        ...record,
        {
          id: selectedChip,
          Investigation: capitalizeStatement(investigation?.label),
          "Is Urgent": rIsUrgent,
        },
      ]);
      defaultValue();
    } else {
      setError("investigation", { type: "custom", message: "requied" });
    }
  };

  const defaultValue = () => {
    setValue("investigation", null);
    setValue("rIsUrgent", false);
    setIsEditMode(false);
    setSelectedChip(null);
  };

  useEffect(() => {
    getRadiologyInvestigations()
      .then((res) => res.data.result)
      .then((res) => {
        setChips(res);
      })
      .catch((error) => {});
  }, []);

  const handleUpdate = async () => {
    const isValid = await trigger("investigation");
    if (isValid && investigation !== null) {
      const newAllergyValue = capitalizeStatement(investigation.label);
      const isDuplicate = record.some(
        (data, i) => i !== index && data.Investigation === newAllergyValue
      );
      if (isDuplicate) {
        warningAlert(
          "Duplicate Investigation value. Please choose a different value"
        );
      } else {
        const updatedData = record.map((data, i) =>
          i === index
            ? {
                id: selectedChip,
                Investigation: capitalizeStatement(investigation?.label),
                "Is Urgent": rIsUrgent,
              }
            : data
        );
        setRecord(updatedData);
        defaultValue();
        setIsEditMode(false);
        clearErrors("investigation");
      }
    } else {
      setError("investigation", { type: "custom", message: "requied" });
    }
  };

  const handleEdit = (data, index) => {
    setIndex(index);
    setIsEditMode(true);
    setValue("investigation", {
      id: data?.id,
      value: data?.id,
      label: data["Investigation"],
    });
    setSelectedChip(data?.id);
    setValue("rIsUrgent", data["Is Urgent"]);
    clearErrors("investigation");
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
    const updatedData = [...record];
    updatedData.splice(index, 1);
    setRecord([...updatedData]);
  };

  const handleSumbitAll = () => {
    let list = [];
    list = record.map((data) => {
      return {
        categoryId: 2,
        ServiceId: data?.id,
        isUrgent: data["Is Urgent"],
      };
    });
    setRadiologyDetails(list);
    setSelectedChip(null);
  };

  return (
    <div>
      <div className="rounded border h-60">
        <div className="bg-[#DEFFD6]  sticky  p-1 border  shadow-md flex justify-between">
          <div className="flex items-center">
            <div className="text-sm font-semibold flex items-center justify-start ml-2">
              Radiology
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
                setValue("investigation", null);
              }}
            >
              <div className="flex justify-start items-center">Radiology</div>
              <div className="flex justify-end">
                <SearchIcon className="text-slate-500 " />
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-white">
          <div className="flex justify-between gap-3 mb-2">
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
                className="rounded  h-[100px] "
              >
                <div className="flex overflow-auto  justify-between gap-3 p-2">
                  <div className="gap-3">
                    {chips.map((chip, index) => (
                      <button
                        type="button"
                        key={chip?.id}
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
              </TableContainer>
              <div className="-mb-[14px] -mt-1">
                {record.length > 0 ? (
                  <CommonTransactionTable
                    dataResult={record}
                    removeHeaders={["id"]}
                    tableClass=" max-h-40"
                    renderActions={(row, index) =>
                      record.length > 0 ? (
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
                    editableColumns={["Is Urgent"]}
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
          open={isModalOpen}
          aria-labelledby="modal-modal-title"
          onClose={closeModal}
        >
          <Box
            style={{ width: "50%" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-75 bg-background-paper border bg-white border-gray-300 rounded shadow-md p-4"
          >
            <div className="grid grid-cols-2 items-center  mb-3">
              <div className="flex font-bold justify-start">Radiology</div>
              <div className="justify-end">
                <CancelPresentationIconButton onClick={closeModal} />
              </div>
            </div>
            <div className="">
              <div className="border rounded mt-2 p-2 bg-white">
                <Box
                  sx={{
                    "&::-webkit-scrollbar": {
                      width: 7,
                      height: 10,
                      marginY: "4px",
                      overflowY: "auto",
                      overflowX: "hidden",
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
                  className="  w-full h-[70px] pb-2  overflow-y-auto    bg-white  "
                >
                  <div className="flex overflow-auto justify-between  gap-2">
                    <div className="gap-3 px-2 pt-2 ">
                      {chips.map((chip) => {
                        return (
                          <button
                            type="button"
                            key={chip?.id}
                            aria-label={chip?.label}
                            variant="outlined"
                            label={chip?.label}
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
                </Box>
              </div>
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-3  mt-4">
                <DropdownField
                  control={control}
                  error={errors.investigation}
                  name="investigation"
                  placeholder="Investigation *"
                  dataArray={chips}
                  isClearable={true}
                  isSearchable={true}
                />
                <CheckBoxField
                  name="rIsUrgent"
                  error={errors.rIsUrgent}
                  label="Is Urgent"
                  className="whitespace-nowrap"
                  control={control}
                  defaultValue={false}
                />
                <div className="flex justify-end">
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
              {record.length !== 0 ? (
                <div>
                  <div className="-m-1 mt-2">
                    <CommonTransactionTable
                      dataResult={record}
                      removeHeaders={["id"]}
                      tableClass={" max-h-40"}
                      renderActions={(row, index) =>
                        record.length > 0 ? (
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
                      editableColumns={["Is Urgent"]}
                      SelectCheckbox={true}
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <CommonButton
                      label="Reset"
                      type="button"
                      onClick={() => {
                        defaultValue();
                      }}
                      className="h-10 px-3 mx-4 border border-customRed bg-white text-customRed rounded text-base font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition rrrDuration-300 ease-out"
                    />

                    <CommonButton
                      label="Save"
                      type="button"
                      onClick={() => {
                        handleSumbitAll();
                        closeModal();
                      }}
                      className="saveButton bg-[#073763] text-white"
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

export default InvestigationRadiology;
