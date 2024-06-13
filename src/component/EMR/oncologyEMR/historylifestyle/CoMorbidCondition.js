import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import InputField from "../../../../Common Components/FormFields/InputField";
import OncologyCommonTransactionTable from "../../Common Components/OncologyCommonTransactionTable";

const CoMorbidCondition = () => {
  const {
    control,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();

  const [dataResultList, setDataResultList] = useState([
    {
      id: 1,
      Select: false,
      Condition: "Diabetes",
      "Age At Disease": "",
      Duration: "",
      "Duration In": "",
      "Details of Condition & Treatment": "",
    },
    {
      id: 2,
      Select: false,
      Condition: "Hypertension",
      "Age At Disease": "",
      Duration: "",
      "Duration In": "",
      "Details of Condition & Treatment": "",
    },
    {
      id: 3,
      Select: false,
      Condition: "Heart Disease",
      "Age At Disease": "",
      Duration: "",
      "Duration In": "",
      "Details of Condition & Treatment": "",
    },
    {
      id: 4,
      Select: false,
      Condition: "Pulmonary Disease",
      "Age At Disease": "",
      Duration: "",
      "Duration In": "",
      "Details of Condition & Treatment": "",
    },
    {
      id: 5,
      Select: false,
      Condition: "Hepatitis",
      "Age At Disease": "",
      Duration: "",
      "Duration In": "",
      "Details of Condition & Treatment": "",
    },
    {
      id: 6,
      Select: false,
      Condition: "History Of Blood Transfusion",
      "Age At Disease": "",
      Duration: "",
      "Duration In": "",
      "Details of Condition & Treatment": "",
    },
    {
      id: 7,
      Select: false,
      Condition: "Other",
      "Age At Disease": "",
      Duration: "",
      "Duration In": "",
      "Details of Condition & Treatment": "",
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

      // Update the dataResultList state to reflect the change
      let tempData = [...dataResultList];
      if (!tempData[index]) {
        tempData[index] = {
          Select: false,
          Condition: "Hypertension",
          "Age At Disease": "",
          Duration: "",
          "Duration In": "",
          "Details of Condition & Treatment": "",
        };
      }
      tempData[index]["Duration In"] = unit;
      setDataResultList(tempData);

      return updatedSelectedUnits;
    });
  };

  useEffect(() => {
    console.log("errors", errors);
    console.log("dataResultList", dataResultList);
  }, [dataResultList]);

  useEffect(() => {
    // Check if the last row exists
    console.log("dataResultList666", dataResultList);

    // if (dataResultList.length > 0) {
    //   const lastRow = dataResultList[dataResultList.length - 1];
    //   const isLastRowFilled =
    //     // lastRow.Select &&
    //     lastRow.Condition &&
    //     lastRow["Age At Disease)"] &&
    //     lastRow["Details of Condition & Treatment"] &&
    //     lastRow.Duration &&
    //     // lastRow.Select &&
    //     lastRow["Duration In"];
    //     console.log("dataResultList66699999", dataResultList);

    //   // If last row is filled, add a new row
    //   console.log("eeeeeee",isLastRowFilled);

    const isLastRowFilled = Object.values(
      dataResultList[dataResultList.length - 1]
    ).every((val) => val !== "");
    if (isLastRowFilled) {
      setDataResultList((prevData) => [
        ...prevData,
        {
          Select: false,
          Condition: "",
          "Age At Disease": "",
          Duration: "",
          "Duration In": "",
          "Details of Condition & Treatment": "",
        },
      ]);
    }
  }, [dataResultList]);

  useEffect(() => {
    if (
      dataResultList.length >= 8 &&
      (dataResultList[dataResultList.length - 2]?.Select,
      dataResultList[dataResultList.length - 2]?.Condition,
      dataResultList[dataResultList.length - 2]?.["Age At Disease"] === "" ||
        dataResultList[dataResultList.length - 2]?.["Age At Disease"] === "" ||
        dataResultList[dataResultList.length - 2]?.Duration === "" ||
        dataResultList[dataResultList.length - 2]?.["Duration In"] === "" ||
        dataResultList[dataResultList.length - 2]?.[
          "Details of Condition & Treatment"
        ] === "")
    ) {
      console.log("Details of Condition & Treatment", dataResultList);
      setDataResultList((prevData) => prevData.slice(0, -1));
    }
  }, [
    dataResultList[dataResultList.length - 2]?.Select,
    dataResultList[dataResultList.length - 2]?.Condition,
    dataResultList[dataResultList.length - 2]?.["Age At Disease"],
    dataResultList[dataResultList.length - 2]?.Duration,
    dataResultList[dataResultList.length - 2]?.["Duration In"],
    dataResultList[dataResultList.length - 2]?.[
      "Details of Condition & Treatment"
    ],
  ]);

  const renderInput = (row, index, header, name) => {
    setValue(`select${index}`, row?.Select);
    setValue(`condition${index}`, row?.Condition);
    setValue(`cancerSitefCancer${index}`, row?.["Cancer Site (If Cancer)"]);
    setValue(`ageAtDisease${index}`, row?.["Age At Disease"]);
    setValue(`duration${index}`, row?.Duration);
    // setValue(`select${index}`, row?.["Duration In"]);
    setValue(
      `detailsofConditionTreatment${index}`,
      row?.["Details of Condition & Treatment"]
    );

    return (
      <div key={`${header}-${index} `} className=" my-[3px]">
        {header === "Condition" && <div>{row.Condition}</div>}

        {header === "Condition" && row.Condition == "" && (
          <div className="  gap-1 w-full">
            <InputField
              name={`condition${index}`}
              control={control}
              variant="outlined"
              label="Condition"
              error={errors[`condition${index}`]}
              inputRef={{
                ...register(`condition${index}`, {
                  onBlur: (e) => {
                    console.log("condition", e.target.value);
                    let tempData = [...dataResultList];
                    if (!tempData[index]) {
                      tempData[index] = {
                        Select: false,
                        Condition: "Other",
                        "Age At Disease": "",
                        Duration: "",
                        "Duration In": "",
                        "Details of Condition & Treatment": "",
                      };
                    }
                    tempData[index]["Condition"] = e.target.value;
                    setDataResultList(tempData);
                  },
                }),
              }}
            />
          </div>
        )}
        {header == "Select" && (
          <div className="flex justify-center">
            <CheckBoxField
              control={control}
              name={`select${index}`}
              defaultChecked={row.Select}
              {...register(`select${index}`)}
            />
          </div>
        )}
        {/* {header === "Disease" && (
          <div className=" grid-cols-2 gap-1 w-full">
            <InputField
              name={`coDisease${index}`}
              control={control}
              variant="outlined"
              label="Site"
              error={errors[`coDisease${index}`]}
              inputRef={{
                ...register(`coDisease${index}`, {
                  onChange: (e) => {
                    let tempData = [...dataResultList];
                    if (!tempData[index]) {
                      tempData[index] = {
                        Select: false,
                        Condition: "Other",
                        "Age At Disease": "",
                        Duration: "",
                        "Duration In": "",
                        "Details of Condition & Treatment": "",
                      };
                    }
                    tempData[index]["Disease"] = e.target.value;
                    setDataResultList(tempData);
                  },
                }),
              }}
            />
          </div>
        )} */}
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
                    let tempData = [...dataResultList];
                    if (!tempData[index]) {
                      tempData[index] = {
                        Select: false,
                        Condition: "Other",
                        "Age At Disease": "",
                        Duration: "",
                        "Duration In": "",
                        "Details of Condition & Treatment": "",
                      };
                    }
                    tempData[index]["Cancer Site (If Cancer)"] = e.target.value;
                    setDataResultList(tempData);
                  },
                }),
              }}
            />
          </div>
        )}
        {header === "Age At Disease" && (
          <div className=" grid-cols-2 gap-1 w-full">
            <InputField
              name={`ageAtDisease${index}`}
              control={control}
              variant="outlined"
              label="Age At Disease"
              error={errors[`ageAtDisease${index}`]}
              inputRef={{
                ...register(`ageAtDisease${index}`, {
                  onChange: (e) => {
                    let tempData = [...dataResultList];
                    if (!tempData[index]) {
                      tempData[index] = {
                        Select: false,
                        Condition: "Other",
                        "Age At Disease": "",
                        Duration: "",
                        "Duration In": "",
                        "Details of Condition & Treatment": "",
                      };
                    }
                    tempData[index]["Age At Disease"] = e.target.value;
                    setDataResultList(tempData);
                  },
                }),
              }}
            />
          </div>
        )}

        {header === "Duration" && (
          <div className=" grid-cols-2 gap-1 w-full">
            <InputField
              name={`duration${index}`}
              control={control}
              variant="outlined"
              label="Duration"
              error={errors[`duration${index}`]}
              inputRef={{
                ...register(`duration${index}`, {
                  onChange: (e) => {
                    let tempData = [...dataResultList];
                    if (!tempData[index]) {
                      tempData[index] = {
                        Select: false,
                        Condition: "Other",
                        "Age At Disease": "",
                        Duration: "",
                        "Duration In": "",
                        "Details of Condition & Treatment": "",
                      };
                    }
                    tempData[index].Duration = e.target.value;
                    setDataResultList(tempData);
                  },
                }),
              }}
            />
          </div>
        )}
        {header === "Duration In" && (
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
        {header === "Details of Condition & Treatment" && (
          <div className=" grid-cols-2 gap-1 w-full">
            <InputField
              name={`detailsofConditionTreatment${index}`}
              control={control}
              variant="outlined"
              label="Details of Condition & Treatment"
              error={errors[`detailsofConditionTreatment${index}`]}
              inputRef={{
                ...register(`detailsofConditionTreatment${index}`, {
                  onChange: (e) => {
                    let tempData = [...dataResultList];
                    if (!tempData[index]) {
                      tempData[index] = {
                        Select: false,
                        Condition: "Other",
                        "Age At Disease": "",
                        Duration: "",
                        "Duration In": "",
                        "Details of Condition & Treatment": "",
                      };
                    }
                    tempData[index]["Details of Condition & Treatment"] =
                      e.target.value;
                    setDataResultList(tempData);
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
        <div className="bg-[#C8DDFD] sticky  p-1   shadow-md flex gap-8">
          <div className="flex items-center">
            <div className="text-sm  font-semibold flex items-center justify-start ml-2">
              Co-Morbid Condition{" "}
            </div>
            <div className="-my-2  ml-6 mr-2">
              <CheckBoxField name="coNill" label="Nill" control={control} />
            </div>
          </div>
        </div>
        <div>
          {dataResultList.length !== 0 ? (
            <div>
              <div className=" -mb-2">
                <OncologyCommonTransactionTable
                  dataResult={dataResultList}
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
                    "Select",
                    "Condition",
                    "Age At Disease",
                    "Duration",
                    "Duration In",
                    "Details of Condition & Treatment",
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

export default CoMorbidCondition;
