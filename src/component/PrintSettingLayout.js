import React, { useEffect, useRef, useState } from "react";
import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Scatter,
  XAxis,
  YAxis,
} from "recharts";
import GeneratePDF from "../Common Components/Custom Hooks/GenratePrint";

export default function PrintSettingLayout(props) {
  const contentRef = useRef();
  const [patientInfoList, setPatientInfoList] = useState({});
  useEffect(() => {
    const obj = {
      "Patient Name": "Mr.HarShal Dhoke",
      "Gender /Age": "M / 24Y 02M 04 D",
      "Visit No": "1245",
      "DOB": "21/02/1999",
      "Height": "180 cm",
      "Weight": "80 kg",
      "Address": " warje pune",
    };
    setPatientInfoList(obj);
  }, [])

  const {
    drugsAll,
    topMargin,
    rightMargin,
    bottomMargin,
    leftMargin,
    textSizeClass,
    gridCols,
    medecineTemplate,
    headers,
    result,
    switchHeightChart,
    dataHeight,
    switchWeightChart,
    dataWeight,
    footerAlign,
    Logo,
  } = props;



  const patientInfo = {
    Sysptoms:
      " Symptoml, Pedal edema, Fever (3 days, Moderate, Intermittent, Max: 102)",
    Findings: " Bleeding PV, Bladder symptoms",
    "Other personal Details":
      " General Allergies-Animal Dander, Shellfish, Drug Allergies-penicillin, Amoxicillin",
    "Family history":
      " Mother (Hypothyroidium, Tuberculosis), Sister (Other), Husband (Bronchitis Asthma)",
    Diagnosis: "Acute Gastroenteritis AGE",
  };

  const investigationsInfo = [
    {
      value: "CBC (Complete Blood Count) Haemogram",
    },
    {
      value: "FBS",
    },
    {
      value: "CBC (Complete Blood Count)",
    },
  ];

  const Instructionslist = [
    {
      value:
        "तोह समृद्ध पदार्य पात्तक, सफरचंद, डाळिंब, काळे चणे, शेवग्याच्या शेंगा, हिरव्या भाज्या",
    },
    {
      value: "भरपूर द्रवपदार्थ आहारात घेणे",
    },
    {
      value: "गरम पाण्याची वाफ घेणे",
    },
    {
      value: "Saline gargles",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 borde  border-b p-[5px] rounded-t bg-[#b4ecf1]  border-black item-center">
        <div>
          <div className="text-md font-semibold ml-3">Presription</div>
        </div>
        <div className=" flex justify-end mr-3">
          <button
            type="button"
            onClick={() => {
              GeneratePDF(contentRef);
            }}
            className="py-2 px-3 w-min rounded text-xs font-medium searchIconButton bg-customBlue text-white whitespace-nowrap"
          >
            Print
          </button>
        </div>
      </div>
      <div
        style={{
          marginTop: `${topMargin <= 10 ? topMargin : 0}px`,
          marginRight: `${rightMargin <= 10 ? rightMargin : 0}px`,
          marginBottom: `${bottomMargin <= 10 ? bottomMargin : 0}px`,
          marginLeft: `${leftMargin <= 10 ? leftMargin : 0}px`,
        }}
        className="p-2"
        ref={contentRef}
      >
        <div className="flex justify-between ml-2 ">
          <div className="flex">
            <img className="w-[25%]" src={Logo} alt="logo" />
            <div className="text-start pl-2 pt-4 ">
              <div className={` text-[14px] font-semibold`}>
                Alliance Multispeciality Hospital
              </div>
              <div className="text-[14px] font-semibold ">
                Ichalkaranji, Kolhapur
              </div>
              <div className=" space-x-1 ml-[1px]">
                <span className={`${textSizeClass}  font-semibold `}>
                  Phone No{" "}
                </span>
                <span className={`${textSizeClass} `}>: 7896321458</span>
              </div>
              <div className="flex  space-x-5">
                <span className={`${textSizeClass}  font-semibold `}>
                  GST No{" "}
                </span>
                <span className={`${textSizeClass} `}>: 27AADCM3436C1ZT</span>
              </div>
            </div>
          </div>
        </div>
        <div className=" grid grid-cols-1 border-t-[1px]  border-black mt-1 ">
          <div className="mr-2">
            <div className=" flex justify-end -mt-[26px] gap-2">
              <div className=" space-x-2 ">
                <span className={`${textSizeClass}  font-semibold `}>
                  Date :
                </span>
                <span className={`${textSizeClass} `}> 26/10/2023</span>
              </div>
            </div>
            <div className=" mt-1 mb-1 border-b  p-1 border-black ">
              <div className={` space-y-[1px] grid   grid-cols-2 gap-1  text-left justify-start font-normal  `}>
                {Object.entries(patientInfoList).map(([key, value]) => (
                  <div key={key} className="flex items-center">
                    <p className={`${textSizeClass}  font-semibold w-[90px]`}>
                      {key}
                    </p>
                    <p className={`${textSizeClass}  font-semibold text-[11px] mx-2`}>:</p>
                    <p className={`${textSizeClass} whitespace-nowrap`}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${gridCols}`}>
              <div>
                <div>
                  <div className="space-y-2  text-left justify-start font-normal">
                    {Object.entries(patientInfo).map(([key, value]) => (
                      <div
                        key={key}
                        className={`${gridCols === "grid grid-cols-1"
                          ? "flex items-center"
                          : ""
                          }  ${textSizeClass}`}
                      >
                        <div className=" font-semibold whitespace-nowrap">
                          {key} <span className=" ml-2"> :</span>
                        </div>
                        <div className={`${textSizeClass} `}>{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-2  text-left justify-start font-normal">
                  <div className={`${textSizeClass} flex  items-center `}>
                    <div className={`${textSizeClass} font-semibold whitespace-nowrap`}>
                      Vaccinations given
                    </div>
                    <p className="font-semibold mx-2">:</p>
                    <div className={`${textSizeClass} text-[11px]`}>
                      <span
                        className={`${textSizeClass} font-semibold text[11px] mr-[2px]`}
                      >
                        Agrippal
                      </span>
                      (Influenza 1): Feb 13 2018
                    </div>
                  </div>
                </div>
                <div className="mt-2  text-left justify-start font-normal">
                  <div className={`${textSizeClass} flex  items-center `}>
                    <div className=" font-semibold whitespace-nowrap">
                      Vaccinations due
                    </div>
                    <p className="font-semibold mx-2">:</p>
                    <div className={`${textSizeClass} `}>
                      Feb 20 2015: PCV 2
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {medecineTemplate === "Line" ? (

                  <div className=" ">
                    {result.map((medicine, index) => (
                      index <= 4 ? (
                        <div key={index} className={`${textSizeClass}  mt-[3px] mb-1`} >
                          <div className="flex gap-2">
                            <div className={`${textSizeClass} `}>{index + 1}</div>
                            <div className={`${textSizeClass} `}>
                              {/* {medicine.औषधे.trim().replace(/:/g, "").replace(/,/g, "")
                              .replace(/\[/g, "")
                              .replace(/\]/g, "")
                              .split(/\{|\}/g)} */}
                              <span >
                                {medicine.औषधे
                                  .replace(/,/g, "")
                                  .replace(/\[/g, "")
                                  .replace(/\]/g, "")
                                  .split(/\{|\}/g)
                                  .filter((item) => item.trim())
                                  .map((line, lineIndex) => (
                                    <React.Fragment key={lineIndex}>
                                      {lineIndex > 0 && <br />}
                                      {line
                                        .split(/\s+/)
                                        .map((word, wordIndex) => (
                                          <React.Fragment key={wordIndex}>
                                            {wordIndex > 0 && " "}
                                            <span
                                              className={
                                                lineIndex > 0
                                                  ? `font-mono items-center`
                                                  : "items-center"
                                              }
                                            >{word}
                                            </span>
                                          </React.Fragment>
                                        ))}
                                    </React.Fragment>
                                  ))}
                              </span>
                            </div>
                          </div>
                          <div className={`${textSizeClass}  whitespace-pre  ml-[12px]`}>
                            <span className={`${textSizeClass} `}>
                              {medicine.प्रमाण.replace(/,/g, "")}
                            </span>{" "}
                            <div className={`${textSizeClass} whitespace-pre ml-[2px]  break-words `}>
                              {medicine.वारंवारता.replace(/,/g, "")} {medicine.कालावधी}
                            </div>
                            <div className={`${textSizeClass} whitespace-pre  ml-[2px] break-words `}>
                              {medicine.Instructions.replace(/,/g, "")}
                            </div>
                          </div>
                        </div>) : ""
                    ))}
                  </div>
                ) : (
                  ""
                )}
                {medecineTemplate !== "Line" ? (
                  <div>
                    <table className="mt-2 font-normal">
                      <thead>
                        <tr className="border   border-black  ">
                          {headers?.map((header, index) => (
                            <td
                              className={`${textSizeClass} border   border-black   font-semibold truncate gap-2 `}
                            >
                              {header}
                            </td>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="">
                        {result.map((row, rowIndex) => (
                          <tr
                            key={rowIndex}
                            className="text-center border-black"
                          >
                            {headers.map((header, columnIndex) => (
                              <td
                                key={columnIndex}
                                className={`${medecineTemplate !== "Line"
                                  ? "px-2"
                                  : "px-[2px]"
                                  } ${textSizeClass}  border   border-black text-left`}
                              >
                                {columnIndex === 0 ? (
                                  <span >
                                    {row[header]
                                      .replace(/,/g, "")
                                      .replace(/\[/g, "")
                                      .replace(/\]/g, "")
                                      .split(/\{|\}/g)
                                      .filter((item) => item.trim())
                                      .map((line, lineIndex) => (
                                        <React.Fragment key={lineIndex}>
                                          {lineIndex > 0 && <br />}
                                          {line
                                            .split(/\s+/)
                                            .map((word, wordIndex) => (
                                              <React.Fragment key={wordIndex}>
                                                {wordIndex > 0 && " "}
                                                <span
                                                  className={
                                                    lineIndex > 0
                                                      ? "font-mono items-center"
                                                      : "items-center"
                                                  }
                                                >{drugsAll ? lineIndex === 0 ? word : "" : word}
                                                </span>
                                              </React.Fragment>
                                            ))}
                                        </React.Fragment>
                                      ))}
                                  </span>
                                ) : (
                                  row[header]
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  ""
                )}
                <div className="mt-1">
                  <div className="font-normal">
                    <div className={`${textSizeClass} font-semibold mb-1`}>
                      Advised Investigations :
                    </div>
                  </div>

                  <table>
                    <tbody>
                      {investigationsInfo.map((info, index) => (
                        <tr key={index} className="border  border-gray-500 ">
                          <td className={`${textSizeClass}  p-[4px]`}>
                            {info.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" font-normal">
          <div className={`${textSizeClass}  font-semibold`}>
            Instructions :
          </div>
          <ol className="font-normal  ml-5">
            {Instructionslist.map((value, index) => (
              <li className={`${textSizeClass} list-disc `}>{value.value}</li>
            ))}
          </ol>
          <div className="flex gap-2">
            <div className={`${textSizeClass}  font-semibold`}>Follow up :</div>
            <div className={`${textSizeClass} `}>13 Mar 2018, Tuesday</div>
          </div>
        </div>
        <div className={`${textSizeClass}  mt-1`}>
          Received with thanks #300 for Agrippal (0)
        </div>
        <div className=" flex gap-5">
          {switchHeightChart ? (
            <div className="w-full">
              <ComposedChart
                width={250}
                height={150}
                data={dataHeight}
                margin={{
                  top: 10,
                  right: 80,
                  bottom: 0,
                  left: 20,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />

                <XAxis
                  dataKey="age"
                  type="number"
                  tick={{ fontSize: 13, fontWeight: "normal" }}
                  axisLine={{ strokeWidth: 1 }}
                  tickLine={{ strokeWidth: 1 }}
                />
                <YAxis
                  label={{
                    value: "Height",
                    angle: -90,
                    position: "insideLeft",
                    fontSize: "13px",
                  }}
                  tick={{ fontSize: 13, fontWeight: "normal" }}
                  axisLine={{ strokeWidth: 1 }}
                  tickLine={{ strokeWidth: 1 }}
                />
                <Scatter dataKey="height" legendType="none" fill="green" />
                <Legend align="center" verticalAlign="bottom" />

                <Line
                  type="linear"
                  dataKey="height"
                  name="age"
                  dot={false}
                  stroke="red"
                  activeDot={false}
                  legendType="Age"
                  label={{
                    value: "Weight",
                    position: "insideBottom",
                    fontSize: "12px",
                  }}
                />
              </ComposedChart>
            </div>
          ) : (
            ""
          )}
          <div className="w-full">
            {switchWeightChart ? (
              <ComposedChart
                width={250}
                height={150}
                data={dataWeight}
                margin={{
                  top: 10,
                  right: 80,
                  bottom: 0,
                  left: 20,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <Legend />

                <Scatter dataKey="weight" legendType="none" fill="green" />

                <XAxis
                  dataKey="age"
                  type="number"
                  tick={{ fontSize: 13, fontWeight: "normal" }}
                  axisLine={{ strokeWidth: 1 }}
                  tickLine={{ strokeWidth: 1 }}
                />
                <YAxis
                  label={{
                    value: "Weight",
                    angle: -90,
                    position: "insideLeft",
                    fontSize: "13px",
                  }}
                  tick={{ fontSize: 13, fontWeight: "normal" }}
                  axisLine={{ strokeWidth: 1 }}
                  tickLine={{ strokeWidth: 1 }}
                />

                <Line
                  type="linear"
                  dataKey="weight"
                  name="age"
                  stroke="red"
                  dot={false}
                  activeDot={false}
                  legendType="Age"
                  label={{
                    value: "weight",
                    position: "insideBottom",
                    fontSize: "12px",
                  }}
                />
              </ComposedChart>
            ) : (
              ""
            )}
          </div>
        </div>
        <footer>
          <div className={`${footerAlign === "" ? "text-right" : footerAlign}`}>
            <div className={`${textSizeClass} font-semibold `}>
              Dr. Nishant Anthwal
            </div>
            <div className={`${textSizeClass} font-semibold `}>(MBBS)</div>
          </div>
        </footer>
      </div>
    </div>
  );
}
