import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { errorAlert } from "../../../../Common Components/Toasts/CustomToasts";
import { getAllergiesChips } from "../../../PatientCareSystem/components/services/ETUCaseSheetService";
import SearchDropdown from "../../../../Common Components/FormFields/searchDropdown";
import { Box } from "@mui/material";
import OncologyCommonTransactionTable from "../../Common Components/OncologyCommonTransactionTable";
import InputField from "../../../../Common Components/FormFields/InputField";
import { useEMRContext } from "../EMRContext";

const Allergies = () => {
  const { allergiesDataResult, setAllergiesDataResult } = useEMRContext();
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
  const [selectedChip, setSelectedChip] = useState(null);

  const {
    setValue,
    setError,
    clearErrors,
    watch,
    register,
    control,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    getAllergiesChips()
      .then((res) => res.data.result)
      .then((res) => {
        setChips(
          res.map((item) => ({
            id: item?.id,
            Allergy: item?.label,
            label: item?.label,
            value: item?.id,
            "Mark Common": item?.isCommon,
          }))
        );
      })
      .catch((error) => {
        errorAlert(error.message);
      });
  }, []);

  const handleClickChip = (chip) => {
    setValue(`allergies${0}`, chip);
    setSelectedChip(chip?.id);

    // for (let i = 0; i < allergiesDataResult.length; i++) {
    //   const allergiesValue = watch(`allergies${i}`);
    //   console.log("allergiesValue", allergiesValue, i, allergiesDataResult);
    //   if (allergiesValue === null) {
    //     setValue(`allergies${i}`, chip);
    //   }
    // }
  };

  const handleInputChange = (autoSearchString) => {
    console.log("autoSearchString");
    console.log("autoSearchString");
  };

  useEffect(() => {
    const lastIndex = allergiesDataResult?.length - 1;
    if (
      allergiesDataResult[lastIndex]?.["Allergies"] !== null &&
      allergiesDataResult[lastIndex]?.["Allergy Description"] !== ""
    ) {
      setAllergiesDataResult((prevData) => [
        ...prevData,
        {
          Allergies: null,
          "Allergy Description": "",
        },
      ]);
    }
  }, [allergiesDataResult]);

  const lastIndex = allergiesDataResult?.length - 2;

  useEffect(() => {
    if (
      allergiesDataResult[lastIndex]?.["Allergies"] === null ||
      allergiesDataResult[lastIndex]?.["Allergy Description"] === ""
    ) {
      setAllergiesDataResult((prevData) => prevData.slice(0, -1));
    }
  }, [
    allergiesDataResult[lastIndex]?.["Allergies"],
    allergiesDataResult[lastIndex]?.["Allergy Description"],
  ]);

  const renderInput = (row, index, header) => {
    setValue(`allergies${index}`, row?.Allergies);
    setValue(`disease${index}`, row?.["Allergy Description"]);

    console.log("row", row, index, header);
    return (
      <>
        <div className="w-full grid grid-cols-1 mb-1">
          <div className="w-[450px]">
            {header === "Allergies" && (
              <>
                <SearchDropdown
                  handleInputChange={handleInputChange}
                  control={control}
                  // error={errors.instruction}
                  name={`allergies${index}`}
                  placeholder="Search by Allergies Name"
                  dataArray={chips}
                  isClearable={true}
                  isSearchable={true}
                  searchIcon={true}
                  inputRef={{
                    ...register(`allergies${index}`, {
                      onChange: (e) => {
                        let tempData = [...allergiesDataResult];
                        if (!tempData[index]) {
                          tempData[index] = {
                            Allergies: null,
                            "Allergy Description": "",
                          };
                        }
                        tempData[index]["Allergies"] = e.target.value;
                        setAllergiesDataResult(tempData);
                      },
                    }),
                  }}
                />
              </>
            )}
          </div>
        </div>
        <div className="w-[445px] -mt-1">
          {header === "Allergy Description" && (
            <div>
              {/* <input
                className={`px-3 py-1 m-1 placeholder-[#9e9e9e] focus:border-[#2684ff]  border  focus:border-2 bg-white rounded text-sm  ${
                  errors[`disease${index}`]
                    ? " border-red-400 text-red-600"
                    : "border-[#8b8989] text-slate-600"
                }  outline-none focus:outline-none  w-full appearance-none`}
                type="text"
                placeholder="Allergy Description"
                name={`allergyDescription${index}`}
                defaultValue={row.quantity}
                {...register(`allergyDescription${index}`)}
                onChange={(e) => {
                  let tempData = [...allergiesDataResult];
                  if (!tempData[index]) {
                    tempData[index] = {
                      Allergies: null,
                      "Allergy Description": "",
                    };
                  }
                  if (tempData[index]) {
                    tempData[index]["Allergy Description"] = e.target.value;
                    setallergiesDataResult(tempData);
                    // let durationWatch = watch(`allergyDescription${index}`);
                    // if (durationWatch === "" && e.target.value !== "") {
                    //   setError(`allergyDescription${index}`, {
                    //     type: "required",
                    //     message: "Required",
                    //   });
                    // } else if (e.target.value === "") {
                    //   clearErrors(`duration${index}`);
                    // }
                    // if (e.target.value != "") {
                    //   clearErrors(`disease${index}`);
                    // }
                  }
                }}
              /> */}
              <InputField
                name={`allergyDescription${index}`}
                control={control}
                variant="outlined"
                label="Description"
                error={errors[`allergyDescription${index}`]}
                inputRef={{
                  ...register(`allergyDescription${index}`, {
                    onChange: (e) => {
                      console.log("Allergy Description", e.target.value);
                      let tempData = [...allergiesDataResult];
                      if (!tempData[index]) {
                        tempData[index] = {
                          Allergies: null,
                          "Allergy Description": "",
                        };
                      }
                      tempData[index]["Allergy Description"] = e.target.value;
                      setAllergiesDataResult(tempData);
                    },
                  }),
                }}
              />
            </div>
          )}
        </div>
      </>
    );
  };
  return (
    <div>
      <div className="rounded border h-auto mt-2 mb-2">
        <div className="bg-[#E7D2FF] sticky p-1 shadow-md flex gap-8">
          <div className="flex items-center">
            <div className="text-sm font-semibold flex items-center justify-start ml-2">
              Allergies
            </div>
          </div>
        </div>
        <div>
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
            className=" h-[70px] pb-2  overflow-y-auto    bg-white  "
          >
            <div className="flex justify-between gap-3">
              <div className="gap-3 px-2 pt-2 ">
                {chips.map((chip, index) => (
                  <button
                    type="button"
                    key={`${chip?.id}-${index}`}
                    variant="outlined"
                    label={chip?.Allergy}
                    onClick={() => {
                      handleClickChip(chip);
                      //   openSecondModal();
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
          </Box>
          <div>
            {allergiesDataResult?.length !== 0 ? (
              <div>
                <div className="-mt-2 -mb-[1px] ">
                  <OncologyCommonTransactionTable
                    dataResult={allergiesDataResult}
                    removeHeaders={["id", , "Label"]}
                    tableClass={"h-auto"}
                    highlightRow={false}
                    rowBackgroundColor={(row, index) => {
                      return index % 2 === 0 ? "bg-gray-300" : "bg-white";
                    }}
                    handleSelectedRow={(row, index) => {
                      console.log("Selected Row:", row, "Index:", index);
                    }}
                    editableColumns={["Allergies", "Allergy Description"]}
                    SelectCheckbox={false}
                    renderInput={renderInput}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allergies;
