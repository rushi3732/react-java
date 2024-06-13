
import React from 'react'
import PrintSetting from './PrintSetting'

const BloodRequest = () => {
  return (
    <div>
      <PrintSetting />
    </div>
  )
}

export default BloodRequest

// import { Checkbox, Tooltip } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import {
//   CartesianGrid,
//   Dot,
//   Label,
//   Legend,
//   Line,
//   LineChart,
//   XAxis,
//   YAxis,
//   Scatter, ScatterChart, AreaChart, Area
// } from "recharts";
// import { Inamdar } from "../Common Components/assets/commonassets/CommonAssets";
// import api from "./api/api";
// import CheckBoxField from "../Common Components/FormFields/CheckBoxField";




// const BloodRequest = () => {
//   const [patientInfo, setPatientInfo] = useState({});
//   const [result, setResult] = useState([]);
//   const [patientInfoDate, setPatientInfoDate] = useState({});
//   const [lineChartList, setLineChartList] = useState({});
//   const [scatterChartList, setScatterChartList] = useState({});
//   useEffect(() => {
//     print();
//   });
//   const print = () => {
//     const postObj = {
//       "admissionId": 1060553,
//       "fromDate": "2023-12-05",
//       "toDate": "2023-12-08",
//       "fromTime": null,
//       "toTime": null
//     };
//     api
//       .post(`/api/reports/nursing/cccVitals`, postObj)
//       .then((response) => response.data.result)
//       .then((res) => {
//         console.log("ressss", res);
//         const obj = {
//           "Mr No": res.MRNo,
//           "Patient Name": res.PatientName,
//           "Doctor Name": res.DoctorName,
//           "Admission Date": res.AdmissionDate,
//         };
//         setPatientInfo(obj);
//         const patientInfoDate = {
//           "From Date": res.FromDate,
//           "To Date": res.ToDate,
//         };
//         setPatientInfoDate(patientInfoDate);
//         const patientObj = res.vitalList.map((data) => {
//           return {
//             Date: data.Date,
//             Time: data.Time,
//             Temp: data.Temperature || 0,
//             Pulse: data.Pulse || 0,
//             Resp: data.Respiration || 0,
//             BP: data.BP || "0/0",
//             MEWS: data.MewsScore || 0,
//             Oral: data.oral || false,
//             Tracheostomy: data.tracheostomy || false,
//             ETT: data.Ett || false,
//             Nasal: data.Nasal || false,
//             SaturationwithO2: data.saturationwitho2 || 0,
//             Saturationwithouto2: data.saturationwithouto2 || 0,
//           };
//         });
//         const LineChartObjList = res.vitalList.map((data) => {
//           return {
//             Time: data.Time,
//             Temp: data.Temperature,
//           };
//         });
//         const ScatterChartObjList = res.BpList.map((data) => {
//           return {
//             Time: data.Time,
//             LowerBp: data["Lower BP"],
//             UpperBp: data["Upper BP"]
//           };
//         });
//         setScatterChartList(ScatterChartObjList);
//         setLineChartList(LineChartObjList);

//         setResult([...patientObj]);
//       });
//   };

//   const headers = [
//     "Date",
//     "Time",
//     "Temp",
//     "Pulse",
//     "Resp",
//     "BP",
//     "MEWS",
//     "Oral",
//     "Tracheostomy",
//     "ETT",
//     "Nasal",
//     "SaturationwithO2",
//     "Saturationwithouto2",
//   ];

//   const editableColumns = ["Oral", "Tracheostomy", "ETT", "Nasal"];


//   const CustomizedShape = (props) => {
//     const { cx, cy, fill, LowerBp } = props;
//     return (
//       <g>
//         <Dot cx={cx} cy={cy} r={5} fill={fill} />
//         <g transform={`translate(${cx},${cy})`}>
//           <text x={-10} y={0} dy={-10} textAnchor="bottom" className="text-sm font-semibold tracking-wide">{LowerBp}</text>
//         </g>
//       </g>
//     );
//   };

//   const CustomizedShapeUpper = (props) => {
//     const { cx, cy, fill, UpperBp } = props;
//     return (
//       <g>
//         <Dot cx={cx} cy={cy} r={5} fill={fill} />
//         <g transform={`translate(${cx},${cy})`}>
//           <text x={-10} y={0} dy={-10} textAnchor="bottom" className="text-sm font-semibold tracking-wide">{UpperBp}</text>
//         </g>
//       </g>
//     );
//   };



