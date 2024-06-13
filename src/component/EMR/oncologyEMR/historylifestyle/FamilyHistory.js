import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import InputField from "../../../../Common Components/FormFields/InputField";
import OncologyCommonTransactionTable from "../../Common Components/OncologyCommonTransactionTable";

const FamilyHistory = () => {
  const {
    control,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();

  const [dataResultListing, setDataResultListing] = useState([
    {
      id: 1,
      Relationship: "",
      Disease: "",
      "Cancer Site (If Cancer)": "",
      "Age At Disease": "",
      Duration: "",
      Select: "",
      Status: "",
    },
    {
      id: 2,
      Relationship: "",
      Disease: "",
      "Cancer Site (If Cancer)": "",
      "Age At Disease": "",
      Duration: "",
      Select: "",
      Status: "",
    },
    {
      id: 3,
      Relationship: "",
      Disease: "",
      "Cancer Site (If Cancer)": "",
      "Age At Disease": "",
      Duration: "",
      Select: "",
      Status: "",
    },
  ]);

  const [selectedUnits, setSelectedUnits] = useState([]);
  const handleSetSelectedUnit = (index, unit) => {
    setSelectedUnits((prevState) => {
      // Check if the clicked button is already selected
      if (prevState[index] === unit) {
        // If already selected, deselect it
        unit = "";
      }

      const updatedSelectedUnits = [...prevState];
      updatedSelectedUnits[index] = unit;

      // Update the dataResultListing state to reflect the change
      let tempData = [...dataResultListing];
      if (!tempData[index]) {
        tempData[index] = {
          Complaints: "",
          Duration: "",
          Select: "",
        };
      }
      tempData[index]["Select"] = unit;
      setDataResultListing(tempData);

      return updatedSelectedUnits;
    });
  };

  useEffect(() => {
    console.log("errors", errors);
    console.log("dataResultListing", dataResultListing);
  }, [dataResultListing]);

  useEffect(() => {
    // Check if the last row exists
    if (dataResultListing.length > 0) {
      const lastRow = dataResultListing[dataResultListing.length - 1];
      const isLastRowFilled =
        lastRow.Relationship &&
        lastRow.Disease &&
        lastRow["Cancer Site (If Cancer)"] &&
        lastRow["Age At Disease"] &&
        lastRow.Duration &&
        lastRow.Select &&
        lastRow.Status;

      // If last row is filled, add a new row
      if (isLastRowFilled) {
        setDataResultListing((prevData) => [
          ...prevData,
          {
            Relationship: "",
            Disease: "",
            "Cancer Site (If Cancer)": "",
            "Age At Disease": "",
            Duration: "",
            Select: "",
            Status: "",
          },
        ]);
      }
    }
    console.log("dataResultListing", dataResultListing);
  }, [dataResultListing]);

  useEffect(() => {
    if (
      (dataResultListing[dataResultListing.length - 2]?.Relationship,
      dataResultListing[dataResultListing.length - 2]?.Disease,
      dataResultListing[dataResultListing.length - 2]?.[
        "Cancer Site (If Cancer)"
      ] === "" ||
        dataResultListing[dataResultListing.length - 2]?.["Age At Disease"] ===
          "" ||
        dataResultListing[dataResultListing.length - 2]?.Duration === "" ||
        dataResultListing[dataResultListing.length - 2]?.Status === "" ||
        dataResultListing[dataResultListing.length - 2]?.["Select"] === "")
    ) {
      setDataResultListing((prevData) => prevData.slice(0, -1));
    }
  }, [
    dataResultListing[dataResultListing.length - 2]?.Relationship,
    dataResultListing[dataResultListing.length - 2]?.Disease,
    dataResultListing[dataResultListing.length - 2]?.[
      "Cancer Site (If Cancer)"
    ],
    dataResultListing[dataResultListing.length - 2]?.["Age At Disease"],
    dataResultListing[dataResultListing.length - 2]?.Duration,
    dataResultListing[dataResultListing.length - 2]?.Status,
    dataResultListing[dataResultListing.length - 2]?.["Select"],
  ]);

  const renderInput = (row, index, header, name) => {
    setValue(
      `investigations${index}`,
      row?.Investigations !== null ? row?.Investigations : null
    );
    // handleSetSelectedUnit(index, row?.Status);

    setValue(`relationship${index}`, row?.Relationship);
    setValue(`disease${index}`, row?.Disease);
    setValue(`cancerSitefCancer${index}`, row?.["Cancer Site (If Cancer)"]);
    setValue(`fAgeAtDisease${index}`, row?.["Age At Disease"]);
    setValue(`fDuration${index}`, row?.Duration);
    setValue(`select${index}`, row?.["Select"]);
    setValue(`status${index}`, row?.["Status"]);

    return (
      <div key={`${header}-${index} `} className="my-1">
        {header === "Relationship" && (
          <div className="  gap-1 w-full">
            <InputField
              name={`relationship${index}`}
              control={control}
              variant="outlined"
              label="Relationship"
              error={errors[`relationship${index}`]}
              inputRef={{
                ...register(`relationship${index}`, {
                  onChange: (e) => {
                    console.log("relationship", e.target.value);
                    let tempData = [...dataResultListing];
                    if (!tempData[index]) {
                      tempData[index] = {
                        Relationship: "",
                        Disease: "",
                        "Cancer Site (If Cancer)": "",
                        "Age At Disease": "",
                        Duration: "",
                        Select: "",
                        Status: "",
                      };
                    }
                    tempData[index]["Relationship"] = e.target.value;
                    setDataResultListing(tempData);
                  },
                }),
              }}
            />
          </div>
        )}
        {header === "Disease" && (
          <div className=" grid-cols-2 gap-1 w-full">
            <InputField
              name={`disease${index}`}
              control={control}
              variant="outlined"
              label="Disease"
              error={errors[`disease${index}`]}
              inputRef={{
                ...register(`disease${index}`, {
                  onChange: (e) => {
                    let tempData = [...dataResultListing];
                    if (!tempData[index]) {
                      tempData[index] = {
                        Relationship: "",
                        Disease: "",
                        "Cancer Site (If Cancer)": "",
                        "Age At Disease": "",
                        Duration: "",
                        Select: "",
                        Status: "",
                      };
                    }
                    tempData[index]["Disease"] = e.target.value;
                    setDataResultListing(tempData);
                  },
                }),
              }}
            />
          </div>
        )}
        {header === "Cancer Site (If Cancer)" && (
          <div className=" grid-cols-2 gap-1 w-full">
            <InputField
              name={`cancerSitefCancer${index}`}
              control={control}
              variant="outlined"
              label="Site"
              error={errors[`cancerSitefCancer${index}`]}
              inputRef={{
                ...register(`cancerSitefCancer${index}`, {
                  onChange: (e) => {
                    let tempData = [...dataResultListing];
                    if (!tempData[index]) {
                      tempData[index] = {
                        Relationship: "",
                        Disease: "",
                        "Cancer Site (If Cancer)": "",
                        "Age At Disease": "",
                        Duration: "",
                        Select: "",
                        Status: "",
                      };
                    }
                    tempData[index]["Cancer Site (If Cancer)"] = e.target.value;
                    setDataResultListing(tempData);
                  },
                }),
              }}
            />
          </div>
        )}
        {header === "Age At Disease" && (
          <div className=" grid-cols-2 gap-1 w-full">
            <InputField
              name={`fAgeAtDisease${index}`}
              control={control}
              variant="outlined"
              label="Age At Disease"
              error={errors[`fAgeAtDisease${index}`]}
              inputRef={{
                ...register(`fAgeAtDisease${index}`, {
                  onChange: (e) => {
                    let tempData = [...dataResultListing];
                    if (!tempData[index]) {
                      tempData[index] = {
                        Relationship: "",
                        Disease: "",
                        "Cancer Site (If Cancer)": "",
                        "Age At Disease": "",
                        Duration: "",
                        Select: "",
                        Status: "",
                      };
                    }
                    tempData[index]["Age At Disease"] = e.target.value;
                    setDataResultListing(tempData);
                  },
                }),
              }}
            />
          </div>
        )}
        {header === "Duration" && (
          <div className=" grid-cols-2 gap-1 w-full">
            <InputField
              name={`fDuration${index}`}
              control={control}
              variant="outlined"
              label="Duration"
              error={errors[`fDuration${index}`]}
              inputRef={{
                ...register(`fDuration${index}`, {
                  onChange: (e) => {
                    let tempData = [...dataResultListing];
                    if (!tempData[index]) {
                      tempData[index] = {
                        Complaints: "",
                        Duration: "",
                        Select: "",
                      };
                    }
                    tempData[index].Duration = e.target.value;
                    setDataResultListing(tempData);
                  },
                }),
              }}
            />
          </div>
        )}
        {header === "Select" && (
          <div className="flex gap-1 items-center">
            {["D", "W", "M", "Y"].map((unit, i) => (
              <button
                key={i}
                type="button"
                className={`border w-5 h-5 text-xs font-semibold pt-[1px] pl-[0.5px] text-center rounded-full ${
                  selectedUnits[index] === unit
                    ? "bg-[#839B20] border-[#839B20] text-white"
                    : unit === "D"
                    ? "border-[#CB8636] text-[#CB8636]"
                    : unit === "W"
                    ? "border-[#29A067] text-[#29A067]"
                    : unit === "M"
                    ? "border-[#839B20] text-[#839B20]"
                    : unit === "Y"
                    ? "border-[#3A68C0] text-[#3A68C0]"
                    : ""
                }`}
                onClick={() => handleSetSelectedUnit(index, unit)}
              >
                {unit}
              </button>
            ))}
          </div>
        )}
        {header === "Status" && (
          <div className=" grid-cols-2 gap-1 w-full">
            <InputField
              name={`status${index}`}
              control={control}
              variant="outlined"
              label="Status"
              error={errors[`status${index}`]}
              inputRef={{
                ...register(`status${index}`, {
                  onChange: (e) => {
                    let tempData = [...dataResultListing];
                    if (!tempData[index]) {
                      tempData[index] = {
                        Relationship: "",
                        Disease: "",
                        "Cancer Site (If Cancer)": "",
                        "Age At Disease": "",
                        Duration: "",
                        Select: "",
                        Status: "",
                      };
                    }
                    tempData[index].Status = e.target.value;
                    setDataResultListing(tempData);
                  },
                }),
              }}
            />
          </div>
        )}
      </div>
    );
  };
  return (
    <div>
      <div className="rounded border mt-2 h-auto">
        <div className="bg-[#FAD9D9] sticky  p-1   shadow-md flex gap-8">
          <div className="flex items-center">
            <div className="text-sm  font-semibold flex items-center justify-start ml-2">
              Family History{" "}
            </div>
            <div className="-my-2  ml-6 mr-2">
              <CheckBoxField
                name="notSignificant"
                label="Not Significant"
                control={control}
              />
            </div>
          </div>
        </div>
        <div>
          {dataResultListing.length !== 0 ? (
            <div>
              <div className=" -mb-2">
                <OncologyCommonTransactionTable
                  dataResult={dataResultListing}
                  removeHeaders={["id", , "Label"]}
                  tableClass={"h-auto"}
                  highlightRow={false}
                  rowBackgroundColor={(row, index) => {
                    return index % 2 === 0 ? "bg-gray-300" : "bg-white";
                  }}
                  handleSelectedRow={(row, index) => {
                    console.log("Selected Row:", row, "Index:", index);
                  }}
                  editableColumns={[
                    "Relationship",
                    "Disease",
                    "Cancer Site (If Cancer)",
                    "Age At Disease",
                    "Duration",
                    "Select",
                    "Status",
                  ]}
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
  );
};

export default FamilyHistory;
