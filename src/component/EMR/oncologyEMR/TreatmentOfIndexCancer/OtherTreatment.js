import React from "react";
import { useFormContext } from "react-hook-form";
import InputField from "../../../../Common Components/FormFields/InputField";

const OtherTreatment = () => {
  const {
    control,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();
  const otherTreatment = [
    { name: "softTissueReconstruction", label: "Soft Tissue Reconstruction" },
    { name: "cyberKnifeSurgery", label: "CyberKnife " },
    { name: "prostatectomy", label: "Prostatectomy" },
    { name: "biopsy", label: "Biopsy" },
    { name: "otherTreatment", label: "Other Treatment" },
  ];
  return (
    <div>
      <div>
        <div className="rounded border h-auto mt-2">
          <div className="bg-[#F2e1Ff] sticky p-1 shadow-md flex gap-8">
            <div className="flex items-center">
              <div className="text-[13px] font-semibold flex items-center justify-start ml-2">
                Other Treatment{" "}
              </div>
            </div>
          </div>
          <div>
            <div className="p-1 bg-white">
              <div className="gap-2 p-2 grid grid-cols-2">
                {otherTreatment?.map((vital, index) => (
                  <div
                    key={index}
                    className={
                      vital.name === "otherTreatment"
                        ? "grid col-span-2"
                        : "grid col-span-1"
                    }
                  >
                    <InputField
                      key={index}
                      label={vital.label}
                      name={vital.name}
                      variant="outlined"
                      type="text"
                      control={control}
                      focused={false}
                      disabled={false}
                      inputProps={{ maxLength: 20 }}
                      onKeyDown={(e) => console.log(e.key)}
                      shrink={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherTreatment;
