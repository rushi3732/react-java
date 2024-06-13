import { Tooltip } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";
import InputField from "../../../Common Components/FormFields/InputField";
import { ViewIcon } from "../../../Common Components/assets/commonassets/CommonAssets";

const Vitals = () => {
  const patientVitals = [
    {
      name: "temp",
      unit: "°F",
      label: "Temp",
      value: null,
    },

    {
      name: "pulse",
      unit: "bpm",
      label: "Pulse Rate",
      value: null,
    },
    {
      name: "systolicBp",
      unit: "mmHg",
      label: "BP (Systolic)",
      value: null,
    },
    {
      name: "diastolicBp",
      unit: "mmHg",
      label: "BP (Diastolic)",
      value: null,
    },
    {
      name: "spO2",
      unit: "%",
      label: "SpO2",
      value: null,
    },
    {
      name: "weightCms",
      unit: "kg",
      label: "Weight",
      value: null,
    },
    {
      name: "heightCms",
      unit: "cm",
      label: "Height",
      value: null,
    },
    {
      name: "bmi",
      unit: "kg/m2",
      label: "BMI",
      value: null,
    },
    {
      name: "respiration",
      unit: "bpm",
      label: "Respiration",
      value: null,
    },
    {
      name: "bloodSugar",
      unit: "mg/di",
      label: "Blood Sugar",
      value: null,
    },
  ];
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <div className="rounded border  shadow-md">
        <div className="bg-[#FFD4E3]  p-[7px] border ">
          <div className="flex justify-between">
            <div className="text-sm font-semibold w-full ml-2 ">Vitals</div>
            <Tooltip title="View" placement="left" arrow>
              <button
                type="button"
                className="text-blue-500 mr-1 flex justify-end"
              >
                <ViewIcon />
              </button>
            </Tooltip>
          </div>
        </div>
        <div className="border shadow-md p-2 bg-white">
          <div className="flex justify-between mb-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 w-full mt-2 ">
              {patientVitals.map((vital, index) => (
                <div key={index} className="flex justify-between  mb-2">
                  <div className="flex items-center">
                    <div className="w-24">
                      <p className="text-xs font-semibold  text-left whitespace-nowrap">
                        {vital.label}
                      </p>
                    </div>
                  </div>
                  <div className="w-44 flex gap-5 items-center">
                    <span>:</span>
                    <InputField
                      label={vital.unit}
                      name={vital.name}
                      type="number"
                      variant="outlined"
                      control={control}
                      error={errors[vital.name]}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vitals;
