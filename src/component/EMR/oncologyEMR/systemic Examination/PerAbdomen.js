import React from "react";
import { useFormContext } from "react-hook-form";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import InputField from "../../../../Common Components/FormFields/InputField";

const PerAbdomen = () => {
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
        <div className="bg-[#FFD3D3] sticky p-1 shadow-md flex gap-8">
          <div className="flex items-center">
            <div className="text-sm font-semibold flex items-center justify-start ml-2">
              Per Abdomen (PA){" "}
            </div>
          </div>
        </div>
        <div className="p-2">
          <div className=" mt-2 gap-2 grid-cols-1 grid lg:grid-cols-2">
            <InputField
              control={control}
              name="pa"
              variant="outlined"
              type="text"
              label="PA"
              dontCapitalize={true}
              placeholder="PA"
              // error={errors.description}
            />
            <InputField
              control={control}
              name="liver"
              variant="outlined"
              type="text"
              label="Liver"
              dontCapitalize={true}
              placeholder="Liver"
              // error={errors.description}
            />
          </div>
          <div className=" mt-2  gap-2 grid-cols-1 grid lg:grid-cols-2">
            <InputField
              control={control}
              name="spleen"
              variant="outlined"
              type="text"
              label="Spleen"
              dontCapitalize={true}
              placeholder="Spleen"
              // error={errors.description}
            />
            <div className=" flex  items-center ">
              <CheckBoxField name="ascitisCheck" label="" control={control} />
              <InputField
                control={control}
                name="ascitis"
                variant="outlined"
                type="text"
                label="Ascitis (Mild/ Moderate/ Massive)"
                dontCapitalize={true}
                placeholder="Ascitis (Mild/ Moderate/ Massive)"
                // error={errors.description}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerAbdomen;
