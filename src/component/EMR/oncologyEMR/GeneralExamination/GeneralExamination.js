import React from "react";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import InputField from "../../../../Common Components/FormFields/InputField";
import RadioField from "../../../../Common Components/FormFields/RadioField";
import { useForm, useFormContext } from "react-hook-form";

const GeneralExamination = () => {
  const defaultValues = {
    general: 0,
    performanceStatus: 0,
  };
  const { control, watch } = useFormContext();
  const GeneralExList = [
    {
      id: 1,
      label: "Pallor",
      name: "pallor",
    },
    {
      id: 2,
      label: "Icterus",
      name: "icterus",
    },
    ,
    {
      id: 3,
      label: "Cyanosis",
      name: "Cyanosis",
    },

    {
      id: 4,
      label: "Clubbing",
      name: "Clubbing",
    },
    {
      id: 5,
      label: "Oedema",
      name: "Oedema",
    },
    {
      id: 6,
      label: "Obesity",
      name: "Obesity",
    },
    {
      id: 7,
      label: "purpura",
      name: "purpura",
    },
  ];

  const generalConditionTypes = [
    {
      id: "1",
      label: "Good",
      value: "1",
    },
    {
      id: "2",
      label: "Fair",
      value: "2",
    },
    {
      id: "3",
      label: "Poor",
      value: "3",
    },
    {
      id: "4",
      label: "Moribund",
      value: "4",
    },
  ];
  return (
    <div>
      <div>
        <div className=" flex gap-2  items-center  mt-1">
          <div className="font-semibold  text-[13px]">General Condition :</div>
          <div>
            <div className="pt-2">
              <RadioField
                control={control}
                name="generalCondition"
                dataArray={generalConditionTypes}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-md shadow-md mt-1 border border-gray-100">
        <div className="bg-[#EEFFD3] text-[13px] font-semibold  py-2 text-start px-2">
          General Examination
        </div>
        <div className=" ml-2 grid  grid-cols-3 lg:grid-cols-7 text-start gap-3 text-sm">
          {" "}
          {GeneralExList.map((row, index) => (
            <>
              <CheckBoxField
                control={control}
                label={row.label}
                name={row.name}
              />
            </>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 py-2 px-2 gap-3">
          <InputField control={control} name="nutrition" label="Nutrition" />
          <InputField control={control} name="hydration" label="Hydration" />
        </div>
      </div>
    </div>
  );
};

export default GeneralExamination;
