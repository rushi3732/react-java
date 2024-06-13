import React from "react";
import { useFormContext } from "react-hook-form";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import InputField from "../../../../Common Components/FormFields/InputField";

const RespiratorySystem = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <div className="rounded border h-auto mt-2">
        <div className="bg-[#FFD8F4] sticky p-1 shadow-md flex gap-8">
          <div className="flex items-center">
            <div className="text-sm font-semibold flex items-center justify-start ml-2">
              Respiratory System (RS){" "}
            </div>
          </div>
        </div>
        <div className="p-2">
          <div className=" mt-2 gap-2 grid-cols-1 grid lg:grid-cols-2">
            <InputField
              control={control}
              name="rs"
              variant="outlined"
              type="text"
              label="RS"
              dontCapitalize={true}
              placeholder="RS"
              // error={errors.description}
            />
            <InputField
              control={control}
              name="airEntry"
              variant="outlined"
              type="text"
              label="Air Entry"
              dontCapitalize={true}
              placeholder="Air Entry"
              // error={errors.description}
            />
          </div>
          <div className=" mt-2  gap-2 grid-cols-1 grid lg:grid-cols-2">
            <InputField
              control={control}
              name="breathSound"
              variant="outlined"
              type="text"
              label="Breath Sound"
              dontCapitalize={true}
              placeholder="Breath Sound"
              // error={errors.description}
            />
            <div className=" flex  items-center ">
              <CheckBoxField
                name="tracheostomyCheck"
                label=""
                control={control}
              />
              <InputField
                control={control}
                name="tracheostomy"
                variant="outlined"
                type="text"
                label="Tracheostomyy"
                dontCapitalize={true}
                placeholder="Tracheostomy"
                // error={errors.description}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RespiratorySystem;
