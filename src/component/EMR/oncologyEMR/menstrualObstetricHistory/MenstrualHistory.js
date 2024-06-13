import React from "react";
import { useFormContext } from "react-hook-form";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import InputField from "../../../../Common Components/FormFields/InputField";
import RadioField from "../../../../Common Components/FormFields/RadioField";
import SearchDropdown from "../../../../Common Components/FormFields/searchDropdown";

const MenstrualHistory = () => {
  const {
    control,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();
  const treatmentypes = [
    {
      id: "1",
      label: "Pre-menarchal",
      value: "1",
    },
    {
      id: "2",
      label: "Pre-Menopausal",
      value: "2",
    },
    {
      id: "1",
      label: "Prei-Menopausal",
      value: "1",
    },
    {
      id: "2",
      label: "Post-Menopausal",
      value: "2",
    },
  ];
  const handleChange = () => {};
  return (
    <div>
      <div className="rounded border mt-2 h-auto">
        <div className="bg-[#FFE5D1] sticky  p-1   shadow-md flex gap-8">
          <div className="flex items-center">
            <div className="text-sm  font-semibold flex items-center justify-start ml-2">
              Menstrual History{" "}
            </div>
          </div>
          <div className="-my-2 mr-2">
            <CheckBoxField name="unknown" label="Unknown" control={control} />
          </div>
        </div>
        <div>
          <div className=" px-3 flex gap-2  items-center  mt-1">
            <div className="font-semibold  text-[13px]">Status :</div>
            <div className=" flex">
              <div className="pt-2    col-span-4 items-center">
                <RadioField
                  control={control}
                  name="patientType"
                  dataArray={treatmentypes}
                />
              </div>
            </div>
          </div>
          <div>
            <div className=" px-3 grid lg:grid-cols-5 gap-4">
              <div className="col-span-3">
                <InputField
                  label="No. Of Fractions "
                  name="LMP"
                  type="number"
                  variant="outlined"
                  control={control}
                />
              </div>
              <div className="col-span-1">
                <CheckBoxField
                  name="unknown2"
                  label="Unknown"
                  control={control}
                />
              </div>
            </div>
          </div>
          <div className=" px-3 grid grid-cols-1 lg:grid-cols-5  mt-2 gap-2">
            <InputField
              label="Age At Menarche "
              name="ageAtMenarche"
              type="number"
              variant="outlined"
              control={control}
            />
            <div>
              <SearchDropdown
                handleInputChange={handleChange}
                control={control}
                // error={errors.hospital}
                name="agAtMenopause"
                placeholder="Age At Menopause"
                dataArray={[]}
                isClearable={true}
                isSearchable={false}
                searchIcon={false}
              />
            </div>
            <div>
              <SearchDropdown
                handleInputChange={handleChange}
                control={control}
                // error={errors.hospital}
                name="menstrualCycles"
                placeholder="Menstrual Cycles"
                dataArray={[]}
                isClearable={true}
                isSearchable={false}
                searchIcon={false}
              />
            </div>
            <InputField
              label="Menstrual Flow "
              name="menstrualFlow"
              type="number"
              variant="outlined"
              control={control}
            />
            <InputField
              label="Dysmenorrhea "
              name="dysmenorrhea"
              type="number"
              variant="outlined"
              control={control}
            />
          </div>
        </div>
        <div className="grid grid-cols-5  px-3 my-2">
          <div className="col-span-3">
            <InputField
              label="Menstrual Abnormalities "
              name="menstrualAbnormalities"
              type="number"
              variant="outlined"
              control={control}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenstrualHistory;
