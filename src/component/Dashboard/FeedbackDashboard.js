import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Card, CardContent, Rating } from "@mui/material";
import { Circle } from "@mui/icons-material";

import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Label,
  XAxis,
  YAxis,
} from "recharts";
import RadioField from "../../Common Components/FormFields/RadioField";
import axios from "axios";
import { format } from "date-fns";
import { getDepartmentWise } from "./services/FeedbackDashboardService";

const FeedbackDashboard = () => {
  // state variables
  const [width, setWidth] = useState(200);
  const [patientData, setPatientData] = useState([]);
  const [chartValue, setChartValue] = useState(null);
  const [chartStaffValue, setChartStaffValue] = useState(null);
  const [ipdFeedBackData, setIpdFeedBackData] = useState([]);
  const [opdFeedBackData, setOpdFeedBackData] = useState([]);
  const [consultantStaffData, setConsultantStaffData] = useState();

  // const OPDData = [
  //   {
  //     name: "1 jan 23",
  //     pv: 0,
  //   },
  //   {
  //     name: "2 jan 23",
  //     pv: 600,
  //   },
  //   {
  //     name: " 3 jan 23",
  //     pv: 800,
  //   },
  //   {
  //     name: " 4 jan 23",
  //     pv: 700,
  //   },
  //   {
  //     name: " 5 jan 23",
  //     pv: 900,
  //   },
  //   {
  //     name: " 6 jan 23",
  //     pv: 1000,
  //   },
  //   {
  //     name: " 7 jan 23",
  //     pv: 1200,
  //   },
  //   {
  //     name: " 8 jan 23",
  //     pv: 1100,
  //   },
  //   {
  //     name: " 9 jan 23",
  //     pv: 1300,
  //   },
  // ];
  // const IPDData = [
  //   {
  //     name: "1 jan 23",
  //     pv: 1300,
  //   },
  //   {
  //     name: "2 jan 23",
  //     pv: 1100,
  //   },
  //   {
  //     name: " 3 jan 23",
  //     pv: 1200,
  //   },
  //   {
  //     name: " 4 jan 23",
  //     pv: 1000,
  //   },
  //   {
  //     name: " 5 jan 23",
  //     pv: 1100,
  //   },
  //   {
  //     name: " 6 jan 23",
  //     pv: 900,
  //   },
  //   {
  //     name: " 7 jan 23",
  //     pv: 1000,
  //   },
  //   {
  //     name: " 8 jan 23",
  //     pv: 600,
  //   },
  //   {
  //     name: " 9 jan 23",
  //     pv: 0,
  //   },
  // ];
  // const IPDList = {
  //   "Highly Satisfied": "Highly Satisfied",
  //   Satisfied: "Satisfied",
  //   Average: "Average",
  //   Poor: "Poor",
  //   Dissatisfied: "Dissatisfied",
  // };
  // const colorMapping = {
  //   "Highly Satisfied": "#239F21",
  //   Satisfied: "#AADF12",
  //   Average: "#DDE032",
  //   Poor: "#E99566",
  //   Dissatisfied: "#FF2A2A",
  // };

  // const RADIAN = Math.PI / 180;
  const data = [
    {
      name: "Highly Satisfied ",
      totalDept: "50",
      TRC: "50",
      value: 5,
      color: "#239F21",
      bgColor: "#E6FFE5",
    },
    {
      name: "Satisfied ",
      totalDept: "50",
      TRC: "50",
      value: 5,
      color: "#AADF12",
      bgColor: "#F3FFD0",
    },
    {
      name: "Average ",
      totalDept: "50",
      TRC: "50",
      value: 5,
      color: "#DDE032",
      bgColor: "#FEFFD2",
    },
    {
      name: "Poor ",
      totalDept: "50",
      TRC: "50",
      value: 5,
      color: "#E99566",
      bgColor: "#FFEBD2",
    },
    {
      name: "Dissatisfied ",
      totalDept: "50",
      TRC: "50",
      value: 5,
      color: "#FF2A2A",
      bgColor: "#FFDBDB",
    },
  ];
  // const dataList = [
  //   {
  //     name: "Highly Satisfied ",
  //     totalDept: "50",
  //     TRC: "50",
  //     value: 5,
  //     color: "#239F21",
  //     bgColor: "#E6FFE5",
  //   },
  //   {
  //     name: "Satisfied ",
  //     totalDept: "50",
  //     TRC: "50",
  //     value: 5,
  //     color: "#AADF12",
  //     bgColor: "#F3FFD0",
  //   },
  //   {
  //     name: "Average ",
  //     totalDept: "50",
  //     TRC: "50",
  //     value: 5,
  //     color: "#DDE032",
  //     bgColor: "#FEFFD2",
  //   },
  //   {
  //     name: "Poor ",
  //     totalDept: "50",
  //     TRC: "50",
  //     value: 5,
  //     color: "#E99566",
  //     bgColor: "#FFEBD2",
  //   },
  //   {
  //     name: "Dissatisfied ",
  //     totalDept: "50",
  //     TRC: "50",
  //     value: 5,
  //     color: "#FF2A2A",
  //     bgColor: "#FFDBDB",
  //   },
  // ];

  const {
    setValue,
    control,
    watch,
    trigger,
    register,
    clearErrors,
    formState: { errors },
  } = useForm();

  const PIdata = [
    { name: "Highly Satisfied (20%)", value: 400 },
    { name: "Satisfied (20%)", value: 300 },
    { name: "Average (20%)", value: 300 },
    { name: "Poor (20%)", value: 200 },
    { name: "Dissatisfied (20%)", value: 500 },
  ];

  const COLORS = ["#239F21", "#AADF12", "#DDE032", "#E99566", "#FF2A2A"];

  const departmentOptions = [
    { id: 1, label: "Patient", value: "patinet" },
    { id: 2, label: "Consultant", value: "consultant" },
    {
      id: 3,
      label: "Staff",
      value: "staff",
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className=" border bg-white text-center border-gray-400 rounded-lg">
          <div className="text-black text-xs font-semibold px-2 py-1">
            Total Feedbacks
          </div>
          <div className="text-black text-xs font-semibold px-2 ">{`${payload[0].value}`}</div>
        </div>
      );
    }

    return null;
  };

  const sumValues = data.map((cur) => cur.value).reduce((a, b) => a);

  const activeSectorIndex = data
    .map((cur, index, arr) => {
      const curMax = [...arr]
        .splice(0, index + 1)
        .reduce((a, b) => ({ value: a.value + b.value })).value;
      return chartValue > curMax - cur.value && chartValue <= curMax;
    })
    .findIndex((cur) => cur);

  const activeSectorIndex1 = data
    .map((cur, index, arr) => {
      const curMax = [...arr]
        .splice(0, index + 1)
        .reduce((a, b) => ({ value: a.value + b.value })).value;
      return chartStaffValue > curMax - cur.value && chartStaffValue <= curMax;
    })
    .findIndex((cur) => cur);

  const arrowData = [
    { value: Number(chartValue) },
    { value: 0 },
    { value: sumValues - Number(chartValue) },
  ];

  const pieProps = {
    startAngle: 180,
    endAngle: 0,
    cx: width / 2,
    cy: width / 2,
  };

  const pieRadius = {
    innerRadius: "80%",
    outerRadius: (width / 2) * 0.4,
  };

  const Arrow = ({ cx, cy, midAngle, outerRadius }) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const mx = cx + (outerRadius + width * 0.03) * cos;
    const my = cy + (outerRadius + width * 0.03) * sin;
    return (
      <g>
        <g
          transform={`translate(${width / 2}, ${width / 2}) rotate(${
            360 - midAngle
          })`}
        >
          <path
            d="M5.60469 9.37139C2.82684 9.54267 0.429368 7.66264 0.276978 5.19354C0.124588 2.72445 2.27269 0.564139 5.05054 0.392861L63.1551 1.279L5.60469 9.37139Z"
            fill="#073763"
          />
        </g>
      </g>
    );
  };

  const calculateDynamicWidth = () => {
    const numberOfDataPoints = data.length;
    const defaultWidth = 200;
    const multiplier = window.innerWidth >= 1536 ? 65 : 40;
    const dynamicWidth = numberOfDataPoints * multiplier;
    return dynamicWidth < defaultWidth ? defaultWidth : dynamicWidth;
  };
  useEffect(() => {
    const newWidth = calculateDynamicWidth();
    setWidth(newWidth);
  }, []);

  const getColorForLabel = (value) => {
    switch (value) {
      case 0:
        return "#FF2A2A";
      case 2:
        return "#E99566";
      case 4:
        return "#DDE032";
      case 6:
        return "#AADF12";
      case 8:
        return "#239F21";
      default:
        return "black";
    }
  };
  const yAxisLabelFormatter = (value) => {
    if (value === 0) {
      return "Dissatisfied";
    } else if (value === 2) {
      return "Poor";
    } else if (value === 4) {
      return "Average";
    } else if (value === 6) {
      return "Satisfied";
    } else if (value === 8) {
      return "Highly Satisfied";
    } else {
      return "";
    }
  };
  // call api for patient data
  useEffect(() => {
    // axios
    //   .get(`http://192.168.0.154:2121/reviews/getIpdPatientDateWiseRating`)
    //   .then((response) => {
    // console.log("getIpdPatientDateWiseRating", response);
    // setIpdFeedBackData(response.data.result);
    setIpdFeedBackData([
      {
        Date: "2024-01-24",
        "Highly Satisfied": 3,
        Satisfied: 0,
        Average: 0,
        Poor: 0,
        Dissatisfied: 0,
        "Total Feedback": 3,
      },
      {
        Date: "2024-01-23",
        "Highly Satisfied": 1,
        Satisfied: 0,
        Average: 0,
        Poor: 0,
        Dissatisfied: 0,
        "Total Feedback": 1,
      },
      {
        Date: "2024-01-10",
        "Highly Satisfied": 3,
        Satisfied: 1,
        Average: 1,
        Poor: 4,
        Dissatisfied: 0,
        "Total Feedback": 9,
      },
      {
        Date: "2024-01-09",
        "Highly Satisfied": 0,
        Satisfied: 1,
        Average: 0,
        Poor: 0,
        Dissatisfied: 0,
        "Total Feedback": 1,
      },
      {
        Date: "2024-01-08",
        "Highly Satisfied": 1,
        Satisfied: 1,
        Average: 3,
        Poor: 1,
        Dissatisfied: 0,
        "Total Feedback": 6,
      },
      {
        Date: "2024-01-06",
        "Highly Satisfied": 0,
        Satisfied: 0,
        Average: 3,
        Poor: 2,
        Dissatisfied: 1,
        "Total Feedback": 6,
      },
      {
        Date: "2024-01-05",
        "Highly Satisfied": 1,
        Satisfied: 1,
        Average: 2,
        Poor: 5,
        Dissatisfied: 0,
        "Total Feedback": 9,
      },
    ]);
    // })
    // .catch((error) => {
    //   console.log("error", error.message);
    // });

    // axios
    //   .get(`http://192.168.0.154:2121/reviews/getOpdPatientDateWiseAvgRating`)
    //   .then((response) => {
    //     if (response.data.statusCode === 200) {
    //       console.log("getOpdPatientDateWiseAvgRating", response.data.result);

    // setOpdFeedBackData(response.data.result);

    setOpdFeedBackData([
      {
        Date: "2024-01-24",
        "Highly Satisfied": 3,
        Satisfied: 0,
        Average: 0,
        Poor: 0,
        Dissatisfied: 0,
        "Total Feedback": 3,
      },
      {
        Date: "2024-01-23",
        "Highly Satisfied": 1,
        Satisfied: 0,
        Average: 0,
        Poor: 0,
        Dissatisfied: 0,
        "Total Feedback": 1,
      },
      {
        Date: "2024-01-10",
        "Highly Satisfied": 3,
        Satisfied: 1,
        Average: 1,
        Poor: 4,
        Dissatisfied: 0,
        "Total Feedback": 9,
      },
      {
        Date: "2024-01-09",
        "Highly Satisfied": 0,
        Satisfied: 1,
        Average: 0,
        Poor: 0,
        Dissatisfied: 0,
        "Total Feedback": 1,
      },
      {
        Date: "2024-01-08",
        "Highly Satisfied": 1,
        Satisfied: 1,
        Average: 3,
        Poor: 1,
        Dissatisfied: 0,
        "Total Feedback": 6,
      },
      {
        Date: "2024-01-06",
        "Highly Satisfied": 0,
        Satisfied: 0,
        Average: 3,
        Poor: 2,
        Dissatisfied: 1,
        "Total Feedback": 6,
      },
      {
        Date: "2024-01-05",
        "Highly Satisfied": 1,
        Satisfied: 1,
        Average: 2,
        Poor: 5,
        Dissatisfied: 0,
        "Total Feedback": 9,
      },
    ]);
    //   }
    // })
    // .catch((error) => {
    //   console.log("error", error.message);
    // });
    // axios
    //   .get(`http://192.168.0.154:2121/reviews/getPatientWiseAvgRating`)
    //   .then((response) => {
    //     if ((response.data.statusCode = 200)) {
    //       console.log("setPatientData", response.data.result.result);

    // setPatientData(response.data.result.result);
    // setChartValue(response.data.result.totalAvgInOneToFive.toFixed(2));
    setPatientData([
      {
        "Total Patients Feedback": 185,
        "Highly Satisfied": 17,
        Satisfied: 24,
        Average: 38,
        Poor: 70,
        Dissatisfied: 36,
      },
    ]);
    setChartValue(2.55);
    //     console.log(
    //       "setChartValue",
    //       response.data.result.totalAvgInOneToFive.toFixed(2)
    //     );
    //   }
    // })
    // .catch((error) => {
    //   console.log("error", error.message);
    // });
    // axios
    //   .get(`http://192.168.0.154:2121/reviews/getStaffWiseAvgRating`)
    //   .then((response) => {
    //     if ((response.data.statusCode = 200)) {
    //       console.log("setConsultantStaffData", response.data.result.result);

    // setConsultantStaffData(response.data.result.result);
    // setChartStaffValue(
    //   response.data.result.totalAvgInOneToFive.toFixed(2)
    // );
    setConsultantStaffData([
      {
        "Total Staff Feedback": 246,
        "Highly Satisfied": 30,
        Satisfied: 24,
        Average: 52,
        Poor: 88,
        Dissatisfied: 52,
      },
    ]);
    setChartStaffValue(2.56);
    //     console.log(
    //       "setChartStaffValue",
    //       response.data.result.totalAvgInOneToFive.toFixed(2)
    //     );
    //   }
    // })
    // .catch((error) => {
    //   console.log("error", error.message);
    // });
    setValue("departmentType", 1);
  }, []);
  const departmentType = watch("departmentType");

  useEffect(() => {
    let departmentTypeKey;
    if (parseInt(departmentType) === 1) {
      departmentTypeKey = "Patient";
    } else if (parseInt(departmentType) === 2) {
      departmentTypeKey = "Consultant";
    } else if (parseInt(departmentType) === 3) {
      departmentTypeKey = "Staff";
    }
    axios
      .get(
        `http://192.168.0.154:2121/reviews/getDepartmentWiseAvgRating/${departmentTypeKey}`
      )
      .then((res) => res.data.result)
      .then((res) => {
        console.log("getDepartmentWiseAvgRating");
      })
      .catch((error) => {
        // errorAlert(error.message);
      });
  }, [departmentType]);

  const getCategoryFromValue = (value) => {
    if (value === null) {
      return "";
    } else if (value <= 1) {
      return "Highly Satisfied";
    } else if (value <= 2) {
      return "Satisfied";
    } else if (value <= 3) {
      return "Average";
    } else if (value <= 4) {
      return "Poor";
    } else if (value <= 5) {
      return "Dissatisfied";
    } else {
      return "Unknown";
    }
  };

  const avgChartArr = ipdFeedBackData.map((obj) => {
    const totalFeedback = obj["Total Feedback"];
    console.log("obj", obj);
    const totalAvg =
      (Number(obj["Highly Satisfied"]) * 5 +
        Number(obj.Satisfied) * 4 +
        Number(obj.Average) * 3 +
        Number(obj.Poor) * 2 +
        Number(obj.Dissatisfied) * 1) /
      Number(totalFeedback);

    return {
      Date: obj.Date,
      "Highly Satisfied": obj["Highly Satisfied"],
      Satisfied: obj.Satisfied,
      Average: obj.Average,
      Poor: obj.Poor,
      Dissatisfied: obj.Dissatisfied,
      "Total Feedback": totalFeedback,
      totalAvg: Number(totalAvg.toFixed(2)),
    };
  });
  const avgChartArr1 = opdFeedBackData.map((obj) => {
    const totalFeedback = obj["Total Feedback"];
    console.log("obj", obj);
    const totalAvg =
      (Number(obj["Highly Satisfied"]) * 5 +
        Number(obj.Satisfied) * 4 +
        Number(obj.Average) * 3 +
        Number(obj.Poor) * 2 +
        Number(obj.Dissatisfied) * 1) /
      Number(totalFeedback);

    return {
      Date: obj.Date,
      "Highly Satisfied": obj["Highly Satisfied"],
      Satisfied: obj.Satisfied,
      Average: obj.Average,
      Poor: obj.Poor,
      Dissatisfied: obj.Dissatisfied,
      "Total Feedback": totalFeedback,
      totalAvg: Number(totalAvg.toFixed(2)),
    };
  });
  const CustomLabel = (props) => {
    const { x, y, value, totalFeedback, totalAvg } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="middle"
          fontSize="12px"
          fontFamily="Poppins"
          fill="#666"
        >
          {`${value} - Total Feedback: ${totalFeedback}, Total Avg: ${totalAvg}`}
        </text>
      </g>
    );
  };
  const color = ["#FF2A2A", "#E99566", "#DDE032", "#AADF12", "#239F21"];

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div className="rounded border w-full ">
          <div className="  ">
            <div className="flex justify-between items-center">
              <div className="text-sm p-2  font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                OPD Patient Feedback{" "}
                <span className="text-[#FF740F] ml-1">(Average day-wise) </span>{" "}
              </div>
            </div>
            <div className="border-b border-gray-200 mx-2 shadow-md "></div>
          </div>

          <CardContent>
            {avgChartArr1.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart
                  width={600}
                  height={300}
                  data={avgChartArr1}
                  margin={{ top: 1, right: 10, left: 40, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="customGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stop-color="#239F21" />
                      <stop offset="100%" stop-color="#D9D9D9" />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="Date"
                    axisLine={true}
                    style={{ fontSize: "12px", fontFamily: "Poppins" }}
                    tickFormatter={(value) =>
                      format(new Date(value), "dd-MM-yyyy")
                    }
                  />
                  <YAxis
                    axisLine={true}
                    allowDecimals={false}
                    style={{
                      fontSize: "12px",
                      fontFamily: "Poppins",
                      whiteSpace: "nowrap",
                    }}
                    tick={(props) => {
                      return (
                        <text
                          y={props.y}
                          fontSize="12px"
                          fontFamily="Poppins"
                          fill={getColorForLabel(props.payload.value)}
                        >
                          {yAxisLabelFormatter(props.payload.value)}
                        </text>
                      );
                    }}
                    tickMargin={2}
                  />
                  <Tooltip
                    content={(props) => (
                      <CustomTooltip {...props} avgChartArr={avgChartArr1} />
                    )}
                  />

                  <Legend
                    iconType={Circle}
                    iconSize={10}
                    verticalAlign="top"
                    height={36}
                    wrapperStyle={{ fontSize: "1rem", fontFamily: "Poppins" }}
                    content={() => null}
                  />

                  <Area
                    type="monotone"
                    dataKey="totalAvg"
                    fill="url(#customGradient)"
                    stroke="#073763"
                    strokeWidth={0}
                    dot={{ r: 4, fill: "#073763" }}
                    data={avgChartArr1.filter(
                      (data) => data["Total Feedback"] > 0
                    )}
                  />
                  {avgChartArr1
                    .filter((data) => data["Total Feedback"] > 0)
                    .map((obj, index) => (
                      <Label
                        key={`label-${index}`}
                        content={(props) => (
                          <CustomLabel
                            {...props}
                            totalFeedback={obj["Total Feedback"]}
                            totalAvg={obj.totalAvg}
                          />
                        )}
                        style={{ fontSize: "12px", fontFamily: "Poppins" }}
                      />
                    ))}
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className=" py-[98px] flex justify-center font-semibold text-gray-600 text-sm">
                <p className="my-auto ">
                  Patient Details Are Not Available
                  <span className="animate-pulse tracking-wider">...</span>
                </p>
              </div>
            )}
          </CardContent>
        </div>
        <div className="rounded border w-full ">
          <div className="  ">
            <div className="flex justify-between items-center">
              <div className="text-sm p-2  font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                IPD Patient Feedback
                <span className="text-[#FF740F] ml-1">
                  (Average day-wise){" "}
                </span>{" "}
              </div>
            </div>
            <div className="border-b border-gray-200 mx-2 shadow-md "></div>
          </div>
          {/* <div className="flex items-center">
            <div className="">
              {Object.values(IPDList).map((value, index) => (
                <div
                  className=" text-xs font-semibold mb-3 pl-2 whitespace-nowrap"
                  key={index}
                  style={{ color: colorMapping[value] }}
                >
                  {value}
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart
                data={IPDData}
                syncId="ipdChart"
                margin={{
                  top: 10,
                  right: 30,
                  left: 30,
                  bottom: 0,
                }}
              >
                <XAxis
                  dataKey="name"
                  hide={false}
                  axisLine={{ stroke: "none" }}
                  tickLine={false}
                  tick={{
                    fontSize: 12,
                    fill: "#000000",
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="pv"
                  fill="url(#customGradient1)"
                  stroke="#073763"
                  strokeWidth={0}
                  dot={{ r: 4, fill: "#073763" }}
                />
                <defs>
                  <linearGradient
                    id="customGradient1"
                    x1="0.3"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stop-color="#FF2A2A" />
                    <stop offset="100%" stop-color="#D9D9D9" />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div> */}

          <CardContent>
            {avgChartArr.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart
                  width={600}
                  height={300}
                  data={avgChartArr}
                  margin={{ top: 1, right: 10, left: 40, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="customGradient1"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stop-color="#FF2A2A" />
                      <stop offset="100%" stop-color="#D9D9D9" />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="Date"
                    axisLine={true}
                    style={{ fontSize: "12px", fontFamily: "Poppins" }}
                    tickFormatter={(value) =>
                      format(new Date(value), "dd-MM-yyyy")
                    }
                  />
                  <YAxis
                    axisLine={true}
                    allowDecimals={false}
                    style={{
                      fontSize: "12px",
                      fontFamily: "Poppins",
                      whiteSpace: "nowrap",
                    }}
                    tick={(props) => {
                      console.log("tick", props.payload.value);
                      return (
                        <text
                          y={props.y}
                          fontSize="12px"
                          fontFamily="Poppins"
                          fill={getColorForLabel(props.payload.value)}
                        >
                          {yAxisLabelFormatter(props.payload.value)}
                        </text>
                      );
                    }}
                    tickMargin={2}
                  />
                  <Tooltip
                    content={(props) => (
                      <CustomTooltip {...props} avgChartArr={avgChartArr} />
                    )}
                  />

                  <Legend
                    iconType={Circle}
                    iconSize={10}
                    verticalAlign="top"
                    height={36}
                    wrapperStyle={{ fontSize: "1rem", fontFamily: "Poppins" }}
                    content={() => null}
                  />

                  <Area
                    type="monotone"
                    dataKey="totalAvg"
                    fillOpacity={1}
                    fill="url(#customGradient1)"
                    stroke="#073763"
                    strokeWidth={0}
                    dot={{ r: 4, fill: "#073763" }}
                    data={avgChartArr.filter(
                      (data) => data["Total Feedback"] > 0
                    )}
                  />
                  {avgChartArr
                    .filter((data) => data["Total Feedback"] > 0)
                    .map((obj, index) => (
                      <Label
                        key={`label-${index}`}
                        content={(props) => (
                          <CustomLabel
                            {...props}
                            totalFeedback={obj["Total Feedback"]}
                            totalAvg={obj.totalAvg}
                          />
                        )}
                        style={{ fontSize: "12px", fontFamily: "Poppins" }}
                      />
                    ))}
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className=" py-[98px] flex justify-center font-semibold text-gray-600 text-sm">
                <p className="my-auto ">
                  Patient Details Are Not Available
                  <span className="animate-pulse tracking-wider">...</span>
                </p>
              </div>
            )}
          </CardContent>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 mt-2">
        <div className="rounded border w-full ">
          <div className="  ">
            <div className="flex justify-between items-center">
              <div className="text-sm p-2  font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                Consultant Feedback
              </div>
            </div>
            <div className="border-b border-gray-200 mx-2 shadow-md "></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            <div className=" items-center col-span-2  align-middle">
              <div className=" flex justify-center  align-middle xl:ml-4  sm:ml-5 ">
                <div className="text-center  justify-center  -mb-5 mt-6 ">
                  <PieChart width={width} height={width / 2 + 100}>
                    <Pie
                      activeIndex={activeSectorIndex1}
                      innerRadius="55%"
                      data={data}
                      blendStroke
                      fill="#8884d8"
                      {...pieProps}
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Pie
                      stroke="none"
                      activeIndex={1}
                      activeShape={Arrow}
                      data={arrowData}
                      outerRadius={pieRadius.innerRadius}
                      fill="none"
                      {...pieProps}
                    />
                  </PieChart>
                  <div className="text-center text-[#073763] font-semibold relative -top-[90px] left-[5px] text-sm">
                    <Rating
                      name="simple-controlled"
                      value={chartValue}
                      precision={0.5}
                    />
                    <h2>{chartValue}</h2>
                    <span className=" mt-7  text-center   text-sm font-semibold">
                      {getCategoryFromValue(chartValue)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3  ">
              <div
                className={` m-4 ${
                  patientData.length > 0 ? "border-gray-500 border-l-4 " : ""
                }`}
              >
                {
                  <div className=" mt-1 ">
                    {patientData.length > 0 ? (
                      patientData.map((value, index) => {
                        return (
                          <>
                            <div className="text-sm grid gap-y-2">
                              <h2 className="  font-semibold whitespace-nowrap   rounded p-2  bg-[#f3ffd0] flex items-center space-x-[61px]">
                                Total Patients Feedback &nbsp; : &nbsp;
                                {value["Total Patients Feedback"]}
                              </h2>
                              <div
                                key={index}
                                className=" whitespace-nowrap    rounded p-2  bg-[#e6ffe5] flex items-center space-x-[5px] "
                              >
                                <h4 className="text-black flex space-x-[5px]">
                                  <span>
                                    <FiberManualRecordIcon
                                      className="text-[#239f21] text-sm"
                                      fontSize="45"
                                    />
                                  </span>
                                  <span className="text-sm font-semibold">
                                    Highly Satisfied &nbsp;{" "}
                                  </span>
                                </h4>
                                <span className="text-sm font-semibold">
                                  : &nbsp;{value["Highly Satisfied"]}
                                </span>
                              </div>
                              <div
                                key={index}
                                className=" whitespace-nowrap   rounded p-2 bg-[#f3ffd0] flex items-center space-x-[61px]"
                              >
                                <h5 className="text-black flex space-x-1">
                                  <span>
                                    <FiberManualRecordIcon
                                      className="text-[#AADF12]"
                                      fontSize="25"
                                    />
                                  </span>
                                  <span className="text-sm font-semibold">
                                    Satisfied{" "}
                                  </span>
                                </h5>
                                <span className="text-sm font-semibold">
                                  : &nbsp; {value["Satisfied"]}
                                </span>
                              </div>
                              <div
                                key={index}
                                className=" whitespace-nowrap   rounded p-2 bg-[#feffd2] flex items-center space-x-[55px]"
                              >
                                <h4 className="text-black flex space-x-1">
                                  <span>
                                    <FiberManualRecordIcon
                                      className="text-[#DDE032]"
                                      fontSize="25"
                                    />
                                  </span>
                                  <span className="text-sm font-semibold">
                                    Average &nbsp;
                                  </span>
                                </h4>
                                <span className="text-sm font-semibold">
                                  : &nbsp; {value["Average"]}
                                </span>
                              </div>
                              <div
                                key={index}
                                className="whitespace-nowrap   rounded p-2 bg-[#ffebd2] flex items-center space-x-[83px]"
                              >
                                <h4 className="text-black flex space-x-1">
                                  <span>
                                    <FiberManualRecordIcon
                                      className="text-[#E99566]"
                                      fontSize="25"
                                    />
                                  </span>
                                  <span className="text-sm font-semibold">
                                    Poor &nbsp;
                                  </span>
                                </h4>
                                <span className="text-sm font-semibold">
                                  : &nbsp; {value["Poor"]}
                                </span>
                              </div>
                              <div
                                key={index}
                                className=" whitespace-nowrap   rounded p-2 bg-[#ffdbdb] flex items-center space-x-[34px]"
                              >
                                <h4 className="text-black flex space-x-1">
                                  <span>
                                    <FiberManualRecordIcon
                                      className="text-[#FF2A2A]"
                                      fontSize="25"
                                    />
                                  </span>
                                  <span className="text-sm font-semibold">
                                    Dissatisfied &nbsp;
                                  </span>
                                </h4>

                                <span className="text-sm font-semibold">
                                  : &nbsp;{value["Dissatisfied"]}
                                </span>
                              </div>
                            </div>
                          </>
                        );
                      })
                    ) : (
                      <div className=" py-[98px] flex justify-center font-semibold text-gray-600 text-sm">
                        <p className="my-auto ">
                          Patients Feedback Is Not Availabale{" "}
                          <span className="animate-pulse tracking-wider">
                            ...
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="rounded border w-full ">
          <div className="  ">
            <div className="flex justify-between items-center">
              <div className="text-sm p-2  font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                Staff Feedback{" "}
              </div>
            </div>
            <div className="border-b border-gray-200 mx-2 shadow-md "></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            <div className=" items-center col-span-2  align-middle">
              <div className=" flex justify-center  align-middle xl:ml-4  sm:ml-5 ">
                <div className="text-center  justify-center -mb-5  mt-6 ">
                  <PieChart width={width} height={width / 2 + 100}>
                    <Pie
                      activeIndex={activeSectorIndex}
                      innerRadius="55%"
                      data={data}
                      blendStroke
                      fill="#8884d8"
                      {...pieProps}
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Pie
                      stroke="none"
                      activeIndex={1}
                      activeShape={Arrow}
                      data={arrowData}
                      outerRadius={pieRadius.innerRadius}
                      fill="none"
                      {...pieProps}
                    />
                  </PieChart>
                  <div className="text-center text-[#073763] font-semibold relative -top-[90px] left-[5px] text-sm">
                    <Rating
                      name="simple-controlled"
                      value={chartStaffValue}
                      precision={0.5}
                    />
                    <h2>{chartStaffValue}</h2>
                    <span className=" mt-7  text-center  text-sm font-semibold">
                      {getCategoryFromValue(chartStaffValue)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3 ">
              <div
                className={` m-4 ${
                  consultantStaffData?.length > 0
                    ? "border-gray-500 border-l-4 "
                    : ""
                }`}
              >
                {
                  <div className=" mt-1">
                    {consultantStaffData?.length > 0 ? (
                      consultantStaffData.map((value, index) => {
                        return (
                          <>
                            <div className="text-sm grid gap-y-2">
                              <h2 className="  font-semibold whitespace-nowrap   rounded p-2  bg-[#f3ffd0] flex items-center space-x-[61px]">
                                Total Staff Feedback &nbsp; : &nbsp;
                                {value["Total Staff Feedback"]}
                              </h2>
                              <div
                                key={index}
                                className=" whitespace-nowrap    rounded p-2  bg-[#e6ffe5] flex items-center space-x-[5px] "
                              >
                                <h4 className="text-black flex space-x-[5px]">
                                  <span>
                                    <FiberManualRecordIcon
                                      className="text-[#239f21] text-sm"
                                      fontSize="45"
                                    />
                                  </span>
                                  <span className="text-sm font-semibold">
                                    Highly Satisfied &nbsp;{" "}
                                  </span>
                                </h4>
                                <span className="text-sm font-semibold">
                                  : &nbsp;{value["Highly Satisfied"]}
                                </span>
                              </div>
                              <div
                                key={index}
                                className=" whitespace-nowrap   rounded p-2 bg-[#f3ffd0] flex items-center space-x-[61px]"
                              >
                                <h5 className="text-black flex space-x-1">
                                  <span>
                                    <FiberManualRecordIcon
                                      className="text-[#AADF12]"
                                      fontSize="25"
                                    />
                                  </span>
                                  <span className="text-sm font-semibold">
                                    Satisfied{" "}
                                  </span>
                                </h5>
                                <span className="text-sm font-semibold">
                                  : &nbsp; {value["Satisfied"]}
                                </span>
                              </div>
                              <div
                                key={index}
                                className=" whitespace-nowrap   rounded p-2 bg-[#feffd2] flex items-center space-x-[55px]"
                              >
                                <h4 className="text-black flex space-x-1">
                                  <span>
                                    <FiberManualRecordIcon
                                      className="text-[#DDE032]"
                                      fontSize="25"
                                    />
                                  </span>
                                  <span className="text-sm font-semibold">
                                    Average &nbsp;
                                  </span>
                                </h4>
                                <span className="text-sm font-semibold">
                                  : &nbsp; {value["Average"]}
                                </span>
                              </div>
                              <div
                                key={index}
                                className="whitespace-nowrap   rounded p-2 bg-[#ffebd2] flex items-center space-x-[83px]"
                              >
                                <h4 className="text-black flex space-x-1">
                                  <span>
                                    <FiberManualRecordIcon
                                      className="text-[#E99566]"
                                      fontSize="25"
                                    />
                                  </span>
                                  <span className="text-sm font-semibold">
                                    Poor &nbsp;
                                  </span>
                                </h4>
                                <span className="text-sm font-semibold">
                                  : &nbsp; {value["Poor"]}
                                </span>
                              </div>
                              <div
                                key={index}
                                className=" whitespace-nowrap   rounded p-2 bg-[#ffdbdb] flex items-center space-x-[34px]"
                              >
                                <h4 className="text-black flex space-x-1">
                                  <span>
                                    <FiberManualRecordIcon
                                      className="text-[#FF2A2A]"
                                      fontSize="25"
                                    />
                                  </span>
                                  <span className="text-sm font-semibold">
                                    Dissatisfied &nbsp;
                                  </span>
                                </h4>

                                <span className="text-sm font-semibold">
                                  : &nbsp;{value["Dissatisfied"]}
                                </span>
                              </div>
                            </div>
                          </>
                        );
                      })
                    ) : (
                      <div className=" py-[98px] flex justify-center font-semibold text-gray-600 text-sm">
                        <p className="my-auto ">
                          Staff Feedback Is Not Availabale{" "}
                          <span className="animate-pulse tracking-wider">
                            ...
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 items-center">
        <div className="flex justify-start text-sm font-semibold">
          Department - Wise Feedback
        </div>
        <div className="flex  ">
          <RadioField
            dataArray={departmentOptions}
            name="departmentType"
            control={control}
          />
        </div>
      </div>
      <div className=" grid  grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-2">
        <div className="rounded border w-full">
          <div className="flex justify-between items-center">
            <div className="text-sm p-2  font-semibold flex items-center justify-start whitespace-nowrap ml-2">
              Radiology
            </div>
            <div>
              <button
                type="button"
                className={`px-2 py-1 rounded  border border-[073763] mr-2 text-xs font-medium text-[#073763] bg-[#DCEEFF] `}
              >
                More
              </button>
            </div>
          </div>
          <div className="border-b border-gray-200 mx-2 shadow-md "></div>{" "}
          <div className="   grid grid-cols-10">
            <div className="col-span-4">
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie
                    data={PIdata}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {PIdata.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="col-span-6 pl-2 mt-2">
              <div className="grid grid-cols-1">
                {PIdata.map((entry, index) => (
                  <div key={`cell-${index}`} className={` flex mb-2`}>
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <div className="pl-1 text-xs whitespace-nowrap">
                      {entry.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="rounded border w-full">
          <div className="flex justify-between items-center">
            <div className="text-sm p-2  font-semibold flex items-center justify-start whitespace-nowrap ml-2">
              Pathology
            </div>
            <div>
              <button
                type="button"
                className={`px-2 py-1 rounded border border-[073763] mr-2 text-xs font-medium text-[#073763] bg-[#DCEEFF] `}
              >
                More
              </button>
            </div>
          </div>
          <div className="border-b border-gray-200 mx-2 shadow-md "></div>{" "}
          <div className="   grid grid-cols-10">
            <div className="col-span-4">
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie
                    data={PIdata}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {PIdata.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="col-span-6 pl-2 mt-2">
              <div className="grid grid-cols-1">
                {PIdata.map((entry, index) => (
                  <div key={`cell-${index}`} className={` flex mb-2`}>
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <div className="pl-1 text-xs whitespace-nowrap">
                      {entry.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="rounded border w-full">
          <div className="flex justify-between items-center">
            <div className="text-sm p-2  font-semibold flex items-center justify-start whitespace-nowrap ml-2">
              Cardiology
            </div>
            <div>
              <button
                type="button"
                className={`px-2 py-1 rounded border border-[073763] mr-2 text-xs font-medium text-[#073763] bg-[#DCEEFF] `}
              >
                More
              </button>
            </div>
          </div>
          <div className="border-b border-gray-200 mx-2 shadow-md "></div>{" "}
          <div className="   grid grid-cols-10">
            <div className="col-span-4">
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie
                    data={PIdata}
                    // cx={50}
                    // cy={64}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {PIdata.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="col-span-6 pl-2 mt-2">
              <div className="grid grid-cols-1">
                {PIdata.map((entry, index) => (
                  <div key={`cell-${index}`} className={` flex mb-2`}>
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <div className="pl-1 text-xs whitespace-nowrap">
                      {entry.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="rounded border w-full">
          <div className="flex justify-between items-center">
            <div className="text-sm p-2  font-semibold flex items-center justify-start whitespace-nowrap ml-2">
              Orthopedic
            </div>
            <div>
              <button
                type="button"
                className={`px-2 py-1 rounded border border-[073763] mr-2 text-xs font-medium text-[#073763] bg-[#DCEEFF] `}
              >
                More
              </button>
            </div>
          </div>
          <div className="border-b border-gray-200 mx-2 shadow-md "></div>{" "}
          <div className="   grid grid-cols-10">
            <div className="col-span-4">
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie
                    data={PIdata}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {PIdata.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="col-span-6 pl-2 mt-2">
              <div className="grid grid-cols-1">
                {PIdata.map((entry, index) => (
                  <div key={`cell-${index}`} className={` flex mb-2`}>
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <div className="pl-1 text-xs whitespace-nowrap">
                      {entry.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDashboard;
