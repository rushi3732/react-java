import React from "react";
import { useForm } from "react-hook-form";
import CheckBoxField from "../../../Common Components/FormFields/CheckBoxField";
import Chemotherapy from "./TreatmentOfIndexCancer/Chemotherapy";
import OtherTreatment from "./TreatmentOfIndexCancer/OtherTreatment";
import Radiotherapy from "./TreatmentOfIndexCancer/Radiotherapy";
import Surgery from "./TreatmentOfIndexCancer/Surgery";

const TreatmentOfIndexCancer = () => {
  const {
    control,
    watch,
    register,
    setValue,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      surgery: true,
      radiotherapy: true,
      chemotherapy: true,
    },
  });
  const [chemotherapy, radiotherapy, surgery] = watch([
    "chemotherapy",
    "radiotherapy",
    "surgery",
  ]);

  const toggleCheckbox = (fieldName) => {
    const currentValue = watch(fieldName);
    setValue(fieldName, !currentValue);
  };

  return (
    <div>
      <div>
        <div className="rounded border mt-2 h-auto">
          <div className="bg-[#FEF5D5] sticky  p-1   shadow-md flex gap-8">
            <div className="flex items-center">
              <div className="text-sm  font-semibold flex items-center justify-start ml-2">
                Treatment Of Index Cancer{" "}
              </div>
            </div>
            <div className=" -my-2 ">
              <CheckBoxField
                name="surgery"
                label="Surgery"
                control={control}
                onClick={() => toggleCheckbox("surgery")}
              />
            </div>
            <div className=" -my-2 ">
              <CheckBoxField
                name="radiotherapy"
                label="Radiotherapy"
                control={control}
                onClick={() => toggleCheckbox("radiotherapy")}
              />
            </div>

            <div className=" -my-2 ">
              <CheckBoxField
                name="chemotherapy"
                label="Chemotherapy"
                control={control}
                onClick={() => toggleCheckbox("chemotherapy")}
              />
            </div>
          </div>
          <div className="p-2">
            {surgery ? <Surgery /> : ""}
            {radiotherapy ? <Radiotherapy /> : ""}
            {chemotherapy ? <Chemotherapy /> : ""}
            <OtherTreatment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentOfIndexCancer;
