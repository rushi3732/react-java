import React from "react";
import RadioField from "../../../../Common Components/FormFields/RadioField";
import { useFormContext } from "react-hook-form";

const VulnerablePatient = () => {
  const {
    control,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();
  const vulnerablePatientTypes = [
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
  return (
    <div className="border flex border-[#D9D9D9] rounded items-center gap-2 px-2 mt-2">
      <label className=" font-semibold  text-sm   mr-2 ">
        Vulnerable Patient :
      </label>
      <div className=" mt-2 ">
        <RadioField
          control={control}
          name="patientType"
          dataArray={vulnerablePatientTypes}
        />
      </div>
    </div>
  );
};

export default VulnerablePatient;
