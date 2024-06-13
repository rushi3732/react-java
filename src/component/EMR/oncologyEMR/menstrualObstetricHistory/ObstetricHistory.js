import React from "react";
import { useFormContext } from "react-hook-form";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import InputField from "../../../../Common Components/FormFields/InputField";

const ObstetricHistory = () => {
  const {
    control,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <div className="rounded border mt-2 h-auto">
        <div className="bg-[#DCF2FF] sticky  p-1   shadow-md flex gap-8">
          <div className="flex items-center">
            <div className="text-sm  font-semibold flex items-center justify-start ml-2">
              Obstetric History{" "}
            </div>
          </div>
          <div className="-my-2 mr-2">
            <CheckBoxField name="unknown" label="Unknown" control={control} />
          </div>
          <div className="-my-2 mr-2">
            <CheckBoxField
              name="notApplicable"
              label="Not Applicable"
              control={control}
            />
          </div>
        </div>
        <div className=" px-3 grid grid-cols-1 lg:grid-cols-6 mt-2 gap-2">
          <InputField
            label="Gravida"
            name="gravida"
            type="number"
            variant="outlined"
            control={control}
          />
          <InputField
            label="Para"
            name="para"
            type="number"
            variant="outlined"
            control={control}
          />
          <InputField
            label="Abortions"
            name="abortions"
            type="number"
            variant="outlined"
            control={control}
          />{" "}
          <InputField
            label="Children"
            name="children"
            type="number"
            variant="outlined"
            control={control}
          />
          <CheckBoxField name="pregnant" label="Pregnant" control={control} />
          <CheckBoxField name="lactating" label="lactating" control={control} />
        </div>
        <div className=" px-3 grid grid-cols-1 lg:grid-cols-6 my-2  gap-2">
          <InputField
            label="Age At First Delivery"
            name="ageAtFirstDelivery"
            type="number"
            variant="outlined"
            control={control}
          />
          <InputField
            label="Age At Last Delivery"
            name="ageAtLastDelivery"
            type="number"
            variant="outlined"
            control={control}
          />
          <InputField
            label="Breast Feeding"
            name="breastFeeding"
            type="number"
            variant="outlined"
            control={control}
          />{" "}
          <InputField
            label="Duration"
            name="duration"
            type="number"
            variant="outlined"
            control={control}
          />
          <div className="col-span-2">
            <InputField
              label="Molar Pregnancy "
              name="molarPregnancy "
              type="number"
              variant="outlined"
              control={control}
            />
          </div>
        </div>
        <div className="my-2 px-3">
          <InputField
            label="Other History"
            name="otherHistory"
            type="number"
            variant="outlined"
            control={control}
          />
        </div>
      </div>
    </div>
  );
};

export default ObstetricHistory;
