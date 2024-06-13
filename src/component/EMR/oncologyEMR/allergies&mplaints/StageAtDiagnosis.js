import React from "react";
import { useFormContext } from "react-hook-form";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import InputField from "../../../../Common Components/FormFields/InputField";

const StageAtDiagnosis = () => {
  const {
    control,
    watch,
    register,
    clearErrors,
    setError,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <div className="rounded border mt-2 lg:h-52  h-56">
        <div className="bg-[#D5FBFE] sticky  p-1   shadow-md flex gap-8">
          <div className="flex items-center">
            <div className="text-sm  font-semibold flex items-center justify-start ml-2">
              Stage At Diagnosis{" "}
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 ">
          <div class="grid grid-cols-1 lg:grid-cols-3 mx-2 md:gap-2 lg:my-4 my-2  lg:pr-2">
            <div class="flex items-center">
              <CheckBoxField name="t" label="T" control={control} />
              <InputField
                label="Stage"
                name="tStage"
                type="number"
                variant="outlined"
                control={control}
                // error={errors[vital.name]}
              />
            </div>
            <div class="flex items-center">
              <CheckBoxField name="n" label="M" control={control} />
              <InputField
                label="Stage"
                name="tStage"
                type="number"
                variant="outlined"
                control={control}
                // error={errors[vital.name]}
              />
            </div>
            <div class="flex items-center">
              <CheckBoxField name="m" label="M" control={control} />
              <InputField
                label="Stage"
                name="tStage"
                type="number"
                variant="outlined"
                control={control}
                // error={errors[vital.name]}
              />
            </div>
          </div>
        </div>

        <div class="">
          <div class="grid grid-cols-12   mx-2 gap-4 lg:my-4 mr-4">
            <div class=" items-center">
              <CheckBoxField name="t" label="" control={control} />
            </div>
            <div className="lg:col-span-11 col-span-10">
              <InputField
                label="Inadequate Information"
                name="tStage"
                type="number"
                variant="outlined"
                control={control}
                // error={errors[vital.name]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageAtDiagnosis;
