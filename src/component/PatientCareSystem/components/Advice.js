import { Box, Modal, TableContainer } from "@mui/material";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
import CommonTransactionTable from "../../../Common Components/CommonTable/CommonTransactionTable";
import ConfirmationModal from "../../../Common Components/ConfirmationModal";
import { capitalizeStatement } from "../../../Common Components/Custom Hooks/CapitalizeStatement";
import CreateableSelect from "../../../Common Components/FormFields/CreateableSelect";
import { warningAlert } from "../../../Common Components/Toasts/CustomToasts";
import {
  DeleteIcon,
  EditIcon,
} from "../../../Common Components/assets/commonassets/CommonAssets";
import CommonButton from "../../../Common Components/commonbutton/CommonButton";

const Advice = (props) => {
  const { adviceDetails, setAdviceDetails } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChip, setSelectedChip] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationProps, setConfirmationProps] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [index, setIndex] = useState();
  const [chips, setChips] = useState([
    { id: 1, label: "Take medication with food", value: 1 },
    { id: 2, label: "Get plenty of rest", value: 1 },
    { id: 3, label: "Stay hydrated", value: 1 },
  ]);

  const {
    setValue,
    watch,
    control,
    setError,
    trigger,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const [advice, pIsUrgent] = watch(["advice", "pIsUrgent"]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    defaultValue();
    setSelectedChip(null);
  };

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
            }}
          />
        )}
      </div>
    );
  };

  const handleClickChip = (chip) => {
    if (chip?.id === selectedChip) {
      setSelectedChip(null);
      setValue("advice", null);
    } else {
      setSelectedChip(chip.id);
      setValue("advice", chip);
      clearErrors("advice");
    }
  };

  const handleAdd = async () => {
    const isValid = await trigger("advice");
    if (advice !== null) {
      if (isValid) {
        setAdviceDetails([
          ...adviceDetails,
          {
            id: selectedChip,
            Advice: capitalizeStatement(advice?.label),
          },
        ]);
        defaultValue();
        clearErrors("advice");
      }
    } else {
      setError("advice", { type: "custom", message: "requied" });
    }
  };

  const defaultValue = () => {
    setValue("advice", null);
    setIsEditMode(false);
    setSelectedChip(null);
  };

  const handleUpdate = async () => {
    const isValid = await trigger("advice");
    if (isValid) {
      const newAllergyValue = capitalizeStatement(advice.label);
      const isDuplicate = adviceDetails.some(
        (data, i) => i !== index && data.Advice === newAllergyValue
      );
      if (isDuplicate) {
        warningAlert(
          "Duplicate Allergies value. Please choose a different value"
        );
      } else {
        const updatedData = adviceDetails.map((data, i) =>
          i === index
            ? {
                id: selectedChip,
                Advice: capitalizeStatement(advice?.label),
              }
            : data
        );
        setAdviceDetails(updatedData);
        defaultValue();
        setIsEditMode(false);
      }
    }
  };

  const handleEdit = (data, index) => {
    setIndex(index);
    setIsEditMode(true);
    setValue("advice", {
      id: data?.id,
      value: data?.id,
      label: data["Advice"],
    });
    setSelectedChip(data?.id);
    clearErrors("advice");
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
    const updatedData = [...adviceDetails];
    updatedData.splice(index, 1);
    setAdviceDetails([...updatedData]);
  };

  const handleSubmitAdd = () => {
    setSelectedChip(null);
  };

  return (
    <div>
      <div className="rounded border h-60">
        <div className="bg-[#BEEFFF]  sticky  p-1 border flex justify-between">
          <div className="flex items-center">
            <div className="text-sm font-semibold flex items-center justify-start ml-2">
              Advice
            </div>
          </div>
        </div>

        <div className=" bg-white ">
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
                className="rounded  h-[85px] "
              >
                <div className="flex justify-between gap-3 p-2">
                  <div className="gap-3">
                    {chips.map((chip) => (
                      <button
                        type="button"
                        key={chip?.id}
                        variant="outlined"
                        label={chip?.label}
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
                {adviceDetails?.length > 0 ? (
                  <CommonTransactionTable
                    dataResult={adviceDetails}
                    tableClass={"h-28"}
                    removeHeaders={["id"]}
                    renderActions={(row, index) =>
                      adviceDetails?.length > 0 ? (
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
                    editableColumns={[""]}
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
              <div className="flex font-bold justify-start">Advice</div>
              <div className="justify-end">
                <CancelPresentationIconButton onClick={closeModal} />
              </div>
            </div>
            <div>
              <div className="">
                <div className="border  rounded mt-2 p-2 bg-white">
                  <div>
                    {chips.map((chip) => (
                      <button
                        type="button"
                        key={chip?.id}
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
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-5  mt-4">
                  <div className="col-span-3">
                    <CreateableSelect
                      isDisabled={false}
                      isSearchable={true}
                      placeholdernotVisible={true}
                      showSearch={true}
                      isMulti={false}
                      dataArray={chips}
                      name="advice"
                      placeholder="Select an Advice"
                    />
                  </div>
                  <div className="col-span-2">
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
                {adviceDetails.length !== 0 ? (
                  <div>
                    <div className="mt-2 overflow-auto">
                      <CommonTransactionTable
                        dataResult={adviceDetails}
                        removeHeaders={["id"]}
                        tableClass={"max-h-28 overflow-auto"}
                        renderActions={(row, index) =>
                          adviceDetails?.length > 0 ? (
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
                        editableColumns={[""]}
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
                        className="h-10 px-3 mx-4 border border-customRed bg-white text-customRed rounded text-base font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
                      />

                      <CommonButton
                        label="Save"
                        type="button"
                        onClick={() => {
                          handleSubmitAdd();
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

export default Advice;
