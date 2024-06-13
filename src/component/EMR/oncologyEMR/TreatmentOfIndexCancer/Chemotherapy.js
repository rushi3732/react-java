import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import CommonTransactionTable from "../../../../Common Components/CommonTable/CommonTransactionTable";
import { capitalizeStatement } from "../../../../Common Components/Custom Hooks/CapitalizeStatement";
import DatePickerField from "../../../../Common Components/FormFields/DatePickerField";
import InputField from "../../../../Common Components/FormFields/InputField";
import RadioField from "../../../../Common Components/FormFields/RadioField";
import SearchDropdown from "../../../../Common Components/FormFields/searchDropdown";
import CommonButton from "../../../../Common Components/commonbutton/CommonButton";

const Chemotherapy = () => {
  const {
    control,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();
  const [isEditMode, setIsEditMode] = useState(false);
  const [dataResult, setDataResult] = useState([]);
  const [drugsList, setDrugsList] = useState([
    {
      id: 1,
      value: 1,
      label: "Tust",
    },
  ]);

  const handleChange = () => {};
  const treatmentypes = [
    {
      id: "1",
      label: "Yes",
      value: "1",
    },
    {
      id: "2",
      label: "No",
      value: "2",
    },
  ];
  const [drugs, details] = watch(["drugs", "details"]);
  const handleAdd = () => {
    if (drugs != null) {
      setDataResult([
        ...dataResult,
        {
          Drugs: capitalizeStatement(drugs?.label),
          id: drugs?.id,
          Details: capitalizeStatement(details),
        },
      ]);
      setValue("drugs", null);
      setValue("details", "");
    }
  };
  return (
    <div>
      <div className="rounded border mt-2 h-auto">
        <div className="bg-[#FFCCAF] sticky  p-1   shadow-md flex gap-8">
          <div className="flex items-center">
            <div className="text-sm  font-semibold flex items-center justify-start ml-2">
              Chemotherapy{" "}
            </div>
          </div>
        </div>
        <div className="p-3 ">
          <div className=" grid  grid-cols-1 lg:grid-cols-4 gap-2">
            <SearchDropdown
              handleInputChange={handleChange}
              control={control}
              // error={errors.hospital}
              name="chemoProtocol"
              placeholder="Chemo Protocol (Type)"
              dataArray={[]}
              isClearable={true}
              isSearchable={false}
              searchIcon={false}
            />
            <InputField
              label="No. Of Cycles"
              name="noOfCycles"
              type="number"
              variant="outlined"
              control={control}
            />
            <div className="">
              <DatePickerField
                control={control}
                name="cStartDate"
                label="Start Date "
                value={new Date()}
                size="small"
                inputFormat="dd-MM-yyyy"
              />
            </div>
            <div>
              <DatePickerField
                control={control}
                name="cEndDate"
                label="End Date"
                value={new Date()}
                size="small"
                inputFormat="dd-MM-yyyy"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 mt-2 lg:grid-cols-4  gap-2">
            <div className=" col-span-2  ">
              <div className=" grid grid-cols-2 gap-2">
                <SearchDropdown
                  handleInputChange={handleChange}
                  control={control}
                  // error={errors.hospital}
                  name="hospital"
                  placeholder="Hospital"
                  dataArray={[]}
                  isClearable={true}
                  isSearchable={true}
                  searchIcon={true}
                />
                <InputField
                  label="Response"
                  name="response"
                  type="number"
                  variant="outlined"
                  control={control}
                />
              </div>
            </div>
            <div className="  col-span-2 flex gap-2  items-center  mt-1">
              <div className="font-semibold  whitespace-nowrap text-[13px]">
                Treatment Competed :
              </div>
              <div className="pt-1">
                <RadioField
                  control={control}
                  name="patientType"
                  dataArray={treatmentypes}
                />
              </div>
            </div>
          </div>
          <div className=" my-2 border-b-2 border-[#575757]"></div>
          <div className="grid  grid-cols-1  gap-2 lg:grid-cols-5">
            <SearchDropdown
              handleInputChange={handleChange}
              control={control}
              // error={errors.hospital}
              name="drugs"
              placeholder="Drugs"
              dataArray={drugsList}
              isClearable={true}
              isSearchable={false}
              searchIcon={true}
            />
            <InputField
              label="Details"
              name="details"
              type="text"
              variant="outlined"
              control={control}
            />
            <CommonButton
              label={"Add"}
              type="button"
              className="border border-blue-500 text-blue-500 hover:shadow px-4 py-2 rounded"
              onClick={() => {
                handleAdd();
              }}
            />
          </div>
          <div className=" mt-2">
            {dataResult?.length > 0 ? (
              <CommonTransactionTable
                dataResult={dataResult}
                removeHeaders={["id", "actions", "label"]}
                tableClass="h-auto -mt-[7px] -mb-2 capitalize"
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
  );
};

export default Chemotherapy;
