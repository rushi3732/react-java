import React from "react";
import OncologyEMR from "./EMR/oncologyEMR/OncologyEMR";

export default function Donations() {
  return (
    <div>
      <OncologyEMR />
    </div>
  );
}

// export default Donations

// import { Checkbox, fabClasses } from "@mui/material";
// import "../App.css";
// import React, { useEffect, useState } from "react";
// import { Inamdar } from "../Common Components/assets/commonassets/CommonAssets";

// import api from "./api/api";
// const Donations = () => {
//   const [patientInfo, setPatientInfo] = useState({});
//   const [patientInfoObj, setPatientInfoObj] = useState({});
//   const [result, setResult] = useState([]);
//   const [patientInfoDate, setPatientInfoDate] = useState({});
//   const print = () => {
//     const postObj = {
//       admissionId: 1060263,
//       fromDate: "2023-09-29T10:12:18.677Z",
//       toDate: "2023-11-29T10:12:18.677Z",
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
//         const patientobj = {
//           Age: "33 Y 5 M 2 D",
//           Gender: "Male",
//         };
//         const patientInfoDate = {
//           "From Date": res.FromDate,
//           "To Date": res.ToDate,
//         };
//         setPatientInfoObj(patientobj);
//         setPatientInfoDate(patientInfoDate);
//         const patientObj = res.vitalList.map((data) => {
//           return {
//             Date: data.Date,
//             Time: data.Time,
//             Oral: data.oral || false,
//             Tracheostomy: data.tracheostomy || false,
//             ETT: data.Ett || false,
//             Nasal: data.Nasal || false,
//             SaturationwithO2: data.saturationwitho2 || 0,
//             Saturationwithouto2: data.saturationwithouto2 || 0,
//           };
//         });

//         setResult([
//           ...patientObj,
//         ]);
//       });
//   };

//   const headers = [
//     "Date",
//     "Oral",
//     "Tracheostomy",
//     "ETT",
//     "Nasal",
//     "SaturationwithO2",
//     "Saturationwithouto2",
//   ];

//   const editableColumns = ["Oral", "Tracheostomy", "ETT", "Nasal"];

//   useEffect(() => {
//     print();
//   }, []);

//   return (
//     <div>
//       <div className="mt-2 ">
//         <table className="w-full ">
//           <thead>
//             <tr>
//               <th colSpan={headers?.length + 1}>
//                 <div className="flex justify-between gap-5 w-full">
//                   <div className="space-y-2  text-left justify-start font-normal">
//                     {Object.entries(patientInfo).map(([key, value]) => (
//                       <div key={key} className="flex items-center">
//                         <p className="text-[11px] font-semibold  w-[100px]">
//                           {key}
//                         </p>
//                         <p className=" font-semibold text-[11px] mx-2">:</p>
//                         <p className="text-[11px] whitespace-nowrap">{value}</p>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="justify-center  mr-20">
//                     <div className="font-bold xl:text-xl sm:text-sm md:text-md whitespace-nowrap">
//                       Saturation
//                     </div>
//                   </div>

//                   <div className=" justify-end flex ">
//                     <div>
//                       <Inamdar />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex justify-end">
//                   <div className=" font-normal  justify-end items-end gap-2  -mt-5  font-normal ">
//                     {Object.entries(patientInfoObj).map(([key, value]) => (
//                       <div key={key} className="flex items-center">
//                         <p className="text-[11px]   font-semibold  w-35">
//                           {key}
//                         </p>
//                         <p className="font-semibold text-[11px] mx-2">:</p>
//                         <p className="text-[11px] whitespace-nowrap">{value}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div>
//                   <div className="flex  justify-end items-end gap-2  mt-2 border-black  border-t-[1px]">
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
//             <tr className="border-b-[1px]   border-black  border-t-[1px] w-full ">
//               {headers?.map((header, index) => (
//                 <th key={index} className="text-center py-1 gap-5">
//                   <td className=" font-semibold flex items-center truncate gap-2 text-[11px] justify-center">
//                     {header}
//                   </td>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="w-full">
//             {result?.map((row, rowIndex) => (
//               <tr key={rowIndex} className=" text-center border-black">
//                 {headers.map((header, columnIndex) => (
//                   <td
//                     key={columnIndex}
//                     className=" px-2   text-[10px] whitespace-nowrap"
//                   >
//                     {editableColumns &&
//                     editableColumns.includes(header) &&
//                     typeof row[header] === "boolean" ? (
//                       <Checkbox
//                         defaultChecked={row[header]}
//                         color="default"
//                         size="small"
//                         sx={{ padding: 0 }}
//                         disabled
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
//       </div>
//     </div>
//   );
// };

// export default Donations;
