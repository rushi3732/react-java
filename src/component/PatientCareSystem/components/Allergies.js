import SearchIcon from "@mui/icons-material/Search";
import { Box, Modal, Tooltip } from "@mui/material";
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
import { getAllergiesChips } from "./services/ETUCaseSheetService";
import { capitalizeStatement } from "../../../Common Components/Custom Hooks/CapitalizeStatement";

const Allergies = (props) => {
  const {
    setAllergiesDetails,
    allergiesDetails,
    isAllergiesModalOpen,
    setIsAllergiesModalOpen,
  } = props;
  const [chips, setChips] = useState([
    {
      id: 1,
      label: "Peanuts",
      Allergy: "Peanuts",
      value: "peanuts",
      "Mark Common": true,
    },
    {
      id: 2,
      label: "Dairy",
      Allergy: "Dairy",
      value: "dairy",
      "Mark Common": true,
    },
    {
      id: 3,
      label: "Shellfish",
      Allergy: "Shellfish",
      value: "shellfish",
      "Mark Common": true,
    },
    {
      id: 4,
      label: "Eggs",
      Allergy: "Eggs",
      value: "eggs",
      "Mark Common": true,
    },
    {
      id: 5,
      label: "Wheat",
      Allergy: "Wheat",
      value: "wheat",
      "Mark Common": true,
    },
    {
      id: 6,
      label: "Soy",
      Allergy: "Soy",
      value: "soy",
      "Mark Common": true,
    },
    {
      id: 7,
      label: "Fish",
      Allergy: "Fish",
      value: "fish",
      "Mark Common": true,
    },
    {
      id: 8,
      label: "Tree Nuts",
      Allergy: "Tree Nuts",
      value: "tree_nuts",
      "Mark Common": true,
    },
    {
      id: 9,
      label: "Sesame",
      Allergy: "Sesame",
      value: "sesame",
      "Mark Common": true,
    },
    {
      id: 10,
      label: "Mustard",
      Allergy: "Mustard",
      value: "mustard",
      "Mark Common": true,
    },
    {
      id: 11,
      label: "Allergy 11",
      Allergy: "Allergy 11",
      value: "allergy_11",
      "Mark Common": true,
    },
    {
      id: 12,
      label: "Allergy 12",
      Allergy: "Allergy 12",
      value: "allergy_12",
      "Mark Common": true,
    },
    {
      id: 13,
      label: "Allergy 13",
      Allergy: "Allergy 13",
      value: "allergy_13",
      "Mark Common": true,
    },
    {
      id: 14,
      label: "Allergy 14",
      Allergy: "Allergy 14",
      value: "allergy_14",
      "Mark Common": true,
    },
    {
      id: 15,
      label: "Allergy 15",
      Allergy: "Allergy 15",
      value: "allergy_15",
      "Mark Common": true,
    },
    {
      id: 16,
      label: "Allergy 16",
      Allergy: "Allergy 16",
      value: "allergy_16",
      "Mark Common": true,
    },
    {
      id: 17,
      label: "Allergy 17",
      Allergy: "Allergy 17",
      value: "allergy_17",
      "Mark Common": true,
    },
    {
      id: 18,
      label: "Allergy 18",
      Allergy: "Allergy 18",
      value: "allergy_18",
      "Mark Common": true,
    },
    {
      id: 19,
      label: "Allergy 19",
      Allergy: "Allergy 19",
      value: "allergy_19",
      "Mark Common": true,
    },
    {
      id: 20,
      label: "Allergy 20",
      Allergy: "Allergy 20",
      value: "allergy_20",
      "Mark Common": true,
    },
  ]);
  const [restoreChips, setRestoreChips] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChip, setSelectedChip] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationProps, setConfirmationProps] = useState({});
  const [index, setIndex] = useState();
  const inputRef = useRef();
  const allergyInputRef = useRef(null);

  const {
    setValue,
    control,
    watch,
    trigger,
    register,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const [allergy, description, searchAllergy] = watch([
    "allergy",
    "description",
    "searchAllergy",
  ]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setValue("searchAllergy", null);
    setIsModalOpen(false);
  };

  const openSecondModal = () => {
    setIsAllergiesModalOpen(true);
    if (allergyInputRef.current) {
      allergyInputRef.current.focus();
    }
  };

  const closeSecondModal = () => {
    setSelectedChip(null);
    setIsAllergiesModalOpen(false);
    defaultValue();
  };
  const defaultValue = () => {
    setValue("allergy", null);
    setValue("description", "");
    setIsEditMode(false);
    setSelectedChip(null);
  };

  const renderInput = (row, rowIndex, column) => {
    return (
      <div className="flex">
        {column === "Mark Common" && (
          <input
            type="checkbox"
            name={`Mark Common[${rowIndex}]`}
            className="text-center"
            checked={row["Mark Common"]}
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
      setValue("allergy", null);
    } else {
      setSelectedChip(chip.id);
      setValue("allergy", chip);
      clearErrors("allergy");
    }
  };

  // useEffect(() => {
  //   getAllergiesChips()
  //     .then((res) => res.data.result)
  //     .then((res) => {
  //       setChips(
  //         res.map((item) => ({
  //           id: item?.id,
  //           c: item?.label,
  //           label: item?.label,
  //           value: item?.id,
  //           "Mark Common": item?.isCommon,
  //         }))
  //       );
  //     })
  //     .catch((error) => {
  //       errorAlert(error.message);
  //     });
  // }, []);

  const handleAdd = async () => {
    const isValid = await trigger(["allergy"]);
    if (isValid) {
      const newAllergyValue = capitalizeStatement(allergy.Allergy);
      const isDuplicate = allergiesDetails.some(
        (data) => data.Allergies === newAllergyValue
      );
      if (isDuplicate) {
        warningAlert(
          "Duplicate Allergies value. Please choose a different value"
        );
      } else {
        setAllergiesDetails([
          ...allergiesDetails,
          {
            Allergies: capitalizeStatement(allergy.Allergy),
            id: selectedChip,
            "Allergy Description": capitalizeStatement(description),
          },
        ]);
        defaultValue();
      }
    }
  };

  const handleUpdate = async () => {
    const isValid = await trigger(["allergy", "description"]);
    if (isValid) {
      const newAllergyValue = capitalizeStatement(allergy.Allergy);
      const isDuplicate = allergiesDetails.some(
        (data, i) => i !== index && data.Allergies === newAllergyValue
      );
      if (isDuplicate) {
        warningAlert(
          "Duplicate Allergies value. Please choose a different value"
        );
      } else {
        const updatedData = allergiesDetails.map((data, i) =>
          i === index
            ? {
                Allergies: capitalizeStatement(newAllergyValue),
                id: selectedChip,
                "Allergy Description": capitalizeStatement(description),
              }
            : data
        );
        setAllergiesDetails(updatedData);
        defaultValue();
        setIsEditMode(false);
      }
    }
  };

  const handleSearchClick = () => {
    if (
      searchAllergy !== "" &&
      searchAllergy !== undefined &&
      searchAllergy !== null
    ) {
      // setRestoreChips(chips);
      // setChips([searchAllergy]);
    } else {
      setValue("searchAllergy", null);
    }
  };

  useEffect(() => {
    if (searchAllergy === null) {
      const updatedChips = restoreChips.map((chip) => {
        const matchingChip = chips.find((c) => c.id === chip.id);
        return matchingChip ? { ...matchingChip } : chip;
      });
      // setChips([...restoreChips]);
      // setChips(updatedChips);
    }
  }, [searchAllergy]);

  const handleDataSubmit = () => {
    closeSecondModal();
    setSelectedChip(null);
  };

  const handleEditAllergies = (data, index) => {
    setIndex(index);
    setIsEditMode(true);
    setValue("allergy", {
      id: data?.id,
      value: data?.id,
      label: data?.["Allergies"],
      Allergy: data?.["Allergies"],
    });
    setSelectedChip(data?.id);
    setValue("description", data["Allergy Description"]);
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
    const updatedData = [...allergiesDetails];
    updatedData.splice(index, 1);
    setAllergiesDetails([...updatedData]);
  };

  return (
    <div>
      <div className="rounded border h-60">
        <div className="bg-lime-200 sticky  p-1   shadow-md flex justify-between">
          <div className="flex items-center">
            <div className="text-sm  font-semibold flex items-center justify-start ml-2">
              Allergies
            </div>
          </div>
          <div className="flex justify-end w-1/2  mr-2">
            <div
              className={`px-3 py-[3px] placeholder-slate-300 relative  bg-white rounded text-sm border 
                  border-slate-300 text-slate-600
              outline-none hover:outline-none hover:ring w-2/3 flex justify-between`}
              onClick={() => {
                openSecondModal();
                setSelectedChip(null);
                setValue("allergy", null);
              }}
            >
              <div className="flex justify-start items-center">Allergy</div>
              <div className="flex justify-end">
                <SearchIcon className="text-slate-500 " />
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="flex justify-between gap-3 ">
            <div className="w-full">
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
                className=" h-[108px] pb-2  overflow-y-auto    bg-white  "
              >
                <div className="flex justify-between  gap-3">
                  <div className="gap-3 px-2 pt-2 ">
                    {chips.map((chip, index) => {
                      return chip?.["Mark Common"] === true ? (
                        <button
                          type="button"
                          key={chip?.id}
                          variant="outlined"
                          label={chip?.Allergy}
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
                          {chip?.Allergy}
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
              </Box>

              <div className=" -mt-2 w-full">
                {allergiesDetails?.length > 0 ? (
                  <CommonTransactionTable
                    dataResult={allergiesDetails}
                    removeHeaders={["id", "actions", "label"]}
                    tableClass="h-[120px] -mt-[7px] -mb-2 capitalize"
                    renderActions={(row, index) =>
                      allergiesDetails.length > 0 ? (
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => {
                              handleEditAllergies(row, index);
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
        <ModalComponent
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          dataArray={chips}
          handleSearchClick={handleSearchClick}
          placeholder="Search Allergy "
          isClearable={true}
          control={control}
          dataResult={chips || []}
          renderInput={renderInput && renderInput}
          inputRef={inputRef}
          searchIcon={false}
          removeHeaders={["id", "value", "label"]}
          modalTitle="Allergies"
          label="Search Allergy "
          handleInputChange={(e) => console.log(e)}
          name="searchAllergy"
          error={errors.searchAllergy}
        />
        <Modal
          open={isAllergiesModalOpen}
          aria-labelledby="modal-modal-title"
          onClose={closeSecondModal}
        >
          <Box
            style={{ width: "50%" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-75 bg-background-paper border bg-white border-gray-300 rounded shadow-md p-4"
          >
            <div className="grid grid-cols-2 items-center  mb-3">
              <div className="flex font-bold justify-start">Allergies</div>
              <div className="justify-end mr-2">
                <CancelPresentationIconButton onClick={closeSecondModal} />
              </div>
            </div>
            <div className="">
              <div className="border rounded mt-2  p-[7px] bg-white">
                <div>
                  <div className="gap-3 px-2 pt-2">
                    {chips.map((chip) => (
                      <button
                        type="button"
                        key={chip?.id}
                        variant="outlined"
                        aria-label={chip?.Allergy}
                        onClick={() => {
                          handleClickChip(chip);
                          openSecondModal();
                        }}
                        className={`mr-[5px] mb-1 capitalize h-[27px] px-3 w-max rounded text-sm border border-gray-300 whitespace-nowrap ${
                          chip?.id === selectedChip
                            ? "bg-[#32819b] text-white rounded-full border"
                            : "text-black rounded-full border"
                        }`}
                      >
                        {chip?.Allergy}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2 mt-4">
                <div>
                  <DropdownField
                    control={control}
                    error={errors.allergy}
                    name="allergy"
                    placeholder="Add Allergy *"
                    dataArray={chips?.filter(
                      (val) => val?.["Mark Common"] === true
                    )}
                    isClearable={true}
                    isSearchable={true}
                  />
                </div>
                <div className="flex align-center gap-2">
                  <InputField
                    control={control}
                    name="description"
                    variant="outlined"
                    type="text"
                    label="Allergy Description"
                    dontCapitalize={true}
                    placeholder="Allergy Description"
                    error={errors.description}
                  />
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
              {allergiesDetails.length !== 0 ? (
                <div>
                  <div className=" mt-2  mb-2 ">
                    <CommonTransactionTable
                      dataResult={allergiesDetails}
                      removeHeaders={["id", , "Label"]}
                      tableClass={" max-h-40"}
                      renderActions={(row, index) =>
                        allergiesDetails.length > 0 ? (
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() => handleEditAllergies(row, index)}
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
                  <div className="flex justify-end gap-2">
                    <CommonButton
                      label="Reset"
                      type="button"
                      onClick={() => defaultValue()}
                      className="h-10 px-3 mx-4 border border-customRed bg-white text-customRed rounded text-base font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
                    />
                    <CommonButton
                      label="Save"
                      type="button"
                      onClick={() => handleDataSubmit()}
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

export default Allergies;
