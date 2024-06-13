import React, { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import Vitals from "./Vitals";
import OncologyEMRTab from "./OncologyEMRTab";
import { EMRContext, EMRProvider, useEMRContext } from "./EMRContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, useControlled } from "@mui/material";
import CommonButton from "../../../Common Components/commonbutton/CommonButton";

const OncologyEMR = () => {
  const [tabIndex, setTabIndex] = useState(0);
  console.log("tabIndex", tabIndex);
  const defaultValues = {
    //when
  };
  const schema = yup.object().shape({});
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  return (
    <EMRProvider>
      <OncologyEMRContent
        methods={methods}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
      />
    </EMRProvider>
  );
};

const OncologyEMRContent = ({ methods, tabIndex, setTabIndex }) => {
  const { allergiesDataResult, setAllergiesDataResult } =
    useContext(EMRContext);

  const { currentTab, setCurrentTab } = useEMRContext();
  setTabIndex(currentTab);
  console.log("allergiesDataResult", allergiesDataResult);

  const handleNextClick = () => {
    setCurrentTab(currentTab + 1); // Increment the current tab index
  };

  const handleBackClick = () => {
    setCurrentTab(currentTab - 1); // Decrement the current tab index
  };

  const patientData = {
    "Patient Name": "Mr. Subhash Patil",
    UHID: "SP/2024/001454",
    "Age/ Gender": "23 Y 03 M 01 D / M ",
    Dept: "Oncology",
    "Doctor Name": "Dr. Ravindra Jadhav",
  };

  const onSubmit = (data) => {
    console.log("dddddddddddd", data);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={() => {
            methods.handleSubmit(onSubmit);
          }}
        >
          <h1 className="flex justify-center font-semibold">
            Preliminary Assessment
          </h1>
          <div className="border rounded shadow-md p-2 sticky top-[68px] z-[60] bg-slate-100">
            <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-y-4 mx-4">
              {Object.entries(patientData).map(([key, value]) => (
                <div key={key} className="flex">
                  <p className="font-bold text-sm lg:w-[35%] md:[45%] whitespace-nowrap">
                    {key}
                  </p>
                  <span className="font-bold text-sm mx-2">:</span>
                  <p className="text-sm whitespace-nowrap">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-7  ">
            <div className="mt-2 h-[73%] ">
              <Vitals />
            </div>
            <div className="col-span-6 ">
              <div className="col-span-6  ">
                <Box
                  sx={{
                    "&::-webkit-scrollbar": {
                      width: 7,
                      height: 10,
                      marginY: "4px",
                      overflowY: "auto",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#d5d5db",
                      borderRadius: "0.25rem",
                      padding: "2px !important",
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "#f8fafc",
                      borderRadius: "0.25rem",
                      padding: "2px !important",
                    },
                  }}
                  className=" h-[73%]   overflow-y-auto "
                >
                  {" "}
                  <OncologyEMRTab />
                  <div className="pt-2">
                    <div className=" flex justify-end py-2 gap-1">
                      {currentTab === 0 ? (
                        ""
                      ) : (
                        <CommonButton
                          label={"Back"}
                          type="button"
                          className="border border-[#1976D2] text-[#1976D2] hover:shadow px-4 py-2 rounded"
                          onClick={handleBackClick}
                        />
                      )}
                      {currentTab !== 5 && (
                        <CommonButton
                          label={"Next"}
                          type="button"
                          className="border bg-[#4CAF50] text-white hover:shadow px-4 py-2 rounded"
                          onClick={handleNextClick}
                        />
                      )}
                      {currentTab === 5 && (
                        <CommonButton
                          onClick={methods.handleSubmit(onSubmit)}
                          type="submit"
                          label="Save"
                          className="border bg-[#4CAF50] text-white hover:shadow px-4 py-2 rounded"
                          disabled={false}
                          searchIcon={false}
                        />
                      )}
                    </div>
                  </div>
                </Box>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default OncologyEMR;
