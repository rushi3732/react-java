import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const karnofskyScoreData = [
    {
      id: 0,
      label: "100% – normal, no complaints, no signs of disease.",
      value: 0,
    },
    {
      id: 1,
      label:
        "90% – capable of normal activity, few symptoms or signs of disease.",
      value: 1,
    },
    {
      id: 2,
      label:
        "80% – normal activity with some difficulty, some symptoms or signs.",
      value: 2,
    },
    {
      id: 3,
      label: "70% – caring for self, not capable of normal activity or work.",
      value: 3,
    },
    {
      id: 4,
      label:
        "60% – requiring some help, can take care of most personal requirements.",
      value: 4,
    },
    {
      id: 5,
      label: "50% – requires help often, requires frequent medical care.",
      value: 5,
    },
    {
      id: 6,
      label: "40% – disabled, requires special care and help.",
      value: 6,
    },
    {
      id: 7,
      label:
        "30% – severely disabled, hospital admission indicated but no risk of death.",
      value: 7,
    },
    {
      id: 8,
      label:
        "20% – very ill, urgently requiring admission, requires supportive measures or treatment.",
      value: 8,
    },
    {
      id: 9,
      label: "10% – moribund, rapidly progressive fatal disease processes.",
  
      value: 9,
    },
    {
      id: 10,
      label: "0% - Dead.",
      value: 10,
    },
  ];
const KarnofskyScore = () => {
    const [selectedValue, setSelectedValue] = useState(0);
    const [performanceStatusValue, setperformanceStatusValue] = useState(0);
    
    const handleRadioChange = (value) => {
      setSelectedValue(value);
    };
    const handleRadioPerformanceChange = (value) => {
      setperformanceStatusValue(value);
    };
  
    const { control, watch } = useFormContext();
  return (
    <div>
          <div className="bg-white rounded-md shadow-md mt-1 border border-gray-100">
              <div className="bg-[#C6CCFF] text-[13px] font-semibold  py-2 text-start px-2">
                Karnofsky Score
              </div>
              <div className=" grid grid-cols-1 text-start px-2 py-2 text-sm">
                {/* <RadioField
                  control={control}
                  name="performanceStatus"
                  dataArray={karnofskyScoreData}
                /> */}
                {karnofskyScoreData.map((row) => (
                  <div key={row.id} className="py-1 space-x-1">
                    <input
                      type="radio"
                      id={`radio-${row.id}`}
                      name="karnofskyScore"
                      value={row.value}
                      checked={selectedValue === row.value}
                      onChange={() => handleRadioChange(row.value)}
                    />
                    <label htmlFor={`radio-${row.id}`}>{row.label}</label>
                  </div>
                ))}
              </div>
            </div>
      
    </div>
  )
}

export default KarnofskyScore
