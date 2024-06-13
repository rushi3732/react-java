import React, { useState, useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import CommonTransactionTable from "../../../Common Components/CommonTable/CommonTransactionTable";
import CheckBoxField from "../../../Common Components/FormFields/CheckBoxField";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const FamilyHistory = () => {
  // const schema = Yup.object().shape({
  //   tableData: Yup.array().of(
  //     Yup.object().shape({
  //       relationship: Yup.string().required("Complaints are required"),
  //       disease: Yup.string().required("Duration is required"),
  //       cancerSiteIfCancer: Yup.string().required(
  //         "Please Appropriately is required"
  //       ),
  //       ageAtDisease: Yup.string().required("Complaints are required"),
  //       duration: Yup.string().required("Duration is required"),
  //       select: Yup.string().required("Please Appropriately is required"),
  //       status: Yup.string().required("Please Appropriately is required"),
  //     })
  //   ),
  // });
  const schema = Yup.object().shape({
    tableData: Yup.array().of(
      Yup.object()
        .shape({
          relationship: Yup.string(),
          disease: Yup.string(),
          cancerSiteIfCancer: Yup.string(),
          ageAtDisease: Yup.string(),
          duration: Yup.string(),
          select: Yup.string(),
          status: Yup.string(),
        })
        .test(
          "at-least-one-required",
          "At least one field is required",
          function (value) {
            const {
              relationship,
              disease,
              cancerSiteIfCancer,
              ageAtDisease,
              duration,
              select,
              status,
            } = value;
            return (
              relationship ||
              disease ||
              cancerSiteIfCancer ||
              ageAtDisease ||
              duration ||
              select ||
              status
            );
          }
        )
        .test("all-fields-empty", "All fields must be empty", function (value) {
          const {
            relationship,
            disease,
            cancerSiteIfCancer,
            ageAtDisease,
            duration,
            select,
            status,
          } = value;
          return (
            !relationship &&
            !disease &&
            !cancerSiteIfCancer &&
            !ageAtDisease &&
            !duration &&
            !select &&
            !status
          );
        })
    ),
  });

  const defaultValues = {
    tableData: [
      {
        relationship: "",
        disease: "",
        cancerSiteIfCancer: "",
        ageAtDisease: "",
        duration: "",
        select: "",
        status: "",
      },
    ],
  };

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tableData",
  });

  const [selectedUnits, setSelectedUnits] = useState([]);
  const [previousIndex, setPreviousIndex] = useState(null);

  const handleSetSelectedUnit = (index, unit) => {
    setSelectedUnits((prevState) => {
      const updatedSelectedUnits = [...prevState];
      updatedSelectedUnits[index] = unit;
      setValue(`tableData[${index}].select`, unit);

      // Store previous index and current selection
      const previousSelection = selectedUnits[index];
      const currentSelection = unit;
      setPreviousIndex(index);

      return {
        previousIndex,
        previousSelection,
        currentIndex: index,
        currentSelection,
      };
    });
  };

  let tableWatch = watch(`tableData[${[fields.length - 1]}]`);
  let tableWatch2 = watch(`tableData[${[fields.length - 2]}]`);

  // console.log("tableWa8888888888888tch", fields, dataResult);

  React.useEffect(() => {
    // setDataResult(fields);
  }, [fields]);

  useEffect(() => {
    console.log("rrrrrrrrrrrrrrrrrr999rr", watch("tableData"));

    if (
      tableWatch?.relationship != "" &&
      tableWatch?.disease != "" &&
      tableWatch?.cancerSiteIfCancer != "" &&
      tableWatch?.ageAtDisease != "" &&
      tableWatch?.duration != "" &&
      tableWatch?.select != "" &&
      tableWatch?.status != ""
    ) {
      append({
        relationship: "",
        disease: "",
        cancerSiteIfCancer: "",
        ageAtDisease: "",
        duration: "",
        select: "",
        status: "",
      });

      let newRow = {
        Relationship: "",
        Disease: "",
        "Cancer Site (If Cancer)": "",
        "Age At Disease": "",
        Duration: "",
        Select: "",
        "Status (1 to 5)": "",
      };
      console.log("rrrrrrrrrrrrrrrrrrrr", fields);
      // setDataResult([...dataResult, newRow]);
    }
  }, [
    tableWatch?.relationship,
    tableWatch?.disease,
    tableWatch?.cancerSiteIfCancer,
    tableWatch?.ageAtDisease,
    tableWatch?.duration,
    tableWatch?.select,
    tableWatch?.status,
  ]);

  useEffect(() => {
    if (
      tableWatch2?.relationship === "" ||
      tableWatch2?.disease === "" ||
      tableWatch2?.cancerSiteIfCancer === "" ||
      tableWatch2?.ageAtDisease === "" ||
      tableWatch2?.duration === "" ||
      tableWatch2?.select === "" ||
      tableWatch2?.status === ""
    ) {
      remove(fields.length - 1);
    }
  }, [
    tableWatch2?.relationship,
    tableWatch2?.disease,
    tableWatch2?.cancerSiteIfCancer,
    tableWatch2?.ageAtDisease,
    tableWatch2?.duration,
    tableWatch2?.select,
    tableWatch2?.status,
  ]);

  const renderInput = (row, index, header, name) => {
    console.log("row, index, header", row, index, header);
    return (
      <td key={`${header}-${index}`}>
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
        {header === "Relationship" && (
          <div>
            <Controller
              name={`tableData[${index}].relationship`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`${
                    errors.tableData && errors?.tableData[index]?.relationship
                      ? "border-red-400 text-red-600 placeholder-red-600"
                      : " border-slate-300 placeholder-slate-300"
                  } px-4 py-1  placeholder-slate-300 bg-white rounded text-sm border text-slate-600 outline-none focus:outline-none  w-full appearance-none`}
                  placeholder="Relationship"
                />
              )}
            />
          </div>
        )}
        {header === "Disease" && (
          <div className=" grid-cols-2 gap-1 w-full">
            <Controller
              name={`tableData[${index}].disease`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`${
                    errors.tableData && errors?.tableData[index]?.disease
                      ? "border-red-400 text-red-600 placeholder-red-600"
                      : " border-slate-300 placeholder-slate-300"
                  } px-4 py-1  placeholder-slate-300 bg-white rounded text-sm border text-slate-600 outline-none focus:outline-none  w-full appearance-none`}
                  placeholder="Disease"
                />
              )}
            />
          </div>
        )}
        {header === "Cancer Site (If Cancer)" && (
          <div className=" grid-cols-2 gap-1 w-full">
            <Controller
              name={`tableData[${index}].cancerSiteIfCancer`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`${
                    errors.tableData &&
                    errors?.tableData[index]?.cancerSiteIfCancer
                      ? "border-red-400 text-red-600 placeholder-red-600"
                      : " border-slate-300 placeholder-slate-300"
                  } px-4 py-1  placeholder-slate-300 bg-white rounded text-sm border text-slate-600 outline-none focus:outline-none  w-full appearance-none`}
                  placeholder="Site"
                />
              )}
            />
          </div>
        )}
        {header === "Age At Disease" && (
          <div className=" grid-cols-2 gap-1 w-full">
            <Controller
              name={`tableData[${index}].ageAtDisease`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`${
                    errors.tableData && errors?.tableData[index]?.ageAtDisease
                      ? "border-red-400 text-red-600 placeholder-red-600"
                      : " border-slate-300 placeholder-slate-300"
                  } px-4 py-1  placeholder-slate-300 bg-white rounded text-sm border text-slate-600 outline-none focus:outline-none  w-full appearance-none`}
                  placeholder="Age At Disease"
                />
              )}
            />
          </div>
        )}
        {header === "Details of Condtion & Treatment" && (
          <div>
            <Controller
              name={`tableData[${index}].detailsofCondtionTreatment`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`${
                    errors.tableData &&
                    errors?.tableData[index]?.detailsofCondtionTreatment
                      ? "border-red-400 text-red-600 placeholder-red-600"
                      : " border-slate-300 placeholder-slate-300"
                  } px-4 py-1  placeholder-slate-300 bg-white rounded text-sm border text-slate-600 outline-none focus:outline-none  w-full appearance-none`}
                  placeholder="Details of Condtion & Treatment"
                />
              )}
            />
          </div>
        )}
        {header === "Duration" && (
          <div className=" grid-cols-2 gap-1 w-full">
            <Controller
              name={`tableData[${index}].duration`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`${
                    errors.tableData && errors?.tableData[index]?.duration
                      ? "border-red-400 text-red-600 placeholder-red-600"
                      : " border-slate-300 placeholder-slate-300"
                  } px-4 py-1  placeholder-slate-300 bg-white rounded text-sm border text-slate-600 outline-none focus:outline-none  w-full appearance-none`}
                  placeholder="Duration"
                />
              )}
            />
          </div>
        )}
        {header === "Status" && (
          <div className=" grid-cols-2 gap-1 w-full">
            <Controller
              name={`tableData[${index}].status`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`${
                    errors.tableData && errors?.tableData[index]?.status
                      ? "border-red-400 text-red-600 placeholder-red-600"
                      : " border-slate-300 placeholder-slate-300"
                  } px-4 py-1  placeholder-slate-300 bg-white rounded text-sm border text-slate-600 outline-none focus:outline-none  w-full appearance-none`}
                  placeholder="Status"
                />
              )}
            />
          </div>
        )}
      </td>
    );
  };

  return (
    <div>
      <div className="rounded border mt-2 h-auto">
        <div className="bg-[#FAD9D9] sticky p-1 shadow-md flex gap-8">
          <div className="flex items-center">
            <div className="text-sm font-semibold flex items-center justify-start ml-2">
              Family History
            </div>
          </div>
          <div className="-my-2 mr-2">
            <CheckBoxField
              name="notsignificant"
              label="Not Significant"
              control={control}
            />
          </div>
        </div>
        <div>
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-[#F1F1F1]">
              <tr className="">
                <th
                  scope="col"
                  className="px-1 py-2 text-left text-[13px] whitespace-nowrap font-fold  uppercase tracking-wider"
                >
                  Relationship
                </th>
                <th
                  scope="col"
                  className="px-1 py-2 text-left text-[13px]  whitespace-nowrap font-fold  uppercase tracking-wider"
                >
                  Disease
                </th>
                <th
                  scope="col"
                  className="px-1 py-2 whitespace-nowrap  whitespace-nowrap text-left text-[13px] font-fold  uppercase tracking-wider"
                >
                  Cancer Site (If Cancer)
                </th>
                <th
                  scope="col"
                  className="px-1 py-2 text-left text-[13px]   whitespace-nowrap font-fold  uppercase tracking-wider"
                >
                  Age At Disease
                </th>
                <th
                  scope="col"
                  className="px-1 py-2 text-left text-[13px]  whitespace-nowrap font-fold  uppercase tracking-wider"
                >
                  Duration
                </th>
                <th
                  scope="col"
                  className="px-1 py-2 text-left text-[13px] font-fold  whitespace-nowrap  uppercase tracking-wider"
                >
                  Select
                </th>
                <th
                  scope="col"
                  className="px-1 py-2 text-left text-[13px] font-fold  whitespace-nowrap  uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              {fields.map((field, index) => (
                <tr key={field.id} className="  ">
                  {renderInput(field, index, "Relationship", "relationship")}
                  {renderInput(field, index, "Disease", "disease")}
                  {renderInput(
                    field,
                    index,
                    "Cancer Site (If Cancer)",
                    "cancerSiteIfCancer"
                  )}
                  {renderInput(field, index, "Age At Disease", "ageAtDisease")}
                  {renderInput(field, index, "Duration", "duration")}
                  {renderInput(field, index, "Select", "select")}
                  {renderInput(field, index, "Status", "status")}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FamilyHistory;