//   return (
//     <div>
//       <div className="mt-2 ">
//         <table className="w-full break-after-page">
//           <thead>
//             <tr>
//               <th colSpan={headers?.length + 1}>
//                 <div className="flex justify-between gap-5 w-full">
//                   <div className="space-y-2  text-left justify-start font-normal ">
//                     {Object.entries(patientInfo).map(([key, value]) => (
//                       <div key={key} className="flex items-center">
//                         <p className="text-[11px] font-semibold w-[100px]">
//                           {key}
//                         </p>
//                         <p className=" font-semibold text-[11px] mx-2">:</p>
//                         <p className="text-[11px] whitespace-nowrap">{value}</p>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="justify-center flex">
//                     <div className="font-semibold  text-[18px]  whitespace-nowrap">
//                       TPR Chart
//                     </div>
//                   </div>
//                   <div className=" justify-end flex ">
//                     <div>
//                       <Inamdar />
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="flex  justify-end items-end gap-2 font-normal  mt-2 border-black  border-t-[1px]">
//                     {Object.entries(patientInfoDate).map(([key, value]) => (
//                       <div key={key} className="flex items-center">
//                         <p className="text-[11px]   font-semibold  w-35">
//                           {key}
//                         </p>
//                         <p className="font-semiboldtext-[11px] mx-2">:</p>
//                         <p className="text-[11px] whitespace-nowrap">{value}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </th>
//             </tr>

//             <tr className="border-b-[1px] border-t-[1px] mt[1px]  border-black  w-full ">
//               {headers?.map((header, index) => (
//                 <th key={index} className="text-center py-1 gap-5">
//                   <td className=" font-semibold flex items-center truncate gap-2 text-[11px]">
//                     {header}
//                   </td>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="w-full">
//             {result?.map((row, rowIndex) => (
//               <tr key={rowIndex} className=" text-left border-gray-200">
//                 {headers.map((header, columnIndex) => (
//                   <td
//                     key={columnIndex}
//                     className="px-2   text-[11px]  whitespace-nowrap"
//                   >
//                     {editableColumns &&
//                       editableColumns.includes(header) &&
//                       typeof row[header] === "boolean" ? (
//                       <Checkbox
//                         defaultChecked={row[header]}
//                         color="default"
//                         size="small"
//                         disabled
//                         sx={{ padding: 0 }}
//                       />
//                     ) : (
//                       row[header]
//                     )}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <table className="w-full break-after-page">
//           <div className="flex justify-between gap-5 w-full">
//             <div className="space-y-2  text-left justify-start font-normal">
//               {Object.entries(patientInfo).map(([key, value]) => (
//                 <div key={key} className="flex items-center">
//                   <p className="text-[11px] font-semibold w-[100px]">{key}</p>
//                   <p className="font-semibold  text-[11px] mx-2">:</p>
//                   <p className="text-[11px] whitespace-nowrap">{value}</p>
//                 </div>
//               ))}
//             </div>
//             <div className="justify-centnameer ">
//               <div className="font-semibold  text-[18px] whitespace-nowrap">
//                 TPR Chart
//               </div>
//             </div>
//             <div className=" justify-end flex ">
//               <div>
//                 <Inamdar />
//               </div>
//             </div>
//           </div>
//           <div>
//             <div className="flex  justify-end items-end gap-2 py-1 mt-2  border-b-[1px] border-t-[1px] border-black">
//               {Object.entries(patientInfoDate).map(([key, value]) => (
//                 <div key={key} className="flex items-center">
//                   <p className="text-[11px] font-semibold w-35">{key}</p>
//                   <p className="font-semibold text-[11px] mx-2">:</p>
//                   <p className="text-[11px] whitespace-nowrap">{value}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="w-full mt-5 flex justify-center ">
//             <LineChart
//               width={750}
//               height={250}
//               paddingTop="10px"
//               stroke="#243c5a"
//               fill="red"

//               data={lineChartList}
//               cx="50%"
//               cy="50%"
//               margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
//             >
//               <CartesianGrid strokeLinecap="3 3" />
//               <XAxis
//                 label={{
//                   value: "Time",
//                   position: "center",
//                   marginTop: "50px",
//                   paddingTop: "50px",
//                   fontWeight: "50px",
//                   fontSize: "12px"
//                 }} tick={{ fontSize: 13, fontWeight: "normal" }} interval={0} p
//               >

//                 {Array.isArray(lineChartList) &&
//                   lineChartList.map((entry, index) => (
//                     <Label key={index} offset={5} position="top" fontSize="13px"
//                     />
//                   ))}

//               </XAxis>
//               <YAxis tick={{ fontSize: 13, fontWeight: "normal" }}
//                 axisLine={{ strokeWidth: 1 }}
//                 tickLine={{ strokeWidth: 1 }}
//               />
//               <Legend />
//               <Line
//                 dataKey="Temp"
//                 legendType="none"
//                 stroke="#243c5a"
//                 fill="red"
//                 dot={{ r: 5 }}

