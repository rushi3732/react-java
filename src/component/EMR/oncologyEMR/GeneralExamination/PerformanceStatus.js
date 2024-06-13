import React, { useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
const performanceStatusData = [
  {
    id: 0,
    label:
      "0 - Fully active, able to carry out all pre-disease performance without restriction",
    value: 0,
  },
  {
    id: 1,
    label:
      "1 - Restricted in physically strenuous activity but ambulatory and able to carry out work of a light or sedentary nature, e.g., light house work, office work",
    value: 1,
  },
  {
    id: 2,
    label:
      "2 - Ambulatory & capable of all self-care but unable to carry out any work activities; up and about more than 50% of waking hours",
    value: 2,
  },
  {
    id: 3,
    label:
      "3 - Capable of only limited self-care; confined to bed or chair more than 50% of waking hours",
    value: 3,
  },
  {
    id: 4,
    label:
      "4 - Completely disabled; cannot carry on any self-care; totally confined to bed or chair",
    value: 4,
  },
  {
    id: 5,
    label: "5 - Dead",
    value: 5,
  },
];
export default function PerformanceStatus() {
  const [selectedValue, setSelectedValue] = useState(0);
  const [performanceStatusValue, setperformanceStatusValue] = useState(0);

  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };
  const handleRadioPerformanceChange = (value) => {
    setperformanceStatusValue(value);
  };

  const defaultValues = {
    general: 0,
    performanceStatus: 0,
  };
  const { control, watch } = useFormContext();
  return (
    <div>
      <div className="bg-white rounded-md shadow-md mt-1 border border-gray-100">
        <div className="bg-[#D6FFF5] text-[13px] font-semibold  py-2 text-start px-2">
          Performance Status (ECOG)
        </div>
        <div className="grid grid-cols-1 text-start px-2 py-2 text-sm">
          {/* <RadioField
                  control={control}
                  name="performanceStatus"
                  dataArray={performanceStatusData}
                /> */}
          {performanceStatusData.map((row) => (
            <div key={row.id} className="py-1 space-x-1">
              <input
                type="radio"
                id={`radio-${row.id}`}
                name="performanceStatus"
                value={row.value}
                checked={performanceStatusValue === row.value}
                onChange={() => handleRadioPerformanceChange(row.value)}
              />
              <label htmlFor={`radio-${row.id}`}>{row.label}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
