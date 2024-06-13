import React from "react";
import RadioField from "../../../../Common Components/FormFields/RadioField";
import { useFormContext } from "react-hook-form";
import InputField from "../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";

const HistoryFrom = () => {
  const {
    control,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();
  const patientTypesList = [
    {
      id: "1",
      label: "Patient",
      value: "1",
    },
    {
      id: "2",
      label: "Other",
      value: "2",
    },
  ];
  return (
    <div>
      <div className="rounded border h-auto mt-2">
        <div className="bg-[#D5FBFE] sticky  p-1   shadow-md flex gap-8">
          <div className="flex items-center">
            <div className="text-sm  font-semibold flex items-center justify-start ml-2">
              History From
            </div>
          </div>
        </div>
        <div>
          <div className=" grid grid-cols-1 lg:grid-cols-2 ">
            <div className="items-center lg:border-r  lg:border-[#000000]  flex m-2  ml-2">
              <div>
                <RadioField
                  control={control}
                  name="patientTypesList"
                  dataArray={patientTypesList}
                />
              </div>
              <div>
                <InputField
                  label="Specify"
                  name="specify"
                  type="number"
                  variant="outlined"
                  control={control}
                  //   error={errors[vital.name]}
                />
              </div>
            </div>
            <div className="items-center  flex m-2  ml-2">
              <div>
                <CheckBoxField
                  name="historyNotAssessed"
                  label="History Not Assessed"
                  control={control}
                />
              </div>
              <div>
                <InputField
                  label="Specify Reason"
                  name="specifyReason"
                  type="number"
                  variant="outlined"
                  control={control}
                  //   error={errors[vital.name]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryFrom;