//               />
//             </LineChart>
//           </div>
//         </table>
//         <table className="w-full">
//           <div className="flex justify-between gap-5 w-full">
//             <div className="space-y-2  text-left justify-start font-normal">
//               {Object.entries(patientInfo).map(([key, value]) => (
//                 <div key={key} className="flex items-center">
//                   <p className="text-[11px] font-semibold w-[100px]">{key}</p>
//                   <p className="font-semibold  text-[11px] mx-2">:</p>
//                   <p className="text-[11px] whitespace-nowrap">{value}</p>
//                 </div>
//               ))}
//             </div>
//             <div className="justify-center ">
//               <div className="font-semibold  text-[18px]  whitespace-nowrap">
//                 TPR Chart
//               </div>
//             </div>
//             <div className=" justify-end flex ">
//               <div>
//                 <Inamdar />
//               </div>
//             </div>
//           </div>
//           <div>
//             <div className="flex  justify-end items-end gap-2 py-1 mt-2 border-b-[1px] border-t-[1px] border-black">
//               {Object.entries(patientInfoDate).map(([key, value]) => (
//                 <div key={key} className="flex items-center">
//                   <p className="text-[11px] font-semibold w-35">{key}</p>
//                   <p className="font-semibold text-[11px] mx-2">:</p>
//                   <p className="text-[11px] whitespace-nowrap">{value}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="flex justify-center">
//             <ScatterChart
//               width={750}
//               height={250}
//               paddingTop="10px"
//               dot={{ r: 5 }}
//               data={scatterChartList}
//               cx="50%"
//               cy="50%"
//               margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
//               padding={{ top: 30, right: 30, left: 20, bottom: 150 }}

//             >
//               <CartesianGrid strokeLinecap="round" />
//               <XAxis dataKey="Time" tick={{ fontSize: 13, fontWeight: "normal" }}
//                 axisLine={{ strokeWidth: 1 }}
//                 tickLine={{ strokeWidth: 1 }}
//               >
//                 {Array.isArray(scatterChartList) &&
//                   scatterChartList.map((entry, index) => (
//                     <Label
//                       key={index}
//                       offset={5}
//                       position="top"
//                       padding={{ top: 15, right: 30, left: 20, bottom: 40 }}
//                     />
//                   ))}
//               </XAxis>
//               <YAxis tick={{ fontSize: 13, fontWeight: "normal" }}
//                 axisLine={{ strokeWidth: 1 }}
//                 tickLine={{ strokeWidth: 1 }}
//                 margin={{ bottom: 55 }}
//                 padding={{ bottom: 55 }}

//               />
//               <Legend
//               />
//               <Scatter dataKey="LowerBp"
//                 stroke="#243c5a"
//                 fill="#8884d8"
//                 legendType="none"
//                 shape={<CustomizedShape data={scatterChartList.LowerBp} />}
//               >
//                 <Label
//                   type="number"
//                   stroke="#243c5a"
//                   dataKey="LowerBp"

//                 />
//               </Scatter>
//             </ScatterChart>control
//           </div>

//           <div className="w-[145px] bg-white min-h-48 p-3 mb-4 font-medium">
//             <div className="w-[145px] flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center shadow-lg ">
//               <div className="block rounded-t overflow-hidden  text-center ">
//                 <div className="bg-blue-500 text-white py-1">
//                   17
//                 </div>
//                 <div className="gap-[6px] mt-2  px-2 flex items-center">
//                   <div className="flex items-center justify-center">
//                     <div className="rounded-full border-[#FFD700] border  w-7 h-7">
//                       <span className="text-center font-semibold text-sm">M</span>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-center">
//                     <div className="rounded-full border-[#FFA500] border  w-7 h-7">
//                       <span className="text-center font-semibold text-sm">A</span>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-center">
//                     <div className="rounded-full border-[#FF6347] border  w-7 h-7">
//                       <span className="text-center font-semibold text-sm">E</span>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-center">
//                     <div className="rounded-full border-[#4682B4] border  w-7 h-7">
//                       <span className="text-center font-semibold text-sm">N</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="pb-2 mt-2 border-l border-r border-b rounded-b-lg text-center border-white bg-white">
//                   <span className="text-xs leading-normal">
//                     8:00 am to 5:00 pm
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default BloodRequest;



// // import React from "react";

// // const CommonPrintTable = ({ dataResult, editableColumns }) => {
// //   const headers = dataResult.length > 0 ? Object.keys(dataResult[0]) : [];

// //   return (
// //     <table className="w-full">
// //       <thead>
// //         <tr className="border-b-[1px] border-t-[1px] mt[1px]  border-black  w-full">
// //           {headers.map((header, index) => (
// //             <th key={index} className="text-center py-1 gap-5">
// //               <td className="font-semibold flex items-center truncate gap-2 text-[11px]">
// //                 {header}
// //               </td>
// //             </th>
// //           ))}
// //         </tr>
// //       </thead>
// //       <tbody className="w-full">
// //         {dataResult.map((row, rowIndex) => (
// //           <tr key={rowIndex} className="text-left border-gray-200">
// //             {headers.map((header, columnIndex) => (
// //               <td
// //                 key={columnIndex}
// //                 className="px-2 text-[11px] whitespace-nowrap"
// //               >
// //                 {editableColumns &&
// //                 editableColumns.includes(header) &&
// //                 typeof row[header] === "boolean" ? (
// //                   <Checkbox
// //                     defaultChecked={row[header]}
// //                     color="default"
// //                     size="small"
// //                     disabled
// //                     sx={{ padding: 0 }}
// //                   />
// //                 ) : (
// //                   row[header]
// //                 )}
// //               </td>
// //             ))}
// //           </tr>
// //         ))}
// //       </tbody>
// //     </table>
// //   );
// // };

// // export default CommonPrintTable;