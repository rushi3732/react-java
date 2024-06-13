import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CheckBoxField from "../../Common Components/FormFields/CheckBoxField";
import CommonTransactionTable from "../../Common Components/CommonTable/CommonTransactionTable";

const LifeStyleHabits = () => {
  const [dataResult, setDataResult] = useState([
    {
      Action: true,
      Habbit: "Alcohol",
      "Quentity(with unit)": "2 drinks per day",
      Duration: "10 years",
      " Please Appropriately":
        "Patient diagnosed with pneumonia, treated with antibiotics.",
      "Age When Started": "25",
      "Quit (Y/N) ": "Y",
      "Age When Quit ": "35",
    },
    {
      Action: true,
      Habbit: "Smoking",
      "Quentity(with unit)": "10 cigarettes per day",
      Duration: "20 years",
      " Please Appropriately":
        "Subject experiencing chronic bronchitis, advised to quit smoking.",
      "Age When Started": "18",
      "Quit (Y/N) ": "N",
      "Age When Quit ": "",
    },
    {
      Action: true,
      Habbit: "Exercise",
      "Quentity(with unit)": "30 minutes per day",
      Duration: "5 days a week",
      " Please Appropriately":
        "Individual maintaining good cardiovascular health.",
      "Age When Started": "30",
      "Quit (Y/N) ": "N/A",
      "Age When Quit ": "N/A",
    },
    {
      Action: false,
      Habbit: "Soda Consumption",
      "Quentity(with unit)": "2 cans per day",
      Duration: "5 years",
      " Please Appropriately":
        "Patient advised to reduce sugar intake for better dental health.",
      "Age When Started": "20",
      "Quit (Y/N) ": "N",
      "Age When Quit ": "",
    },
    {
      Action: false,
      Habbit: "Coffee Drinking",
      "Quentity(with unit)": "3 cups per day",
      Duration: "15 years",
      " Please Appropriately":
        "Subject experiencing insomnia, recommended to limit caffeine intake.",
      "Age When Started": "25",
      "Quit (Y/N) ": "N",
      "Age When Quit ": "",
    },
    {
      Action: false,
      Habbit: "Physical Activity",
      "Quentity(with unit)": "1 hour per day",
      Duration: "7 days a week",
      " Please Appropriately": "Individual maintaining a healthy lifestyle.",
      "Age When Started": "18",
      "Quit (Y/N) ": "N/A",
      "Age When Quit ": "N/A",
    },
    {
      Action: false,
      Habbit: "Junk Food Consumption",
      "Quentity(with unit)": "Twice a week",
      Duration: "10 years",
      " Please Appropriately":
        "Patient advised to incorporate more fruits and vegetables for balanced nutrition.",
      "Age When Started": "30",
      "Quit (Y/N) ": "N",
      "Age When Quit ": "",
    },
  ]);
  const {
    control,
    formState: { errors },
  } = useForm();

  const renderInput = (row, index, header) => {
    return (
      <div>
        {header === "Age When Started" && (
          <div className=" flex gap-1 items-center">
            <div className="bg-orange-500 w-5 h-5  text-[14px] text-center rounded-full text-white">
              D
            </div>
            <div className="bg-green-500 w-5 h-5 text-[14px] text-center rounded-full text-white">
              W
            </div>
            <div className="bg-purple-500 w-5 h-5 text-[14px]  text-center rounded-full text-white">
              M
            </div>
            <div className="bg-blue-500 w-5 h-5 text-[14px] text-center rounded-full text-white">
              Y
            </div>
          </div>
        )}
        <div className="item-center">
          {dataResult.length > 0 && header === "Action" && (
            <input
              type="checkbox"
              className="text-center"
              defaultChecked={row?.["Action"] ? true : false}
              onChange={(e) => {
                let tempData = [...dataResult];
                tempData[index]["Action"] = e.target.checked;
                setDataResult(tempData);
              }}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="rounded border h-auto">
      <div className="bg-[#ECFCCB] sticky  p-1   shadow-md flex gap-8">
        <div className="flex items-center">
          <div className="text-sm  font-semibold flex items-center justify-start ml-2">
            Life Style Habits
          </div>
        </div>
        <div className="  -my-2 mr-2">
          <CheckBoxField name="nil" label="Nil" control={control} />
        </div>
      </div>
      <div>
        {dataResult?.length > 0 ? (
          <CommonTransactionTable
            dataResult={dataResult}
            removeHeaders={[""]}
            tableClass="h-[180px] -mt-[7px] -mb-2 capitalize"
            // renderActions={(row, index) => {}}
            highlightRow={false}
            rowBackgroundColor={(row, index) => {
              return index % 2 === 0 ? "bg-gray-300" : "bg-white";
            }}
            handleSelectedRow={(row, index) => {
              console.log("Selected Row:", row, "Index:", index);
            }}
            renderInput={renderInput}
            editableColumns={["Action"]}
            SelectCheckbox={false}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default LifeStyleHabits;
