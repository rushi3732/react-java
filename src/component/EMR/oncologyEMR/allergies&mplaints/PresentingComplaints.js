import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import * as Yup from "yup";
import InputField from "../../../../Common Components/FormFields/InputField";
import OncologyCommonTransactionTable from "../../Common Components/OncologyCommonTransactionTable";

const validationSchema = Yup.object().shape({
  complaints: Yup.string().required("complaints is required"),
  duration: Yup.string().required("duration is required"),
  select: Yup.string().required("Impression is required"),
});

const defaultValues = {
  complaints: "",
  duration: "",
  select: "",
};

const PresentingComplaints = () => {
  const {
    control,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();

  const [dataResult, setDataResult] = useState([
    {
      Complaints: "",
      Duration: "",
      Select: "",
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

      // Update the dataResult state to reflect the change
      let tempData = [...dataResult];
      if (!tempData[index]) {
        tempData[index] = {
          Complaints: "",
          Duration: "",
          Select: "",
        };
      }
      tempData[index]["Select"] = unit;
      setDataResult(tempData);

      return updatedSelectedUnits;
    });
  };

  useEffect(() => {
    console.log("errors", errors);
    console.log("dataResult", dataResult);
  }, [dataResult]);

  useEffect(() => {
    // Check if the last row exists
    if (dataResult.length > 0) {
      const lastRow = dataResult[dataResult.length - 1];
      const isLastRowFilled =
        lastRow.Complaints && lastRow.Duration && lastRow.Select;

      // If last row is filled, add a new row
      if (isLastRowFilled) {
        setDataResult((prevData) => [
          ...prevData,
          {
            Complaints: "",
            Duration: "",
            Select: "",
          },
        ]);
      }
    }
  }, [dataResult]);

  useEffect(() => {
    if (
      dataResult[dataResult.length - 2]?.Complaints === "" ||
      dataResult[dataResult.length - 2]?.Duration === "" ||
      dataResult[dataResult.length - 2]?.Select === ""
    ) {
      setDataResult((prevData) => prevData.slice(0, -1));
    }
  }, [
    dataResult[dataResult.length - 2]?.Complaints,
    dataResult[dataResult.length - 2]?.Duration,
    dataResult[dataResult.length - 2]?.Select,
  ]);

  const renderInput = (row, index, header, name) => {
    setValue(
      `investigations${index}`,
      row?.Investigations !== null ? row?.Investigations : null
    );
    // handleSetSelectedUnit(index, row?.Status);

    setValue(`date${index}`, row?.Date);
    setValue(`impression${index}`, row?.Impression);
    setValue(`hospitalLab${index}`, row?.["Hospital / Laboratory"]);
    return (
      <div key={`${header}-${index} `} className="my-1">
        {header === "Complaints" && (
          <div className="  gap-1 w-full">
            <InputField
              name={`complaints${index}`}
              control={control}
              variant="outlined"
              label="Complaints"
              error={errors[`complaints${index}`]}
              inputRef={{
                ...register(`complaints${index}`, {
                  onChange: (e) => {
                    console.log("complaints", e.target.value);
                    let tempData = [...dataResult];
                    if (!tempData[index]) {
                      tempData[index] = {
                        Complaints: "",
                        Duration: "",
                        Select: "",
                      };
                    }
                    tempData[index]["Complaints"] = e.target.value;
                    setDataResult(tempData);
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
                    let tempData = [...dataResult];
                    if (!tempData[index]) {
                      tempData[index] = {
                        Complaints: "",
                        Duration: "",
                        Select: "",
                      };
                    }
                    tempData[index].Duration = e.target.value;
                    setDataResult(tempData);
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
      </div>
    );
  };

  return (
    <div>
      <div className="rounded border h-auto mt-2">
        <div className="bg-[#E3FFD2] sticky p-1 shadow-md flex gap-8">
          <div className="flex items-center">
            <div className="text-sm font-semibold flex items-center justify-start ml-2">
              Presenting Complaints{" "}
            </div>
          </div>
        </div>
        <div>
          {dataResult.length !== 0 ? (
            <div>
              <div className=" ">
                <OncologyCommonTransactionTable
                  dataResult={dataResult}
                  removeHeaders={["id", , "Label"]}
                  tableClass={"h-auto"}
                  highlightRow={false}
                  rowBackgroundColor={(row, index) => {
                    return index % 2 === 0 ? "bg-gray-300" : "bg-white";
                  }}
                  handleSelectedRow={(row, index) => {
                    console.log("Selected Row:", row, "Index:", index);
                  }}
                  editableColumns={["Complaints", "Duration", "Select"]}
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

export default PresentingComplaints;
