import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import CheckBoxField from "../../../Common Components/FormFields/CheckBoxField";
import InputField from "../../../Common Components/FormFields/InputField";

const PastHistory = () => {
  const [pastHistoryList] = useState([
    { label: "DM", name: "dm" },
    { label: "HTN", name: "htn" },
    { label: "Heart Disease", name: "heartDisease" },
    { label: "TB", name: "tb" },
    { label: "COPD", name: "copd" },
    { label: "Asthama", name: "asthma" },
    { label: "Liver", name: "liver" },
    { label: "Other", name: "other" },
  ]);

  const { control, watch } = useFormContext();

  return (
    <div className="w-full">
      <div className="rounded border">
        <div className="bg-[#CFFAFE]  p-[7px] border shadow-md">
          <div className="text-sm font-semibold w-full ml-2">Past History</div>
        </div>
        <div className="border shadow-md p-2 bg-white">
          <div className="mb-2">
            <form>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:mb-2 sm:mb-2 xs:mb-2 gap-1 text-xs w-full">
                {pastHistoryList?.map((property, index) => (
                  <div
                    className="flex items-center justify-between whitespace-nowrap"
                    key={index}
                  >
                    <label className="cursor-pointer flex items-center">
                      <div className="w-4 m-1">
                        <CheckBoxField
                          name={property?.name}
                          label={property?.label}
                          control={control}
                          defaultValue={property?.name}
                        />
                      </div>
                      <div className="w-[90px]"></div>
                    </label>
                    {watch(`${property?.name}`) && (
                      <div className="w-full lg:w-44 md:w-40 sm:w-40 gap-2">
                        <InputField
                          name={property.name + "Description"}
                          label="Description"
                          type="text"
                          control={control}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastHistory;
