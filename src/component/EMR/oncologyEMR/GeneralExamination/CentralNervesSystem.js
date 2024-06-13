import React from "react";
import { useFormContext } from "react-hook-form";
import InputField from "../../../../Common Components/FormFields/InputField";

const CentralNervesSystem = () => {
  const {
    control,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();
  const otherTreatment = [
    { name: "consciousness", label: "Consciousness" },
    { name: "reflexes", label: "Reflexes" },
    { name: "sensorySystem", label: "Sensory System" },
    { name: "cranialNerves", label: "Cranial Nerves" },
    { name: "motorSystem", label: "Motor System" },
  ];
  return (
    <div>
      <div className="rounded border h-auto mt-2">
        <div className="bg-[#BDEFFF] sticky p-1 shadow-md flex gap-8">
          <div className="flex items-center">
            <div className="text-[13px] font-semibold flex items-center justify-start ml-2">
              Central Nerves System (CNS){" "}
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
                    vital.name === "motorSystem"
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
  );
};

export default CentralNervesSystem;
