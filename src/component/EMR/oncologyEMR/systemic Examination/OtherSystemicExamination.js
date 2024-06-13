import React from "react";
import { useFormContext } from "react-hook-form";
import InputArea from "../../../../Common Components/FormFields/InputArea";

const OtherSystemicExamination = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <div className="rounded border  mt-2 h-auto">
        <div className="bg-[#FFF5D3] sticky  p-1   shadow-md flex  gap-8">
          <div className="flex items-center">
            <div className="text-sm  font-semibold flex items-center justify-start ml-2">
              Other Systemic Examination{" "}
            </div>
          </div>
        </div>
        <div className="">
          <InputArea
            minRows={7}
            maxRows={8}
            control={control}
            name="otherSystemicExamination"
            placeholder="Other Systemic Examination"
            label="Other Systemic Examination"
            disabled={null}
          />
        </div>
      </div>
    </div>
  );
};

export default OtherSystemicExamination;
