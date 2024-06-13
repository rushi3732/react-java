import React from "react";
import { Inamdar } from "../Common Components/assets/commonassets/CommonAssets";

const RequestHistory = () => {
  const patientInfo = {
    "Mr No": "306010",
    "Patient Name": "Amol Rege",
    "Doctor Name": "SHIVANSH T PATIL",
    "Admission Date": "22/11/2023",
  };

  const headers = [
    "Date",
    "Time",
    "Mode",
    "Tidol V(ml)",
    "Minute V(lit/ml)",
    "Peep (cm)",
    "Pr.Sup (cm)",
    "Set Rate",
    "Rate Total (Per Min)",
    "PC",
    "FI O2%",
    "IPAP",
    "EPAP",
    "%MV",
    "I:E",
    "Flow Trigger",
  ];
  const data = [
    {
      Date: "22/11/2023",
      Time: "2:22 pm",
      Mode: "ASV",
      "V(ml) V(ml)": 1,
      "Minute V(lit/ml)": 7,
      "Peep (cm)": 7,
      "Pr.Sup (cm)": 10,
      "Set Rate": 10,
      "Rate Total (Per Min)": 2,
      PC: 5,
      "FI O2%": 8,
      IPAP: 5,
      EPAP: 3,
      "%MV": 8,
      "Flow Trigger": 6,
    },
    {
      Date: "22/11/2023",
      Time: "2:22 pm",
      Mode: "ASV",
      "V(ml) V(ml)": 1,
      "Minute V(lit/ml)": 7,
      "Peep (cm)": 7,
      "Pr.Sup (cm)": 10,
      "Set Rate": 10,
      "Rate Total (Per Min)": 2,
      PC: 5,
      "FI O2%": 8,
      IPAP: 5,
      EPAP: 3,
      "%MV": 8,
      "Flow Trigger": 6,
    },
    {
      Date: "22/11/2023",
      Time: "2:22 pm",
      Mode: "ASV",
      "V(ml) V(ml)": 1,
      "Minute V(lit/ml)": 7,
      "Peep (cm)": 7,
      "Pr.Sup (cm)": 10,
      "Set Rate": 10,
      "Rate Total (Per Min)": 2,
      PC: 5,
      "FI O2%": 8,
      IPAP: 5,
      EPAP: 3,
      "%MV": 8,
      "Flow Trigger": 6,
    },
    {
      Date: "22/11/2023",
      Time: "2:22 pm",
      Mode: "ASV",
      "V(ml) V(ml)": 1,
      "Minute V(lit/ml)": 7,
      "Peep (cm)": 7,
      "Pr.Sup (cm)": 10,
      "Set Rate": 10,
      "Rate Total (Per Min)": 2,
      PC: 5,
      "FI O2%": 8,
      IPAP: 5,
      EPAP: 3,
      "%MV": 8,
      "Flow Trigger": 6,
    },
    {
      Date: "22/11/2023",
      Time: "2:22 pm",
      Mode: "ASV",
      "V(ml) V(ml)": 1,
      "Minute V(lit/ml)": 7,
      "Peep (cm)": 7,
      "Pr.Sup (cm)": 10,
      "Set Rate": 10,
      "Rate Total (Per Min)": 2,
      PC: 5,
      "FI O2%": 8,
      IPAP: 5,
      EPAP: 3,
      "%MV": 8,
      "Flow Trigger": 6,
    },
  ];
  const patientInfoDate = {
    "From Date": "18/11/2023",
    "To Date": "23/11/2023",
  };

  return (
    <div>
      {/* <div className="mt-2 ">
        <table className="w-full ">
          <thead>
            <tr>
              <th colSpan={headers?.length + 1}>
                <div className="flex justify-between gap-5 w-full">
                  <div className="space-y-2  text-left justify-start font-normal">
                    {Object.entries(patientInfo).map(([key, value]) => (
                      <div key={key} className="flex items-center text-[11px]">
                        <p className=" font-semibold  w-[100px]">{key}</p>
                        <p className="font-semibold mx-2">:</p>
                        <p className=" text-[11px] whitespace-nowrap">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="justify-center pl-40">
                    <div className="font-semibold text-[18px]">
                      Ventilator Chart
                    </div>
                  </div>
                  <div className=" justify-end  flex ">
                    <div className="flex items-end gap-2 mt-12">
                      {Object.entries(patientInfoDate).map(([key, value]) => (
                        <div key={key} className="flex items-center">
                          <p className="text-[11px] font-semibold w-30">
                            {key}
                          </p>
                          <p className=" text-[11px] mx-2">:</p>
                          <p className="text-[11px] whitespace-nowrap">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <Inamdar />
                    </div>
                  </div>
                </div>
              </th>
            </tr>
            <tr className="border-b-[1px]   border-black  border-t-[1px] w-full ">
              {headers?.map((header, index) => (
                <th key={index} className="text-center py-1 gap-5">
                  <td className=" font-semibold flex items-center truncate gap-2 text-[11px] justify-center">
                    {header}
                  </td>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="w-full">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className=" text-center border-black ">
                {headers.map((header, columnIndex) => (
                  <td
                    key={columnIndex}
                    className="px-2   text-[11px] whitespace-nowrap"
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default RequestHistory;
