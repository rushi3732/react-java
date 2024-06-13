import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import * as Yup from "yup";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import DatePickerField from "../../../../Common Components/FormFields/DatePickerField";
import InputField from "../../../../Common Components/FormFields/InputField";
import OncologyCommonTransactionTable from "../../Common Components/OncologyCommonTransactionTable";
import CreateableSelect from "../../../../Common Components/FormFields/CreateableSelect";

const validationSchema = Yup.object().shape({
  investigations: Yup.object().required("Investigations is required"),
  date: Yup.date().required("Date is required"),
  impression: Yup.string().required("Impression is required"),
  hospitalLab: Yup.string().required("Hospital / Laboratory is required"),
});

const defaultValues = {
  investigations: null,
  date: new Date(),
  impression: "",
  hospitalLab: "",
  uploadDocument: "",
};

const DiagnosisOfIndexCancer = () => {
  const {
    control,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();

  const [dataResult, setDataResult] = useState([
    {
      Investigations: null,
      Date: new Date(),
      Impression: "",
      "Hospital / Laboratory": "",
      "Upload Document": "",
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
        lastRow.Investigations &&
        lastRow.Date &&
        lastRow.Impression &&
        lastRow["Hospital / Laboratory"];

      // If last row is filled, add a new row
      if (isLastRowFilled) {
        setDataResult((prevData) => [
          ...prevData,
          {
            Investigations: null,
            Date: new Date(),
            Impression: "",
            "Hospital / Laboratory": "",
            "Upload Document": "",
          },
        ]);
      }
    }
  }, [dataResult]);

  useEffect(() => {
    if (
      dataResult[dataResult.length - 2]?.Investigations === null ||
      dataResult[dataResult.length - 2]?.Date === "" ||
      dataResult[dataResult.length - 2]?.Impression === "" ||
      dataResult[dataResult.length - 2]?.["Hospital / Laboratory"] === ""
    ) {
      setDataResult((prevData) => prevData.slice(0, -1));
    }
  }, [
    dataResult[dataResult.length - 2]?.Investigations,
    dataResult[dataResult.length - 2]?.Date,
    dataResult[dataResult.length - 2]?.Impression,
    dataResult[dataResult.length - 2]?.["Hospital / Laboratory"],
  ]);

  const renderInput = (row, index, header, name) => {
    console.log("4444444444", header);
    setValue(
      `investigations${index}`,
      row?.Investigations !== null ? row?.Investigations : null
    );
    setValue(`date${index}`, row?.Date);
    setValue(`impression${index}`, row?.Impression);
    setValue(`hospitalLab${index}`, row?.["Hospital / Laboratory"]);

    console.log("row, index, header", row, index, header);
    return (
      <td
        key={`${header}-${index} `}
        className="-my-2 "
        style={{ zIndex: "100 !important" }}
      >
        {header === "Investigations" && (
          <div className="w-40">
            <CreateableSelect
              onInputChange={[
                {
                  id: 1,
                  label: "rrr",
                  value: 4,
                },
              ]}
              control={control}
              // error={errors.instruction}
              name={`investigations${index}`}
              label="Investigations"
              placeholder="Investigations"
              dataArray={[
                {
                  id: 1,
                  label: "abs",
                  value: 1,
                },
              ]}
              isSearchable={true}
              searchIcon={true}
              inputRef={{
                ...register(`investigations${index}`, {
                  onChange: (e) => {
                    console.log("rrrrrrrrrrr", e);
                    let tempData = [...dataResult];
                    if (!tempData[index]) {
                      tempData[index] = {
                        Investigations: null,
                        Date: new Date(),
                        Impression: "",
                        "Hospital / Laboratory": "",
                        "Upload Document": "",
                      };
                    }
                    tempData[index]["Investigations"] = e.target.value;
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
                        Investigations: null,
                        Date: new Date(),
                        Impression: "",
                        "Hospital / Laboratory": "",
                        "Upload Document": "",
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
        {header === "Impression" && (
          <div className=" grid-cols-2 gap-1 w-full">
            <InputField
              name={`impression${index}`}
              control={control}
              variant="outlined"
              label="Impression"
              error={errors[`impression${index}`]}
              inputRef={{
                ...register(`impression${index}`, {
                  onChange: (e) => {
                    console.log("Impression", e.target.value);
                    let tempData = [...dataResult];
                    if (!tempData[index]) {
                      tempData[index] = {
                        Investigations: null,
                        Date: new Date(),
                        Impression: "",
                        "Hospital / Laboratory": "",
                        "Upload Document": "",
                      };
                    }
                    tempData[index]["Impression"] = e.target.value;
                    setDataResult(tempData);
                  },
                }),
              }}
            />
          </div>
        )}
        {header === "Hospital / Laboratory" && (
          <div className=" grid-cols-2 gap-1 w-full">
            <InputField
              name={`hospitalLab${index}`}
              control={control}
              variant="outlined"
              label="Hospital / Lab"
              error={errors[`hospitalLab${index}`]}
              inputRef={{
                ...register(`hospitalLab${index}`, {
                  onChange: (e) => {
                    let tempData = [...dataResult];
                    if (!tempData[index]) {
                      tempData[index] = {
                        Investigations: null,
                        Date: new Date(),
                        Impression: "",
                        "Hospital / Laboratory": "",
                        "Upload Document": "",
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
        {header === "Upload Document" && (
          <div className=" flex justify-center ">
            <button key={index} type="button">
              <svg
                width="113"
                height="36"
                viewBox="0 0 113 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1"
                  y="0.5"
                  width="111"
                  height="32"
                  rx="5.5"
                  fill="#FBFDFE"
                />
                <rect
                  x="1"
                  y="0.5"
                  width="111"
                  height="32"
                  rx="5.5"
                  stroke="#073763"
                />
                <g clip-path="url(#clip0_2825_3555)">
                  <path
                    d="M26.8334 17.3333L24.5001 15L22.1667 17.3333"
                    stroke="black"
                    stroke-opacity="0.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M24.5 15V20.25"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M29.3943 18.7275C29.9632 18.4174 30.4127 17.9265 30.6717 17.3326C30.9307 16.7386 30.9846 16.0753 30.8247 15.4473C30.6649 14.8193 30.3005 14.2624 29.789 13.8645C29.2775 13.4667 28.6481 13.2505 28.0001 13.25H27.2651C27.0885 12.5671 26.7594 11.9331 26.3026 11.3956C25.8457 10.8582 25.2729 10.4313 24.6273 10.1471C23.9817 9.86283 23.2801 9.72866 22.5752 9.75463C21.8702 9.7806 21.1804 9.96604 20.5575 10.297C19.9345 10.628 19.3947 11.0958 18.9786 11.6655C18.5625 12.2351 18.281 12.8916 18.1552 13.5857C18.0293 14.2798 18.0625 14.9933 18.2521 15.6728C18.4418 16.3522 18.783 16.9798 19.2501 17.5084"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M26.8334 17.3333L24.5001 15L22.1667 17.3333"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <path
                  d="M44.48 18.57C44.02 18.57 43.6067 18.49 43.24 18.33C42.88 18.1633 42.5967 17.9367 42.39 17.65C42.1833 17.3567 42.0767 17.02 42.07 16.64H43.04C43.0733 16.9667 43.2067 17.2433 43.44 17.47C43.68 17.69 44.0267 17.8 44.48 17.8C44.9133 17.8 45.2533 17.6933 45.5 17.48C45.7533 17.26 45.88 16.98 45.88 16.64C45.88 16.3733 45.8067 16.1567 45.66 15.99C45.5133 15.8233 45.33 15.6967 45.11 15.61C44.89 15.5233 44.5933 15.43 44.22 15.33C43.76 15.21 43.39 15.09 43.11 14.97C42.8367 14.85 42.6 14.6633 42.4 14.41C42.2067 14.15 42.11 13.8033 42.11 13.37C42.11 12.99 42.2067 12.6533 42.4 12.36C42.5933 12.0667 42.8633 11.84 43.21 11.68C43.5633 11.52 43.9667 11.44 44.42 11.44C45.0733 11.44 45.6067 11.6033 46.02 11.93C46.44 12.2567 46.6767 12.69 46.73 13.23H45.73C45.6967 12.9633 45.5567 12.73 45.31 12.53C45.0633 12.3233 44.7367 12.22 44.33 12.22C43.95 12.22 43.64 12.32 43.4 12.52C43.16 12.7133 43.04 12.9867 43.04 13.34C43.04 13.5933 43.11 13.8 43.25 13.96C43.3967 14.12 43.5733 14.2433 43.78 14.33C43.9933 14.41 44.29 14.5033 44.67 14.61C45.13 14.7367 45.5 14.8633 45.78 14.99C46.06 15.11 46.3 15.3 46.5 15.56C46.7 15.8133 46.8 16.16 46.8 16.6C46.8 16.94 46.71 17.26 46.53 17.56C46.35 17.86 46.0833 18.1033 45.73 18.29C45.3767 18.4767 44.96 18.57 44.48 18.57ZM49.0491 12.27V14.6H51.5891V15.35H49.0491V17.75H51.8891V18.5H48.1391V11.52H51.8891V12.27H49.0491ZM54.1761 17.76H56.6161V18.5H53.2661V11.53H54.1761V17.76ZM58.4925 12.27V14.6H61.0325V15.35H58.4925V17.75H61.3325V18.5H57.5825V11.52H61.3325V12.27H58.4925ZM62.3695 15.01C62.3695 14.33 62.5228 13.72 62.8295 13.18C63.1361 12.6333 63.5528 12.2067 64.0795 11.9C64.6128 11.5933 65.2028 11.44 65.8495 11.44C66.6095 11.44 67.2728 11.6233 67.8395 11.99C68.4061 12.3567 68.8195 12.8767 69.0795 13.55H67.9895C67.7961 13.13 67.5161 12.8067 67.1495 12.58C66.7895 12.3533 66.3561 12.24 65.8495 12.24C65.3628 12.24 64.9261 12.3533 64.5395 12.58C64.1528 12.8067 63.8495 13.13 63.6295 13.55C63.4095 13.9633 63.2995 14.45 63.2995 15.01C63.2995 15.5633 63.4095 16.05 63.6295 16.47C63.8495 16.8833 64.1528 17.2033 64.5395 17.43C64.9261 17.6567 65.3628 17.77 65.8495 17.77C66.3561 17.77 66.7895 17.66 67.1495 17.44C67.5161 17.2133 67.7961 16.89 67.9895 16.47H69.0795C68.8195 17.1367 68.4061 17.6533 67.8395 18.02C67.2728 18.38 66.6095 18.56 65.8495 18.56C65.2028 18.56 64.6128 18.41 64.0795 18.11C63.5528 17.8033 63.1361 17.38 62.8295 16.84C62.5228 16.3 62.3695 15.69 62.3695 15.01ZM74.7241 11.53V12.27H72.8241V18.5H71.9141V12.27H70.0041V11.53H74.7241ZM82.4502 11.53V12.27H79.4202V14.62H81.8802V15.36H79.4202V18.5H78.5102V11.53H82.4502ZM84.4593 11.53V18.5H83.5493V11.53H84.4593ZM86.9202 17.76H89.3602V18.5H86.0102V11.53H86.9202V17.76ZM91.2366 12.27V14.6H93.7766V15.35H91.2366V17.75H94.0766V18.5H90.3266V11.52H94.0766V12.27H91.2366Z"
                  fill="#073763"
                />
                <defs>
                  <clipPath id="clip0_2825_3555">
                    <rect
                      width="14"
                      height="14"
                      fill="white"
                      transform="translate(17.5 8)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        )}
      </td>
    );
  };

  return (
    <div>
      <div className="rounded border h-auto mt-2">
        <div className="bg-[#FAD9D9] sticky p-1 shadow-md flex gap-8">
          <div className="flex items-center">
            <div className="text-sm font-semibold flex items-center justify-start ml-2">
              Diagnosis Of Index Cancer{" "}
            </div>
          </div>
          <div className="-my-2 mr-2">
            <CheckBoxField name="nill" label="Nill" control={control} />
          </div>
        </div>
        <div>
          {dataResult.length !== 0 ? (
            <div>
              <div className="-mb-2 ">
                <OncologyCommonTransactionTable
                  dataResult={dataResult}
                  removeHeaders={["id", , "Label"]}
                  tableClass={"h-80"}
                  highlightRow={false}
                  rowBackgroundColor={(row, index) => {
                    return index % 2 === 0 ? "bg-gray-300" : "bg-white";
                  }}
                  handleSelectedRow={(row, index) => {
                    console.log("Selected Row:", row, "Index:", index);
                  }}
                  editableColumns={[
                    "Investigations",
                    "Date",
                    "Impression",
                    "Hospital / Laboratory",
                    "Upload Document",
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

export default DiagnosisOfIndexCancer;
