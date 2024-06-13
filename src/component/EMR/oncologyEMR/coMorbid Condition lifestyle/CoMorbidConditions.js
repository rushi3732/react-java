import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CommonTransactionTable from "../../../Common Components/CommonTable/CommonTransactionTable";
import CheckBoxField from "../../../Common Components/FormFields/CheckBoxField";

const CoMorbidConditions = () => {
  const [dataResult, setDataResult] = useState([
    {
      Condition: "Diabetes",
      "Age at Onset of Disease": "",
      Duration: "",
      "Please Appropriately": "",
      "Details of Condtion & Treatment":
        "Patient diagnosed with pneumonia, treated with antibiotic",
    },
    {
      Condition: "Hypertension",
      "Age at Onset of Disease": "",
      Duration: "",
      "Please Appropriately": "",
      "Details of Condtion & Treatment":
        "Subject experiencing chronic back pain, undergoing physical therapy.",
    },
    {
      Condition: "Heart Disease",
      "Age at Onset of Disease": "",
      Duration: "",
      "Please Appropriately": "",
      "Details of Condtion & Treatment":
        "Individual with diabetes, managing with insulin injections",
    },
    {
      Condition: "Pulmonany Disease",
      "Age at Onset of Disease": "",
      Duration: "",
      "Please Appropriately": "",
      "Details of Condtion & Treatment":
        "Case of appendicitis, resolved through emergency surgery",
    },
    {
      Condition: "Hepatitis",
      "Age at Onset of Disease": "",
      Duration: "",
      "Please Appropriately": "",
      "Details of Condtion & Treatment":
        "Suffering from asthma, prescribed inhalers for symptom control.",
    },
    {
      Condition: "History of Blood Transfusion",
      "Age at Onset of Disease": "",
      Duration: "",
      "Please Appropriately": "",
      "Details of Condtion & Treatment":
        "Diagnosed with hypertension, advised lifestyle medication",
    },
  ]);

  const defaultValues = {
    CoMorbidCondTable: [
      {
        duration: "",
        disease: "",
        detailsofCondtionTreatment: "",
      },
    ],
  };

  const {
    control,
    watch,
    register,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues,
  });

  const [selectedUnits, setSelectedUnits] = useState([]);
  const handleSetSelectedUnit = (index, unit) => {
    setSelectedUnits((prevState) => {
      const updatedSelectedUnits = [...prevState];
      updatedSelectedUnits[index] = unit;

      setDataResult((prevDataResult) => {
        const newDataResult = [...prevDataResult];
        newDataResult[index]["Please Appropriately"] = unit;
        return newDataResult;
      });

      return updatedSelectedUnits;
    });
  };

  const renderInput = (row, index, header) => {
    console.log("row", row, index, header);
    return (
      <div>
        {header === "Please Appropriately" && (
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
        {header === "Age at Onset of Disease" && (
          <div>
            <input
              className={`px-3 py-1 m-1 placeholder-slate-300  bg-white rounded text-sm border ${
                errors[`disease${index}`]
                  ? " border-red-400 text-red-600"
                  : "border-slate-300 text-slate-600"
              }  outline-none focus:outline-none  w-full appearance-none`}
              type="number"
              placeholder="Disease"
              name={`disease${index}`}
              defaultValue={row.quantity}
              {...register(`disease${index}`)}
              onChange={(e) => {
                let tempData = [...dataResult];
                if (tempData[index]) {
                  // Check if 'Age at Onset of Disease' property exists before setting its value
                  tempData[index]["Age at Onset of Disease"] = e.target.value;
                  // Update state with modified data
                  setDataResult(tempData);
                } else {
                  console.error(
                    "Object at index is undefined:",
                    tempData[index]
                  );
                }
                let durationWatch = watch(`duration${index}`);
                if (durationWatch === "" && e.target.value !== "") {
                  setError(`duration${index}`, {
                    type: "required",
                    message: "Required",
                  });
                } else if (e.target.value === "") {
                  clearErrors(`duration${index}`);
                }
                if (e.target.value != "") {
                  clearErrors(`disease${index}`);
                }
              }}
            />
          </div>
        )}
        {header === "Duration" && (
          <div className=" grid-cols-2 gap-1 w-full">
            <input
              className={`px-3 py-1 m-1  bg-white rounded text-sm border ${
                errors[`duration${index}`]
                  ? "border-red-400 text-red-600 placeholder-red-600 "
                  : "border-slate-300 text-slate-600 placeholder-slate-300"
              } outline-none focus:outline-none  appearance-none`}
              type="number"
              placeholder="Duration"
              name={`duration${index}`}
              defaultValue={row.duration}
              {...register(`duration${index}`)}
              onChange={(e) => {
                let tempData = [...dataResult];
                tempData[index].Duration = e.target.value;
                setDataResult(tempData);
                let diseaseWatch = watch(`disease${index}`);
                if (diseaseWatch === "" && e.target.value !== "") {
                  setError(`disease${index}`, {
                    type: "required",
                    message: "Required",
                  });
                } else if (e.target.value === "") {
                  clearErrors(`disease${index}`);
                }
                if (e.target.value != "") {
                  clearErrors(`duration${index}`);
                }
              }}
            />
          </div>
        )}
        {header === "Condition" && <div>{row.Condition}</div>}
        {/* {header === "Condition" && row.Condition == "" && (
          <div className=" grid-cols-2 gap-1 w-full">
            <input
              className={`px-3 py-1 m-1  bg-white rounded text-sm border ${
                errors[`Condition${index}`]
                  ? "border-red-400 text-red-600 placeholder-red-600 "
                  : "border-slate-300 text-slate-600 placeholder-slate-300"
              } outline-none focus:outline-none  appearance-none`}
              type="text"
              placeholder="Condition"
              name={`condition${index}`}
              defaultValue={row.Condition}
              {...register(`condition${index}`)}
              onChange={(e) => {
                let tempData = [...dataResult];
                tempData[index].Condition = e.target.value;
                setDataResult(tempData);
                let diseaseWatch = watch(`condition${index}`);
                if (diseaseWatch === "" && e.target.value !== "") {
                  setError(`condition${index}`, {
                    type: "required",
                    message: "Required",
                  });
                } else if (e.target.value === "") {
                  clearErrors(`disease${index}`);
                }
                if (e.target.value != "") {
                  clearErrors(`duration${index}`);
                }
              }}
            />
          </div>
        )} */}
        {header === "Condition" && row.Condition == "" && (
          <div className=" grid-cols-2 gap-1 w-full">
            <input
              className={`px-3 py-1 m-1  bg-white rounded text-sm border ${
                errors[`Condition${index}`]
                  ? "border-red-400 text-red-600 placeholder-red-600 "
                  : "border-slate-300 text-slate-600 placeholder-slate-300"
              } outline-none focus:outline-none  appearance-none`}
              type="text"
              placeholder="Condition"
              name={`condition${index}`}
              defaultValue={row.Condition}
              {...register(`condition${index}`)}
              onBlur={(e) => {
                let tempData = [...dataResult];
                tempData[index].Condition = e.target.value;
                setDataResult(tempData);
                let diseaseWatch = watch(`condition${index}`);
                if (diseaseWatch === "" && e.target.value !== "") {
                  setError(`condition${index}`, {
                    type: "required",
                    message: "Required",
                  });
                } else if (e.target.value === "") {
                  clearErrors(`disease${index}`);
                }
                if (e.target.value !== "") {
                  clearErrors(`duration${index}`);
                }
              }}
            />
          </div>
        )}

        {header === "Details of Condtion & Treatment" && (
          <input
            className={`px-3 py-1 m-1 placeholder-slate-300  bg-white rounded text-sm border ${
              errors.quantity
                ? "border-red-400 text-red-600 placeholder-red-600 "
                : "border-slate-300 text-slate-600 placeholder-slate-300"
            }  outline-none focus:outline-none  w-full appearance-none`}
            id={`detailsofCondtionTreatment${index}`}
            type="number"
            placeholder="Details Treatment"
            name={`detailsofCondtionTreatment${index}`}
            defaultValue={row.quantity}
            {...register(`detailsofCondtionTreatment${index}`)}
            onChange={(e) => {
              let tempData = [...dataResult];
              tempData[index]["Details of Condtion & Treatment"] =
                e.target.value;
              setDataResult(tempData);
            }}
          />
        )}
      </div>
    );
  };

  useEffect(() => {
    const lastIndex = dataResult.length - 1; // Calculate the index of the last item in dataResult array
    console.log("uuuuuuuu", dataResult);

    if (
      dataResult[lastIndex]?.["Age at Onset of Disease"] !== "" &&
      dataResult[lastIndex]?.["Duration"] !== "" &&
      dataResult[lastIndex]?.["Please Appropriately"] !== ""
    ) {
      // Create a new array with the updated data
      const newDataResult = [
        ...dataResult,
        {
          Condition: "",
          "Age at Onset of Disease": "",
          Duration: "",
          "Please Appropriately": "",
          "Details of Condition & Treatment":
            "Diagnosed with hypertension, advised lifestyle medication",
        },
      ];
      setDataResult(newDataResult);

      console.log("dataResult", newDataResult);
    }
  }, [dataResult]);
  const lastIndex = dataResult.length - 2;

  useEffect(() => {
    console.log("rrrrrrrrrrrrrrrrrr", dataResult);
    if (dataResult.length > 7) {
      const lastIndex = dataResult.length - 1;

      if (
        (dataResult[lastIndex]?.Condition !== "" &&
          dataResult[lastIndex]?.["Age at Onset of Disease"] === "") ||
        dataResult[lastIndex]?.["Duration"] === "" ||
        dataResult[lastIndex]?.["Please Appropriately"] === ""
      ) {
        console.log("Removing last object:", dataResult[lastIndex]);

        // Create a new array without the last object
        const newDataResult = dataResult.slice(0, -1);
        setDataResult(newDataResult);
      }
    }
  }, [
    dataResult[lastIndex]?.["Age at Onset of Disease"],
    dataResult[lastIndex]?.["Duration"],
    dataResult[lastIndex]?.["Please Appropriately"],
  ]);

  return (
    <div className="rounded border h-auto">
      <div className="bg-[#CFFAFE] sticky  p-1   shadow-md flex gap-8">
        <div className="flex items-center">
          <div className="text-sm  font-semibold flex items-center justify-start ml-2">
            Co-Morbid Conditions
          </div>
        </div>
        <div className=" -my-2 mr-2">
          <CheckBoxField name="nil" label="Nil" control={control} />
        </div>
      </div>
      <div>
        {dataResult?.length > 0 ? (
          <CommonTransactionTable
            dataResult={dataResult}
            removeHeaders={["Actions"]}
            tableClass="h-[253px] -mt-[7px] -mb-2 capitalize"
            highlightRow={false}
            rowBackgroundColor={(row, index) => {
              return index % 2 === 0 ? "bg-gray-300" : "bg-white";
            }}
            editableColumns={[
              "Condition",
              "Duration",
              "Age at Onset of Disease",
              "Please Appropriately",
              "Details of Condtion & Treatment",
            ]}
            renderInput={renderInput}
            SelectCheckbox={false}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CoMorbidConditions;
