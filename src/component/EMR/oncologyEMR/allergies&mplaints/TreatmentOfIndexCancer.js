import React from "react";
import CheckBoxField from "../../../Common Components/FormFields/CheckBoxField";
import { useForm } from "react-hook-form";
import Surgery from "./Surgery";
import Chemotherapy from "./Chemotherapy";

const TreatmentOfIndexCancer = () => {
  const {
    control,
    watch,
    register,
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

  return (
    <div>
      <div className="rounded border mt-2 h-auto">
        <div className="bg-[#FEF5D5] sticky  p-1   shadow-md flex gap-8">
          <div className="flex items-center">
            <div className="text-sm  font-semibold flex items-center justify-start ml-2">
              Treatment Of Index Cancer{" "}
            </div>
          </div>
          <div className=" -my-2 ">
            <CheckBoxField name="surgery" label="Surgery" control={control} />
          </div>
          <div className=" -my-2 ">
            <CheckBoxField
              name="radiotherapy"
              label="Radiotherapy"
              control={control}
            />
          </div>

          <div className=" -my-2 ">
            <CheckBoxField
              name="chemotherapy"
              label="Chemotherapy"
              control={control}
            />
          </div>
        </div>
        <div className="p-2">
          {surgery ? <Surgery /> : ""}
          {/* {radiotherapy ? <Radiotherapy /> : ""} */}
          {chemotherapy ? <Chemotherapy /> : ""}
        </div>
      </div>
    </div>
  );
};

export default TreatmentOfIndexCancer;
