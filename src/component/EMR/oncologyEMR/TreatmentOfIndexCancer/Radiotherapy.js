import React from "react";
import { useFormContext } from "react-hook-form";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import DatePickerField from "../../../../Common Components/FormFields/DatePickerField";
import InputField from "../../../../Common Components/FormFields/InputField";
import RadioField from "../../../../Common Components/FormFields/RadioField";
import SearchDropdown from "../../../../Common Components/FormFields/searchDropdown";

const Radiotherapy = () => {
  const {
    control,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();

  const patientTypes = [
    {
      id: "1",
      label: "Cobalt",
      value: "1",
    },
    {
      id: "2",
      label: "La",
      value: "2",
    },
    {
      id: "3",
      label: "Tomotherapy",
      value: "3",
    },
  ];
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
  const handleChange = () => {
    console.log();
  };
  return (
    <div>
      <div className="rounded border  mt-2 h-auto">
        <div className="bg-[#E2FFCC] sticky  p-1   shadow-md flex gap-8">
          <div className="flex items-center">
            <div className="text-sm  font-semibold flex items-center justify-start ml-2">
              Radiotherapy{" "}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 px-3  py-2 ">
          <div className=" -pt-2 lg:border-r-2 lg:border-[#000000]">
            <div className="mr-3">
              <div className="   ">
                <div>
                  <CheckBoxField
                    name="externalRT"
                    label="External RT"
                    control={control}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2   gap-2">
                <InputField
                  label="Site"
                  name="site"
                  type="number"
                  variant="outlined"
                  control={control}
                />
                <InputField
                  label="No. Of Fractions "
                  name="noOfFractions"
                  type="number"
                  variant="outlined"
                  control={control}
                />

                <InputField
                  label="Total Dose (cGY)"
                  name="totalDose"
                  type="number"
                  variant="outlined"
                  control={control}
                />
                <div>
                  <InputField
                    label="Response"
                    name="eResponse"
                    type="number"
                    variant="outlined"
                    control={control}
                  />
                </div>
              </div>

              <div className="   grid grid-cols-1   gap-2 mt-2 ">
                <div className="flex gap-2">
                  <div className="">
                    <DatePickerField
                      control={control}
                      name="startDate"
                      label="Start Date "
                      value={new Date()}
                      size="small"
                      inputFormat="dd-MM-yyyy"
                    />
                  </div>
                  <div>
                    <DatePickerField
                      control={control}
                      name="endDate"
                      label="End Date"
                      value={new Date()}
                      size="small"
                      inputFormat="dd-MM-yyyy"
                    />
                  </div>
                </div>
                <div>
                  <SearchDropdown
                    handleInputChange={handleChange}
                    control={control}
                    // error={errors.hospital}
                    name="eHospital"
                    placeholder="Hospital"
                    dataArray={[]}
                    isClearable={true}
                    isSearchable={true}
                    searchIcon={true}
                  />
                </div>
              </div>
              <div className="  mt-2">
                <RadioField
                  control={control}
                  name="patientType"
                  dataArray={patientTypes}
                />
              </div>
              <div className=" flex gap-2  items-center  mt-1">
                <div className="font-semibold  text-[13px]">
                  Treatment Competed :
                </div>
                <div>
                  <div className="pt-2">
                    <RadioField
                      control={control}
                      name="treatmentType"
                      dataArray={treatmentypes}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" pl-3  ">
            <div className="">
              <div className="   ">
                <div>
                  <CheckBoxField
                    name="brachytherapy"
                    label="Brachytherapy"
                    control={control}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2   gap-2">
                <InputField
                  label="Site"
                  name="bSite"
                  type="number"
                  variant="outlined"
                  control={control}
                />
                <InputField
                  label="Intracavitary Interstitial "
                  name="intracavitaryInterstitial"
                  type="number"
                  variant="outlined"
                  control={control}
                />

                <InputField
                  label="HDR/LDR/MDR/PDR"
                  name="hdrldrmdrpdr"
                  type="number"
                  variant="outlined"
                  control={control}
                />

                <InputField
                  label="Total Dose (cGY)"
                  name="totalDosecGY"
                  type="number"
                  variant="outlined"
                  control={control}
                />
              </div>
              <div className="  mt-2">
                <InputField
                  label="Response"
                  name="bresponse"
                  type="number"
                  variant="outlined"
                  control={control}
                />
              </div>
              <div className="mt-2">
                <SearchDropdown
                  handleInputChange={handleChange}
                  control={control}
                  // error={errors.hospital}
                  name="bHospital"
                  placeholder="Hospital"
                  dataArray={[]}
                  isClearable={true}
                  isSearchable={true}
                  searchIcon={true}
                />
              </div>
              <div className=" flex gap-2  items-center  mt-1">
                <div className="font-semibold  text-[13px]">
                  Treatment Competed :
                </div>
                <div>
                  <div className="pt-2">
                    <RadioField
                      control={control}
                      name="treatmentCompetedTypes"
                      dataArray={treatmentypes}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Radiotherapy;
