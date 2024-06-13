import React from "react";
import { useFormContext } from "react-hook-form";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import InputArea from "../../../../Common Components/FormFields/InputArea";
const SignficantPastHistory = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <div className="rounded border  mt-2 h-auto">
        <div className="bg-[#CBFFF3] sticky  p-1   shadow-md flex  gap-8">
          <div className="flex items-center">
            <div className="text-sm  font-semibold flex items-center justify-start ml-2">
              Significant Past History
            </div>
          </div>
          <div className=" -my-2 mr-2">
            <CheckBoxField
              name="notsignificant"
              label="Not Significant"
              control={control}
            />
          </div>
        </div>
        <div className="">
          <InputArea
            minRows={7}
            maxRows={8}
            control={control}
            name="significantPastHistory"
            placeholder="Significant Past History"
            label="Significant Past History"
            disabled={null}
          />
        </div>
      </div>
    </div>
  );
};

export default SignficantPastHistory;
