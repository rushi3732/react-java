import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import InputField from "../../../../Common Components/FormFields/InputField";
import OncologyCommonTransactionTable from "../../Common Components/OncologyCommonTransactionTable";

const LifestyleHabits = () => {
  const {
    control,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();

  const [dataResultLists, setDataResultListss] = useState([
    {
      id: 1,
      Applicable: false,
      Habit: "Alcohol",
      "Quantity With Unit": "",
      Duration: "",
      "Duration In": "",
      "Age When Started": "",
      Quit: false,
      "Age When Quit": "",
    },
    {
      id: 2,
      Applicable: false,
      Habit: "Beedi",
      "Quantity With Unit": "",
      Duration: "",
      "Duration In": "",
      "Age When Started": "",
      Quit: false,
      "Age When Quit": "",
    },
    {
      id: 3,
      Applicable: false,
      Habit: "Betel Leaves",
      "Quantity With Unit": "",
      Duration: "",
      "Duration In": "",
      "Age When Started": "",
      Quit: false,
      "Age When Quit": "",
    },
    {
      id: 4,
      Applicable: false,
      Habit: "Betel Nut",
      "Quantity With Unit": "",
      Duration: "",
      "Duration In": "",
      "Age When Started": "",
      Quit: false,
      "Age When Quit": "",
    },
    {
      id: 5,
      Applicable: false,
      Habit: "Cigarette",
      "Quantity With Unit": "",
      Duration: "",
      "Duration In": "",
      "Age When Started": "",
      Quit: false,
      "Age When Quit": "",
    },
    {
      id: 6,
      Applicable: false,
      Habit: "Gutkha",
      "Quantity With Unit": "",
      Duration: "",
      "Duration In": "",
      "Age When Started": "",
      Quit: false,
      "Age When Quit": "",
    },
    {
      id: 7,
      Applicable: false,
      Habit: "Masheri",
      "Quantity With Unit": "",
      Duration: "",
      "Duration In": "",
      "Age When Started": "",
      Quit: false,
      "Age When Quit": "",
    },
    {
      id: 8,
      Applicable: false,
      Habit: "Pan Masala",
      "Quantity With Unit": "",
      Duration: "",
      "Duration In": "",
      "Age When Started": "",
      Quit: false,
      "Age When Quit": "",
    },
    {
      id: 9,
      Applicable: false,
      Habit: "Snuff",
      "Quantity With Unit": "",
      Duration: "",
      "Duration In": "",
      "Age When Started": "",
      Quit: false,
      "Age When Quit": "",
    },
    {
      id: 10,
      Applicable: false,
      Habit: "Tobacco Chewing",
      "Quantity With Unit": "",
      Duration: "",
      "Duration In": "",
      "Age When Started": "",
      Quit: false,
      "Age When Quit": "",
    },
    {
      id: 11,
      Applicable: false,
      Habit: "Food Habits (Veg/NonVeg)",
      "Quantity With Unit": "",
      Duration: "",
      "Duration In": "",
      "Age When Started": "",
      Quit: false,
      "Age When Quit": "",
    },
    {
      id: 12,
      Applicable: false,
      Habit: "Other",
      "Quantity With Unit": "",
      Duration: "",
      "Duration In": "",
      "Age When Started": "",
      Quit: false,
      "Age When Quit": "",
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

      // Update the dataResultLists state to reflect the change
      let tempData = [...dataResultLists];
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
      setDataResultListss(tempData);

      return updatedSelectedUnits;
    });
  };

  useEffect(() => {
    console.log("errors", errors);
    console.log("dataResultLists", dataResultLists);
  }, [dataResultLists]);

  useEffect(() => {
    console.log("dataResultLists666", dataResultLists);
    const lastRow = dataResultLists[dataResultLists.length - 1];
    const isLastRowFilled =
      lastRow.Duration &&
      lastRow["Age When Started"] &&
      lastRow["Quantity With Unit"] &&
      lastRow["Duration In"];
    if (isLastRowFilled) {
      setDataResultListss((prevData) => [
        ...prevData,
        {
          Applicable: false,
          Habit: "",
          "Quantity With Unit": "",
          Duration: "",
          "Duration In": "",
          "Age When Started": "",
          Quit: false,
          "Age When Quit": "",
        },
      ]);
    }
  }, [dataResultLists]);

  useEffect(() => {
    if (
      dataResultLists.length >= 13 &&
      (dataResultLists[dataResultLists.length - 2]?.["Quantity With Unit"] ===
        "" ||
        dataResultLists[dataResultLists.length - 2]?.Duration === "" ||
        dataResultLists[dataResultLists.length - 2]?.["Duration In"] === "" ||
        dataResultLists[dataResultLists.length - 2]?.["Age When Started"] ===
          "")
    ) {
      console.log("Details of Condition & Treatment", dataResultLists);
      setDataResultListss((prevData) => prevData.slice(0, -1));
    }
  }, [
    dataResultLists[dataResultLists.length - 2]?.["Quantity With Unit"],
    dataResultLists[dataResultLists.length - 2]?.Duration,
    dataResultLists[dataResultLists.length - 2]?.["Duration In"],
    dataResultLists[dataResultLists.length - 2]?.["Age When Started"],
  ]);

  const renderInput = (row, index, header, name) => {
    setValue(`habit${index}`, row?.Habit !== "" ? row?.Habit : "");
    setValue(
      `quantityWithUnit${index}`,
      row?.["Quantity With Unit"] !== "" ? row?.["Quantity With Unit"] : ""
    );
    setValue(`duration${index}`, row?.Duration !== "" ? row.Duration : "");
    // setValue(
    //   `Shift${index}`,
    //   row["Duration In"] !== "" ? row["Duration In"] : ""
    // );
    setValue(
      `ageWhenStarted${index}`,
      row?.["Age When Started"] !== "" ? row?.["Age When Started"] : ""
    );
    return (
      <div key={`${header}-${index} `} className=" my-[3px]">
        {header == "Applicable" && (
          <div className="flex justify-center">
            <CheckBoxField
              control={control}
              name={`applicable${index}`}
              defaultChecked={row.Applicable}
              {...register(`applicable${index}`)}
            />
          </div>
        )}
        {header === "Habit" && <div>{row.Habit}</div>}

        {header === "Habit" && row.Habit == "" && (
          <div className="  gap-1 w-full">
            <InputField
              name={`habit${index}`}
              control={control}
              variant="outlined"
              label="Habit"
              error={errors[`habit${index}`]}
              inputRef={{
                ...register(`habit${index}`, {
                  onBlur: (e) => {
                    console.log("habit", e.target.value);
                    let tempData = [...dataResultLists];
                    if (!tempData[index]) {
                      tempData[index] = {
                        Applicable: false,
                        Habit: "",
                        "Quantity With Unit": "",
                        Duration: "",
                        "Duration In": "",
                        "Age When Started": "",
                        Quit: false,
                        "Age When Quit": "",
                      };
                    }
                    tempData[index]["Habit"] = e.target.value;
                    setDataResultListss(tempData);
                  },
                }),
              }}
            />
          </div>
        )}
        {header == "Quit" && (
          <div className="flex justify-center">
            <CheckBoxField
              control={control}
              name={`quit${index}`}
              defaultChecked={row.Select}
              {...register(`quit${index}`)}
            />
          </div>
        )}
        {header === "Quantity With Unit" && (
          <div className=" grid-cols-2 gap-1 w-full">
            <InputField
              name={`quantityWithUnit${index}`}
              control={control}
              variant="outlined"
              label="Quantity With Unit"
              error={errors[`quantityWithUnit${index}`]}
              inputRef={{
                ...register(`quantityWithUnit${index}`, {
                  onChange: (e) => {
                    let tempData = [...dataResultLists];
                    if (!tempData[index]) {
                      tempData[index] = {
                        Applicable: false,
                        Habit: "",
                        "Quantity With Unit": "",
                        Duration: "",
                        "Duration In": "",
                        "Age When Started": "",
                        Quit: false,
                        "Age When Quit": "",
                      };
                    }
                    tempData[index]["Quantity With Unit"] = e.target.value;
                    setDataResultListss(tempData);
                  },
                }),
              }}
            />
          </div>
        )}
        {header === "Age When Started" && (
          <div className=" grid-cols-2 gap-1 w-full">
            <InputField
              name={`ageWhenStarted${index}`}
              control={control}
              variant="outlined"
              label="Age When Started"
              error={errors[`ageWhenStarted${index}`]}
              inputRef={{
                ...register(`ageWhenStarted${index}`, {
                  onChange: (e) => {
                    let tempData = [...dataResultLists];
                    if (!tempData[index]) {
                      tempData[index] = {
                        Applicable: false,
                        Habit: "",
                        "Quantity With Unit": "",
                        Duration: "",
                        "Duration In": "",
                        "Age When Started": "",
                        Quit: false,
                        "Age When Quit": "",
                      };
                    }
                    tempData[index]["Age When Started"] = e.target.value;
                    setDataResultListss(tempData);
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
                    let tempData = [...dataResultLists];
                    if (!tempData[index]) {
                      tempData[index] = {
                        Applicable: false,
                        Habit: "",
                        "Quantity With Unit": "",
                        Duration: "",
                        "Duration In": "",
                        "Age When Started": "",
                        Quit: false,
                        "Age When Quit": "",
                      };
                    }
                    tempData[index].Duration = e.target.value;
                    setDataResultListss(tempData);
                  },
                }),
              }}
            />
          </div>
        )}
        {header === "Duration In" && (
          <div className="flex ml-3 gap-1 items-center">
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
        {header === "Age When Quit" && (
          <div className=" grid-cols-2 gap-1 w-full">
            <InputField
              name={`ageWhenQuit${index}`}
              control={control}
              variant="outlined"
              label="Age When Quit"
              error={errors[`detailsofConditionTreatment${index}`]}
              inputRef={{
                ...register(`ageWhenQuit${index}`, {
                  onChange: (e) => {
                    let tempData = [...dataResultLists];
                    if (!tempData[index]) {
                      tempData[index] = {
                        Applicable: false,
                        Habit: "",
                        "Quantity With Unit": "",
                        Duration: "",
                        "Duration In": "",
                        "Age When Started": "",
                        Quit: false,
                      };
                    }
                    tempData[index]["Age When Quit"] = e.target.value;
                    setDataResultListss(tempData);
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
        <div className="bg-[#E3FFD2] sticky  p-1   shadow-md flex gap-8">
          <div className="flex items-center">
            <div className="text-sm  font-semibold flex items-center justify-start ml-2">
              Lifestyle Habits{" "}
            </div>
            <div className="-my-2  ml-6 mr-2">
              <CheckBoxField name="coNill" label="Nill" control={control} />
            </div>
          </div>
        </div>
        <div>
          {dataResultLists.length !== 0 ? (
            <div>
              <div className=" -mb-2">
                <OncologyCommonTransactionTable
                  dataResult={dataResultLists}
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
                    "Applicable",
                    "Habit",
                    "Quantity With Unit",
                    "Duration",
                    "Duration In",
                    "Age When Started",
                    "Quit",
                    "Age When Quit",
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

export default LifestyleHabits;
