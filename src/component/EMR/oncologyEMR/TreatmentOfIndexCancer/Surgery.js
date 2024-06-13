import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import * as Yup from "yup";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import DatePickerField from "../../../../Common Components/FormFields/DatePickerField";
import InputField from "../../../../Common Components/FormFields/InputField";
import OncologyCommonTransactionTable from "../../Common Components/OncologyCommonTransactionTable";

const validationSchema = Yup.object().shape({
  procedure: Yup.string(),
  date: Yup.string(),
  hospitalLaboratory: Yup.string(),
  description: Yup.string(),
  reconstruction: Yup.string(),
  select: Yup.string(),
  status: Yup.string(),
});

const defaultValues = {
  procedure: "",
  date: new Date(),
  hospitalLaboratory: "",
  description: "",
  reconstruction: "",
  select: "",
  status: "",
};

const Surgery = () => {
  const {
    control,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();

  const [dataResult, setDataResult] = useState([
    {
      Procedure: "",
      Date: new Date(),
      "Hospital / Laboratory": "",
      Description: "",
      Reconstruction: "",
    },
  ]);

  useEffect(() => {
    console.log("errors", errors);
    console.log("dataResult", dataResult);
  }, [dataResult]);

  useEffect(() => {
    // Check if the last row exists
    if (dataResult.length > 0) {
      const lastRow = dataResult[dataResult.length - 1];
      const isLastRowFilled =
        lastRow.Procedure &&
        lastRow.Date &&
        lastRow.Description &&
        lastRow.Reconstruction &&
        lastRow["Hospital / Laboratory"];

      // If last row is filled, add a new row
      if (isLastRowFilled) {
        setDataResult((prevData) => [
          ...prevData,
          {
            Procedure: "",
            Date: new Date(),
            "Hospital / Laboratory": "",
            Description: "",
            Reconstruction: "",
          },
        ]);
      }
    }
  }, [dataResult]);

  useEffect(() => {
    if (
      dataResult[dataResult.length - 2]?.Investigations === "" ||
      dataResult[dataResult.length - 2]?.Date === "" ||
      dataResult[dataResult.length - 2]?.Description === "" ||
      dataResult[dataResult.length - 2]?.Reconstruction === "" ||
      dataResult[dataResult.length - 2]?.["Hospital / Laboratory"] === ""
    ) {
      setDataResult((prevData) => prevData.slice(0, -1));
    }
  }, [
    dataResult[dataResult.length - 2]?.Procedure,
    dataResult[dataResult.length - 2]?.Date,
    dataResult[dataResult.length - 2]?.Description,
    dataResult[dataResult.length - 2]?.Reconstruction,
    dataResult[dataResult.length - 2]?.["Hospital / Laboratory"],
  ]);

  const renderInput = (row, index, header, name) => {
    console.log("4444444444", header);
    setValue(`procedure${index}`, row?.Procedure);
    setValue(`date${index}`, row?.Date);
    setValue(`hospitalLaboratory${index}`, row["Hospital / Laboratory"]);
    setValue(`description${index}`, row?.Description);
    setValue(`reconstruction${index}`, row?.Reconstruction);

    console.log("row, index, header", row, index, header);
    return (
      "Procedure",
      "Date",
      "Hospital / Laboratory",
      "Description",
      "Reconstruction",
      (
        <td key={`${header}-${index} `} className="-my-1">
          {header === "Procedure" && (
            <div className=" grid-cols-2 gap-1 w-full">
              <InputField
                name={`procedure${index}`}
                control={control}
                variant="outlined"
                label="Procedure"
                error={errors[`procedure${index}`]}
                inputRef={{
                  ...register(`procedure${index}`, {
                    onChange: (e) => {
                      console.log("procedure", e.target.value);
                      let tempData = [...dataResult];
                      if (!tempData[index]) {
                        tempData[index] = {
                          Procedure: "",
                          Date: new Date(),
                          "Hospital / Laboratory": "",
                          Description: "",
                          Reconstruction: "",
                        };
                      }
                      tempData[index]["Procedure"] = e.target.value;
                      setDataResult(tempData);
                    },
                  }),
                }}
              />
            </div>
          )}
          <div>
            {header === "Date" && (
              <DatePickerField
                control={control}
                name={`date${index}`}
                label="Date"
                value={new Date()}
                size="small"
                inputFormat="dd-MM-yyyy"
                inputRef={{
                  ...register(`date${index}`, {
                    onChange: (e) => {
                      let tempData = [...dataResult];
                      if (!tempData[index]) {
                        tempData[index] = {
                          Procedure: "",
                          Date: new Date(),
                          "Hospital / Laboratory": "",
                          Description: "",
                          Reconstruction: "",
                        };
                      }
                      tempData[index]["Date"] = e.target.value;
                      setDataResult(tempData);
                    },
                  }),
                }}
              />
            )}
          </div>
          {header === "Hospital / Laboratory" && (
            <div className=" grid-cols-2 gap-1 w-full">
              <InputField
                name={`hospitalLaboratory${index}`}
                control={control}
                variant="outlined"
                label="Hospital / Laboratory"
                error={errors[`hospitalLaboratory${index}`]}
                inputRef={{
                  ...register(`hospitalLaboratory${index}`, {
                    onChange: (e) => {
                      console.log("hospitalLaboratory", e.target.value);
                      let tempData = [...dataResult];
                      if (!tempData[index]) {
                        tempData[index] = {
                          Procedure: "",
                          Date: new Date(),
                          "Hospital / Laboratory": "",
                          Description: "",
                          Reconstruction: "",
                        };
                      }
                      tempData[index]["Hospital / Laboratory"] = e.target.value;
                      setDataResult(tempData);
                    },
                  }),
                }}
              />
            </div>
          )}
          {header === "Description" && (
            <div className=" grid-cols-2 gap-1 w-full">
              <InputField
                name={`description${index}`}
                control={control}
                variant="outlined"
                label="Description"
                error={errors[`description${index}`]}
                inputRef={{
                  ...register(`description${index}`, {
                    onChange: (e) => {
                      let tempData = [...dataResult];
                      if (!tempData[index]) {
                        tempData[index] = {
                          Procedure: "",
                          Date: "",
                          "Hospital / Laboratory": "",
                          Description: "",
                          Reconstruction: "",
                        };
                      }
                      tempData[index]["Description"] = e.target.value;
                      setDataResult(tempData);
                    },
                  }),
                }}
              />
            </div>
          )}
          {header === "Reconstruction" && (
            <div className=" grid-cols-2 gap-1 w-full">
              <InputField
                name={`reconstruction${index}`}
                control={control}
                variant="outlined"
                label="Reconstruction"
                error={errors[`reconstruction${index}`]}
                inputRef={{
                  ...register(`reconstruction${index}`, {
                    onChange: (e) => {
                      let tempData = [...dataResult];
                      if (!tempData[index]) {
                        tempData[index] = {
                          Procedure: "",
                          Date: new Date(),
                          "Hospital / Laboratory": "",
                          Description: "",
                          Reconstruction: "",
                        };
                      }
                      tempData[index]["Reconstruction"] = e.target.value;
                      setDataResult(tempData);
                    },
                  }),
                }}
              />
            </div>
          )}
        </td>
      )
    );
  };

  return (
    <div>
      <div className="rounded border h-auto mt-2">
        <div className="bg-[#D9DBFA] sticky p-1 shadow-md flex gap-8">
          <div className="flex items-center">
            <div className="text-sm font-semibold flex items-center justify-start ml-2">
              Surgery{" "}
            </div>
          </div>
          <div className=" mr-2">
            <CheckBoxField name="surgeryNill" label="Nill" control={control} />
          </div>
        </div>
        <div>
          {dataResult.length !== 0 ? (
            <div>
              <div className="-my-2 ">
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
                  editableColumns={[
                    "Procedure",
                    "Date",
                    "Hospital / Laboratory",
                    "Description",
                    "Reconstruction",
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

export default Surgery;
