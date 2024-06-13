import React from "react";
import InputField from "../../../../Common Components/FormFields/InputField";
import SearchDropdown from "../../../../Common Components/FormFields/searchDropdown";
import { useFormContext } from "react-hook-form";

const CardiovascularSystem = () => {
  const {
    control,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();
  const handleChange = () => {};
  return (
    <div>
      <div className="rounded border mt-2 h-auto">
        <div className="bg-[#FFF5D3] sticky  p-1   shadow-md flex gap-8">
          <div className="flex items-center">
            <div className="text-sm  font-semibold flex items-center justify-start ml-2">
              Cardiovascular System (CVS){" "}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2  p-2">
          <InputField
            label="Heart Rate (Per Minute)"
            name="heartRate"
            type="text"
            variant="outlined"
            control={control}
          />
          <SearchDropdown
            handleInputChange={handleChange}
            control={control}
            // error={errors.hospital}
            name="regularIrregular"
            placeholder="Regular/ Irregular"
            dataArray={[]}
            isClearable={true}
            isSearchable={false}
            searchIcon={false}
          />
          <InputField
            label="Heart Sound"
            name="heartSound"
            type="text"
            variant="outlined"
            control={control}
          />
        </div>
      </div>
    </div>
  );
};

export default CardiovascularSystem;
