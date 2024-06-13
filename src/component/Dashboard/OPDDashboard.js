import { Box } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CommonTransactionTable from "../../Common Components/CommonTable/CommonTransactionTable";
import { DashBoardTotalIcon } from "../../Common Components/assets/ipdassets/Dashboard/DashboardIcons";
import {
  getCustomerSatisfactionCount,
  getDashboardCount,
  getDoctorStatusList,
  getPatientSurvey,
  postAppointmentList,
} from "./services/OPDDashboardService";
import { errorAlert } from "../../Common Components/Toasts/CustomToasts";

const OPDDashboard = () => {
  const [patientSurveyList, SetPatientSurveyList] = useState([]);
  const [doctorStatusList, setDoctorStatusList] = useState([]);
  const [patientSatisfactionList, setPatientSatisfactionList] = useState([]);
  const [bookedAppointmentsList, setBookedAppointmentsList] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);

  const opList = () => {
    return [
      {
        id: 1,
        title: "Appointments",
        totalCount: dashboardData ? dashboardData.appointments : 0,
        bgColor: "bg-[#329DFF]",
        icon: <DashBoardTotalIcon />,
      },
      {
        id: 2,
        title: "Patient Queue",
        totalCount: dashboardData ? dashboardData.patientQueue : 0,
        bgColor: "bg-[#1EBFC4]",
        icon: <DashBoardTotalIcon />,
      },
      {
        id: 3,
        title: "New Patients",
        totalCount: dashboardData ? dashboardData.newPatient : 0,
        bgColor: "bg-[#CDA3A3]",
        icon: <DashBoardTotalIcon />,
      },
      // {
      //   id: 4,
      //   title: "Patient Queue",
      //   totalCount: 8,
      //   bgColor: "bg-[#EF9542]",
      //   icon: <DashBoardTotalIcon />,
      // },
    ];
  };

  const OpLists = useMemo(() => opList(), [dashboardData]);

  const COLORS = ["#0088FE", "#FF2A2A", "#00C49F", "#FFBB28", "#FF8042"];

  const LineTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const valueKey = payload[0].dataKey;
      const valueKey1 = payload[1].dataKey;

      return (
        <div className="bg-white border border-gray-400 rounded-lg">
          <div className="text-black text-xs px-2">
            {`${valueKey === "New Patients" ? "New Patients : " : ""} ${
              data[valueKey1]
            }`}
          </div>
          <div className="text-black text-xs px-2">
            {`${valueKey1 === "Old Patients" ? "Old Patients  :" : ""} ${
              data[valueKey]
            }`}
          </div>
        </div>
      );
    }

    return null;
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;

      return (
        <div className="bg-gray-800 text-white p-2 rounded-lg">
          <p className="text-xs font-semibold">{` ${value}%`}</p>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    // getPatientSurvey(9)
    //   .then((res) => res.data)
    //   .then((res) => {
    //     console.log("getPatientSurvey", res);
    // SetPatientSurveyList(res.result);
    SetPatientSurveyList([
      {
        name: "03-Feb",
        "Old Patients": 3,
        "New Patients": 35,
      },
      {
        name: "05-Feb",
        "Old Patients": 16,
        "New Patients": 35,
      },
      {
        name: "06-Feb",
        "Old Patients": 6,
        "New Patients": 31,
      },
      {
        name: "07-Feb",
        "Old Patients": 6,
        "New Patients": 28,
      },
      {
        name: "08-Feb",
        "Old Patients": 6,
        "New Patients": 23,
      },
      {
        name: "09-Feb",
        "Old Patients": 8,
        "New Patients": 83,
      },
      {
        name: "10-Feb",
        "Old Patients": 0,
        "New Patients": 34,
      },
    ]);
    // })
    // .catch((error) => {
    //   errorAlert(error.message);
    // });
    // getDoctorStatusList(9)
    //   .then((res) => res.data)
    //   .then((res) => {
    //     console.log("getDoctorStatusList", res);

    // setDoctorStatusList([
    //   ...res.result.map((data) => {
    //     return {
    //       "Doctor Name": data.name,
    //       Status: data.status,
    //     };
    //   }),
    // ]);
    setDoctorStatusList([
      {
        "Doctor Name": "Satish Mane",
        Status: "Available",
      },
      {
        "Doctor Name": "Vinay Deshmukh",
        Status: "Absent",
      },
      {
        "Doctor Name": "Ranir Beckhamr",
        Status: "Absent",
      },
      {
        "Doctor Name": "Anjali Kelka",
        Status: "Available",
      },
      {
        "Doctor Name": "Rani Kalokhe",
        Status: "Absent",
      },
      {
        "Doctor Name": "ShriNivasss Beckhamsd",
        Status: "Absent",
      },
      {
        "Doctor Name": "Nikitaer Shets",
        Status: "Absent",
      },
      {
        "Doctor Name": "Maria Parera",
        Status: "Available",
      },
      {
        "Doctor Name": "Raidevi gasw",
        Status: "Absent",
      },
      {
        "Doctor Name": "Baburaw Aapte",
        Status: "Available",
      },
      {
        "Doctor Name": "Neel  Patil",
        Status: "Absent",
      },
      {
        "Doctor Name": "Nisha Patil",
        Status: "Absent",
      },
      {
        "Doctor Name": "Pankaj Wani",
        Status: "Absent",
      },
      {
        "Doctor Name": "Rohit bagade",
        Status: "Absent",
      },
      {
        "Doctor Name": "Vishwas Rao",
        Status: "Absent",
      },
      {
        "Doctor Name": "RAKESH OZA",
        Status: "Absent",
      },
      {
        "Doctor Name": "karan MARNE",
        Status: "Absent",
      },
      {
        "Doctor Name": "Vaibhav Mangle",
        Status: "Absent",
      },
      {
        "Doctor Name": "Girish Wagh",
        Status: "Absent",
      },
      {
        "Doctor Name": "RANI SHAH",
        Status: "Absent",
      },
      {
        "Doctor Name": "Pankaj tripathi",
        Status: "Absent",
      },
      {
        "Doctor Name": "Yash Salunkhe",
        Status: "Absent",
      },
      {
        "Doctor Name": "Jay Khare",
        Status: "Absent",
      },
      {
        "Doctor Name": "Atharva Datar",
        Status: "Absent",
      },
      {
        "Doctor Name": "Parag Mane",
        Status: "Absent",
      },
      {
        "Doctor Name": "rohan Gandhi",
        Status: "Absent",
      },
      {
        "Doctor Name": "aanad Suratkar",
        Status: "Absent",
      },
      {
        "Doctor Name": "darshan kokate",
        Status: "Absent",
      },
      {
        "Doctor Name": "Nitin Patil",
        Status: "Absent",
      },
      {
        "Doctor Name": "Jay Ghule",
        Status: "Absent",
      },
      {
        "Doctor Name": "ravindra jadhav",
        Status: "Absent",
      },
    ]);
    // })
    // .catch((error) => {
    //   errorAlert(error.message);
    // });
    // getCustomerSatisfactionCount(9)
    //   .then((res) => res.data)
    //   .then((res) => {
    //     console.log("getCustomerSatisfactionCount", res);

    // setPatientSatisfactionList(res.result);
    setPatientSatisfactionList([
      {
        count: 25,
        type: "Very Unsatisfied",
      },
      {
        type: "Unsatisfied",
        count: 21,
      },
      {
        count: 31,
        type: "Neutral",
      },
      {
        count: 124,
        type: "Satisfied",
      },
      {
        count: 193,
        type: "Very Satisfied",
      },
    ]);
    // })
    // .catch((error) => {
    //   errorAlert(error.message);
    // });
    // getDashboardCount(9)
    //   .then((res) => res.data)
    //   .then((res) => {
    //     console.log("setDashboardData", res.result);

    //     setDashboardData(res.result);
    //   })
    //   .catch((error) => {
    //     errorAlert(error.message);
    //   });
    setDashboardData({
      patientQueue: 38,
      newPatient: 35,
      earnings: null,
      admittedPatient: 1,
      appointments: 44,
      operations: 0,
    });

    // postAppointmentList({
    //   fromDate: "2024-02-01T05:59:44.710Z",
    //   page: 0,
    //   searchString: "",
    //   size: 10,
    //   toDate: "2024-02-01T05:59:44.710Z",
    //   unitId: 9,
    // })
    //   .then((res) => res.data)
    //   .then((res) => {
    //     console.log("setBookedAppointmentsList", res);

    // setBookedAppointmentsList(res.result);
    setBookedAppointmentsList([
      {
        "Sr No": 1,
        "Patient Name": "Sudarshan Rathod",
        UHID: "SR/2024/004164",
        "Appointment Status": "Confirmed",
        "Department Name": "Cardiology",
        "Doctor Name": "Satish Mane",
        "Appointment Date": "01-02-2024",
        "Appointment time": "09:15 PM",
        "Mobile Number": "87547587538",
        "Created By": "Satish Mane",
        "Created Date": "01-02-2024 09:15:28 PM",
        "Last Modified By": "Satish Mane",
        "Last Modified Date": "01-02-2024 09:15:28 PM",
        patientCategoryId: null,
        tariffName: "Hospital",
        tariffId: 1,
        company: "-",
        campName: null,
        patientAge: 23,
        utilizedAmount: null,
        campId: null,
        creditAmount: null,
        cashBalance: 0,
        patientGender: "Male",
        staffId: null,
        staffDependentConcession: null,
        staffCreditPercentage: null,
        staffDependentId: null,
        availableAmount: null,
        unitId: 9,
        doctorId: 16,
        patientVisitId: 9336,
        patientCategory: "Self",
        companyId: null,
        patientId: 4970,
        "Department Id": 1,
        "Appointment Id": 3144,
      },
      {
        "Sr No": 2,
        "Patient Name": "Rajesh Kale",
        UHID: "RK/2022/000006",
        "Appointment Status": "Completed",
        "Department Name": "Cardiology",
        "Doctor Name": "Satish Mane",
        "Appointment Date": "01-02-2024",
        "Appointment time": "09:02 PM",
        "Mobile Number": "9865689565",
        "Created By": "Satish Mane",
        "Created Date": "01-02-2024 09:02:32 PM",
        "Last Modified By": "Satish Mane",
        "Last Modified Date": "01-02-2024 09:02:32 PM",
        patientCategoryId: null,
        tariffName: "Hospital",
        tariffId: 1,
        company: "Kotak Life Insurance",
        campName: null,
        patientAge: 42,
        utilizedAmount: null,
        campId: null,
        creditAmount: null,
        cashBalance: 150,
        patientGender: "Male",
        staffId: null,
        staffDependentConcession: null,
        staffCreditPercentage: null,
        staffDependentId: null,
        availableAmount: null,
        unitId: 9,
        doctorId: 16,
        patientVisitId: 9335,
        patientCategory: "Insurance",
        companyId: 107,
        patientId: 161,
        "Department Id": 1,
        "Appointment Id": 3143,
      },
      {
        "Sr No": 3,
        "Patient Name": "Vital Yash",
        UHID: "VY/2022/000003",
        "Appointment Status": "Completed",
        "Department Name": "Cardiology",
        "Doctor Name": "Satish Mane",
        "Appointment Date": "01-02-2024",
        "Appointment time": "08:49 PM",
        "Mobile Number": "8308973331",
        "Created By": "Satish Mane",
        "Created Date": "01-02-2024 08:49:55 PM",
        "Last Modified By": "Satish Mane",
        "Last Modified Date": "01-02-2024 08:49:55 PM",
        patientCategoryId: null,
        tariffName: "Hospital",
        tariffId: 1,
        company: "-",
        campName: null,
        patientAge: 26,
        utilizedAmount: null,
        campId: null,
        creditAmount: null,
        cashBalance: 0,
        patientGender: "Male",
        staffId: null,
        staffDependentConcession: null,
        staffCreditPercentage: null,
        staffDependentId: null,
        availableAmount: null,
        unitId: 9,
        doctorId: 16,
        patientVisitId: 9334,
        patientCategory: "Self",
        companyId: null,
        patientId: 158,
        "Department Id": 1,
        "Appointment Id": 3142,
      },
      {
        "Sr No": 4,
        "Patient Name": "Nikita Pande",
        UHID: "NP/2024/004163",
        "Appointment Status": "Completed",
        "Department Name": "Cardiology",
        "Doctor Name": "Satish Mane",
        "Appointment Date": "01-02-2024",
        "Appointment time": "08:14 PM",
        "Mobile Number": "9999999999",
        "Created By": "Satish Mane",
        "Created Date": "01-02-2024 08:14:05 PM",
        "Last Modified By": "Satish Mane",
        "Last Modified Date": "01-02-2024 08:14:05 PM",
        patientCategoryId: null,
        tariffName: "Hospital",
        tariffId: 1,
        company: "-",
        campName: null,
        patientAge: 22,
        utilizedAmount: null,
        campId: null,
        creditAmount: null,
        cashBalance: 0,
        patientGender: "Female",
        staffId: null,
        staffDependentConcession: null,
        staffCreditPercentage: null,
        staffDependentId: null,
        availableAmount: null,
        unitId: 9,
        doctorId: 16,
        patientVisitId: 9333,
        patientCategory: "Self",
        companyId: null,
        patientId: 4969,
        "Department Id": 1,
        "Appointment Id": 3141,
      },
      {
        "Sr No": 5,
        "Patient Name": "A A",
        UHID: "AA/2024/004159",
        "Appointment Status": "Completed",
        "Department Name": "Cardiology",
        "Doctor Name": "Satish Mane",
        "Appointment Date": "01-02-2024",
        "Appointment time": "03:48 PM",
        "Mobile Number": "1324589520",
        "Created By": "super admin",
        "Created Date": "01-02-2024 03:48:17 PM",
        "Last Modified By": "super admin",
        "Last Modified Date": "01-02-2024 03:48:17 PM",
        patientCategoryId: null,
        tariffName: "Hospital",
        tariffId: 1,
        company: "-",
        campName: null,
        patientAge: 46,
        utilizedAmount: null,
        campId: null,
        creditAmount: null,
        cashBalance: 0,
        patientGender: "Male",
        staffId: null,
        staffDependentConcession: null,
        staffCreditPercentage: null,
        staffDependentId: null,
        availableAmount: null,
        unitId: 9,
        doctorId: 16,
        patientVisitId: 9331,
        patientCategory: "Self",
        companyId: null,
        patientId: 4965,
        "Department Id": 1,
        "Appointment Id": 3139,
      },
      {
        "Sr No": 6,
        "Patient Name": "Ankit Kene",
        UHID: "AK/2024/003830",
        "Appointment Status": "Completed",
        "Department Name": "Critical Care",
        "Doctor Name": "Satish Mane",
        "Appointment Date": "01-02-2024",
        "Appointment time": "03:40 PM",
        "Mobile Number": "9923388355",
        "Created By": "super admin",
        "Created Date": "01-02-2024 03:40:25 PM",
        "Last Modified By": "super admin",
        "Last Modified Date": "01-02-2024 03:40:25 PM",
        patientCategoryId: null,
        tariffName: "Bajaj Allianz",
        tariffId: 10,
        company: "Kotak Life Insurance",
        campName: null,
        patientAge: 23,
        utilizedAmount: null,
        campId: null,
        creditAmount: null,
        cashBalance: 0,
        patientGender: "Male",
        staffId: null,
        staffDependentConcession: null,
        staffCreditPercentage: null,
        staffDependentId: null,
        availableAmount: null,
        unitId: 9,
        doctorId: 16,
        patientVisitId: 9330,
        patientCategory: "Insurance",
        companyId: 107,
        patientId: 4631,
        "Department Id": 2,
        "Appointment Id": 3138,
      },
      {
        "Sr No": 7,
        "Patient Name": "Ravi Kishan",
        UHID: "RK/2024/004158",
        "Appointment Status": "Completed",
        "Department Name": "Cardiology",
        "Doctor Name": "Satish Mane",
        "Appointment Date": "01-02-2024",
        "Appointment time": "03:19 PM",
        "Mobile Number": "9859598590",
        "Created By": "Satish Mane",
        "Created Date": "01-02-2024 03:19:37 PM",
        "Last Modified By": "Satish Mane",
        "Last Modified Date": "01-02-2024 03:19:37 PM",
        patientCategoryId: null,
        tariffName: "Hospital",
        tariffId: 1,
        company: "-",
        campName: null,
        patientAge: 23,
        utilizedAmount: null,
        campId: null,
        creditAmount: null,
        cashBalance: 47423.9,
        patientGender: "Male",
        staffId: null,
        staffDependentConcession: null,
        staffCreditPercentage: null,
        staffDependentId: null,
        availableAmount: null,
        unitId: 9,
        doctorId: 16,
        patientVisitId: 9329,
        patientCategory: "Self",
        companyId: null,
        patientId: 4964,
        "Department Id": 1,
        "Appointment Id": 3137,
      },
      {
        "Sr No": 8,
        "Patient Name": "Satish Patil",
        UHID: "SP/2024/004157",
        "Appointment Status": "Completed",
        "Department Name": "Cardiology",
        "Doctor Name": "Satish Mane",
        "Appointment Date": "01-02-2024",
        "Appointment time": "03:05 PM",
        "Mobile Number": "9857354855",
        "Created By": "Satish Mane",
        "Created Date": "01-02-2024 03:05:26 PM",
        "Last Modified By": "Satish Mane",
        "Last Modified Date": "01-02-2024 03:05:26 PM",
        patientCategoryId: null,
        tariffName: "Hospital",
        tariffId: 1,
        company: "-",
        campName: null,
        patientAge: 49,
        utilizedAmount: 4432.09,
        campId: null,
        creditAmount: 0,
        cashBalance: 0,
        patientGender: "Male",
        staffId: 661,
        staffDependentConcession: 30,
        staffCreditPercentage: 0,
        staffDependentId: 10,
        availableAmount: -4432.09,
        unitId: 9,
        doctorId: 16,
        patientVisitId: 9328,
        patientCategory: "Staff Dependent",
        companyId: null,
        patientId: 4963,
        "Department Id": 1,
        "Appointment Id": 3136,
      },
      {
        "Sr No": 9,
        "Patient Name": "Pratiksha Patil",
        UHID: "PP/2024/004156",
        "Appointment Status": "Completed",
        "Department Name": "Cardiology",
        "Doctor Name": "Satish Mane",
        "Appointment Date": "01-02-2024",
        "Appointment time": "02:40 PM",
        "Mobile Number": "9895345985",
        "Created By": "Satish Mane",
        "Created Date": "01-02-2024 02:40:36 PM",
        "Last Modified By": "Satish Mane",
        "Last Modified Date": "01-02-2024 02:40:36 PM",
        patientCategoryId: null,
        tariffName: "Hospital",
        tariffId: 1,
        company: "-",
        campName: null,
        patientAge: 33,
        utilizedAmount: 10584.59,
        campId: null,
        creditAmount: 100000,
        cashBalance: 0,
        patientGender: "Female",
        staffId: 667,
        staffDependentConcession: null,
        staffCreditPercentage: 0,
        staffDependentId: null,
        availableAmount: 89415.41,
        unitId: 9,
        doctorId: 16,
        patientVisitId: 9327,
        patientCategory: "Self",
        companyId: null,
        patientId: 4962,
        "Department Id": 1,
        "Appointment Id": 3135,
      },
      {
        "Sr No": 10,
        "Patient Name": "Satish Mane",
        UHID: "SM/2023/000758",
        "Appointment Status": "Completed",
        "Department Name": "Cardiology",
        "Doctor Name": "Satish Mane",
        "Appointment Date": "01-02-2024",
        "Appointment time": "12:55 PM",
        "Mobile Number": "8956568568",
        "Created By": "Satish Mane",
        "Created Date": "01-02-2024 12:55:45 PM",
        "Last Modified By": "Satish Mane",
        "Last Modified Date": "01-02-2024 12:55:45 PM",
        patientCategoryId: null,
        tariffName: "Bajaj Allianz",
        tariffId: 10,
        company: "-",
        campName: null,
        patientAge: 34,
        utilizedAmount: 0,
        campId: null,
        creditAmount: 0,
        cashBalance: 0,
        patientGender: "Male",
        staffId: 16,
        staffDependentConcession: null,
        staffCreditPercentage: null,
        staffDependentId: null,
        availableAmount: 0,
        unitId: 9,
        doctorId: 16,
        patientVisitId: 9325,
        patientCategory: "Staff",
        companyId: null,
        patientId: 985,
        "Department Id": 1,
        "Appointment Id": 3134,
      },
    ]);
    // })
    // .catch((error) => {
    //   errorAlert(error.message);
    // });
  }, []);

  const headers =
    Object.keys({
      "Petient Name": "",
      UHId: "",
      "Department Name": "",
      "Doctor Name": "",
      "Created Date": "",
      "Last Modified By": "",
    }) || [];

  const headersDoctorList =
    doctorStatusList.length > 0 ? Object.keys(doctorStatusList[0]) : [];
  function capitalizeFirstLetter(str) {
    if (typeof str !== "string") {
      return "";
    }
    const firstLetterCapitalized = str.charAt(0).toUpperCase();
    const restOfString = str.slice(1);
    return firstLetterCapitalized + restOfString;
  }

  return (
    <div className=" font-Poppins">
      <div className=" font-semibold  text-sm mb-1">OPD</div>
      <div className="">
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-2 mb-2">
          {OpLists.map((record, index) => (
            <div
              key={index}
              className={`${record.bgColor} order border-rose-200 border rounded-lg shadow p-2 hover:shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-102 `}
            >
              <div className="">
                <div className=" space-x-2 flex text-gray-900 font-semibold">
                  <div className=" items-center">
                    <div className="  bg-white  rounded-full h-[40px] w-[40px] flex items-center justify-center">
                      {record.icon}
                    </div>
                  </div>
                  <div>
                    <div className=" text-sm font-semibold    text-white">
                      {record.title}
                    </div>
                    <div className=" text-white text-sm  font-semibold ">
                      {record.totalCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid  grid-cols-1 lg:grid-cols-3 gap-2">
        <div className=" md:col-span-2">
          <div className="rounded border w-full  md:col-span-3">
            <div className="">
              <div className="flex justify-between items-center">
                <div className="text-sm p-2  font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                  Patient Survey{" "}
                </div>
                <div className="mr-2">
                  <div className="flex justify-between space-x-1 items-center">
                    <div className="flex space-x-1 items-center">
                      <div className=" w-3 h-3 rounded-full bg-[#8884d8]"></div>
                      <div className="text-xs">New Patients</div>
                    </div>
                    <div className="flex  space-x-1 items-center">
                      <div className=" w-3 rounded-full h-3 bg-[#495A69]"></div>
                      <div className="text-xs">Old Patients</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-b border-gray-200 mx-2 shadow-md "></div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart
                cx="50%"
                data={patientSurveyList}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  stroke="#f0f0f0"
                  strokeLine="6 1"
                  vertical={false}
                />
                <XAxis
                  hide={false}
                  dataKey="name"
                  axisLine={{ stroke: "none" }}
                  tickLine={true}
                  tick={{
                    fontSize: 12,
                    fill: "#000000",
                  }}
                />

                <YAxis
                  axisLine={{ stroke: "none" }}
                  tickLine={true}
                  tick={{
                    fontSize: 12,
                    fill: "#000000",
                  }}
                />
                <Tooltip content={<LineTooltip />} />
                <Area
                  type="monotone"
                  dataKey="New Patients"
                  stackId="1"
                  stroke="#333"
                  fill="url(#customGradient1)"
                  dot={{ r: 4, fill: "#333" }}
                />
                <defs>
                  <linearGradient
                    id="customGradient1"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stop-color="#499A99" />
                    <stop offset="100%" stop-color="#D9D9D9" />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="Old Patients"
                  stackId="1"
                  stroke="#073763"
                  fill="url(#customGradient)"
                  dot={{ r: 4, fill: "#073763" }}
                />
                <defs>
                  <linearGradient
                    id="customGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stop-color="#8884d8" />
                    <stop offset="100%" stop-color="#D4D4D4" />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded border lg:col-span-1">
          <div className="">
            <div className="flex justify-between items-center">
              <div className="text-sm p-2  font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                Patient Satisfaction{" "}
              </div>
            </div>
            <div className="border-b border-gray-200 mx-2 shadow-md "></div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={patientSatisfactionList}
                  cx="40%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="count"
                  isAnimationActive={true}
                  label={(props) => {
                    const tooltipText = `${props.type} (${props.value})`;
                    return (
                      <text
                        {...props}
                        style={{ fontSize: "12px", fontWeight: "bold" }}
                        className="text-white  p-2 rounded-md shadow-md"
                      >
                        {tooltipText}
                      </text>
                    );
                  }}
                >
                  {patientSatisfactionList.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={<CustomTooltip />}
                  wrapperStyle={{ zIndex: 999 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className=" grid  grid-cols-1 lg:grid-cols-3 gap-2 mt-2">
        <div className="rounded border  md:col-span-2 bg-white shadow-md">
          <div className="">
            <div className="flex justify-between items-center">
              <div className="text-sm p-1 text-gray-800  font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                Booked Appointments{" "}
              </div>
            </div>
            <CommonTransactionTable
              dataResult={
                bookedAppointmentsList?.length > 0
                  ? bookedAppointmentsList
                  : headers
              }
              removeHeaders={["id", "actions", "Sr No"]}
              tableClass="h-[248px] -mt-[7px] -mb-2"
              renderActions={false}
              highlightRow={false}
              rowBackgroundColor={(row, index) => {
                return index % 2 === 0 ? "bg-gray-300" : "bg-white";
              }}
              handleSelectedRow={(row, index) => {
                console.log("Selected Row:", row, "Index:", index);
              }}
              editableColumns={[""]}
              SelectCheckbox={false}
            />
          </div>
        </div>
        <div className="col-span-1 ">
          <div className="rounded border col-span-2 bg-white shadow-md min-h-60">
            <div className="">
              <div className="flex justify-between items-center">
                <div className="text-sm p-1 text-gray-800  font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                  Doctors List{" "}
                </div>
              </div>
              <div className="w-full">
                <Box
                  sx={{
                    "&::-webkit-scrollbar": {
                      width: 7,
                      height: 10,
                      marginY: "4px",
                      overflowY: "auto",
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "#ebebeb",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#7393b3",
                      borderRadius: 4,
                    },
                  }}
                  className=" h-[250px] pb-2  overflow-y-auto   border bg-white border-gray-300  "
                >
                  <table className="w-full ">
                    <thead>
                      <tr className="border-b-[1px] bg-[#F1F1F1] sticky top-[-0.1px] border-t-[1px] w-full">
                        {headersDoctorList?.map((header, i) => (
                          <th key={i} className=" px-2 py-2 gap-5">
                            <span className="font-semibold flex items-center truncate gap-2 text-sm ">
                              {header}
                            </span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="w-full">
                      {doctorStatusList.map((row, rowI) => (
                        <tr key={rowI} className=" p-1 m-2 border-black">
                          {headersDoctorList.map((header, columnI) => (
                            <td
                              key={columnI}
                              className={`  px-2 py-[2px]   text-sm font-semibold border-b border-b-gray-300 whitespace-nowrap`}
                            >
                              <span
                                className={`${
                                  columnI == 0
                                    ? "text-blue-400 text-left "
                                    : `${
                                        row[header] !== "Absent"
                                          ? "text-green-600  bg-green-100 px-2  rounded"
                                          : "text-red-500 bg-red-100 px-2 rounded"
                                      }`
                                }`}
                              >
                                {capitalizeFirstLetter(row[header])}
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OPDDashboard;
