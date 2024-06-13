import { TableContainer } from "@mui/material";
import React, { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashBoardTotalIcon } from "../../Common Components/assets/ipdassets/Dashboard/DashboardIcons";

const LineData = [
  {
    name: "Mon",
    pv: 100,
    amt: 2400,
  },
  {
    name: "Tue",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Wed",
    uv: 2000,
    pv: 1000,
    amt: 2290,
  },
  {
    name: "Thu",
    uv: 2780,
    pv: 0,
    amt: 2000,
  },
  {
    name: "Fri",
    uv: 1890,
    pv: 400,
    amt: 2181,
  },
  {
    name: "Sat",
    uv: 2390,
    pv: 700,
    amt: 2500,
  },
  {
    name: "Sun",
    uv: 3490,
    pv: 300,
    amt: 2100,
  },
];
const barList = [
  {
    name: "Dep 1",
    pv: 500,
  },
  {
    name: "Dep 2",
    pv: 1000,
  },
  {
    name: "Dep 3",
    pv: 1400,
  },
  {
    name: "Dep 4",
    pv: 1200,
  },
  {
    name: "Dep 5",
    pv: 1400,
  },
];
const fontSize = 12;

const scheduleData = [
  {
    date: "10  February 2024",
    count: 5,
    surgeryDetails: [
      {
        startTime: "9 AM",
        endTime: "11 AM",
        theaters: [
          {
            surgeonsTheater: "Surgery 1 (Theater 1)",
            surgeons: [{ name: "Amit Raande , Yogesh Patil" }],
          },
          {
            surgeonsTheater: "Surgery 2 (Theater 2)",
            surgeons: [{ name: "Mahesh Salunkhe , Rajesh Jarange" }],
          },
        ],
      },
      {
        startTime: "12 AM",
        endTime: "1 PM",
        theaters: [
          {
            surgeonsTheater: "Surgery 1 (Theater 1)",
            surgeons: [{ name: "Amit Raande , Yogesh Patil" }],
          },
        ],
      },
      {
        startTime: "2 PM",
        endTime: "3 PM",
        theaters: [
          {
            surgeonsTheater: "Surgery 1 (Theater 1)",
            surgeons: [{ name: "Amit Raande , Yogesh Patil" }],
          },
        ],
      },
      {
        startTime: "5 PM",
        endTime: "6 PM",
        theaters: [
          {
            surgeonsTheater: "Surgery 1 (Theater 1)",
            surgeons: [{ name: "Amit Raande , Yogesh Patil" }],
          },
        ],
      },
      {
        startTime: "7 PM",
        endTime: "8 PM",
        theater: "Theater 1",
        theaters: [
          {
            surgeonsTheater: "Surgery 1 (Theater 1)",
            surgeons: [{ name: "Amit Raande , Yogesh Patil" }],
          },
        ],
      },
    ],
  },
  {
    date: "9  February 2024",
    count: 3,
    surgeryDetails: [
      {
        startTime: "9 AM",
        endTime: "11 AM",
        theater: "Theater 1",
        theaters: [
          {
            surgeonsTheater: "Surgery 1 (Theater 1)",
            surgeons: [{ name: "Amit Raande , Yogesh Patil" }],
          },
        ],
      },
      {
        startTime: "12 pM",
        endTime: "1 PM",
        theater: "Theater 1",
        theaters: [
          {
            surgeonsTheater: "Theater1",
            surgeons: [{ name: "Amit Raande , Yogesh Patil" }],
          },
        ],
      },
      {
        startTime: "2 PM",
        endTime: "3 PM",
        theater: "Theater 1",
        theaters: [
          {
            surgeonsTheater: "Theater1",
            surgeons: [{ name: "Amit Raande , Yogesh Patil" }],
          },
        ],
      },
    ],
  },
  {
    date: "8  February 2024",
    count: 5,
    surgeryDetails: [
      {
        startTime: "9 AM",
        endTime: "11 AM",
        theaters: [
          {
            surgeonsTheater: "Surgery 1 (Theater 1)",
            surgeons: [{ name: "Amit Raande , Yogesh Patil" }],
          },
          {
            surgeonsTheater: "Surgery 2 (Theater 1)",
            surgeons: [{ name: "Mahesh Salunkhe , Rajesh Jarange" }],
          },
        ],
      },
      {
        startTime: "11 AM",
        endTime: "12 PM",
        theaters: [
          {
            surgeonsTheater: "Surgery 1 (Theater 1)",
            surgeons: [{ name: "Amit Raande , Yogesh Patil" }],
          },
        ],
      },
      {
        startTime: "12 PM",
        endTime: "1 PM",
        theaters: [
          {
            surgeonsTheater: "Surgery 1 (Theater 1)",
            surgeons: [{ name: "Amit Raande , Yogesh Patil" }],
          },
        ],
      },
      {
        startTime: "2 PM",
        endTime: "3 PM",
        theaters: [
          {
            surgeonsTheater: "Surgery 1 (Theater 1)",
            surgeons: [{ name: "Amit Raande , Yogesh Patil" }],
          },
        ],
      },
      {
        startTime: "4 PM",
        endTime: "6 PM",
        theater: "Theater 1",
        theaters: [
          {
            surgeonsTheater: "Surgery 1 (Theater 1)",
            surgeons: [{ name: "Amit Raande , Yogesh Patil" }],
          },
        ],
      },
      {
        startTime: "6 PM",
        endTime: "9 PM",
        theater: "Theater 1",
        theaters: [
          {
            surgeonsTheater: "Surgery 1 (Theater 1)",
            surgeons: [{ name: "Amit Raande , Yogesh Patil" }],
          },
        ],
      },
    ],
  },
  {
    date: "7  February 2024",
    count: 4,
    surgeryDetails: [
      {
        startTime: "9 AM",
        endTime: "11 AM",
        theater: "Theater 1",
        theaters: [
          {
            surgeonsTheater: "Surgery 1 (Theater 1)",
            surgeons: [{ name: "Amit Raande , Yogesh Patil" }],
          },
        ],
      },
      {
        startTime: "11 AM",
        endTime: "12 PM",
        theater: "Theater 1",
        theaters: [
          {
            surgeonsTheater: "Theater1",
            surgeons: [{ name: "Amit Raande , Yogesh Patil" }],
          },
        ],
      },
      {
        startTime: "12 PM",
        endTime: "1 PM",
        theater: "Theater 1",
        theaters: [
          {
            surgeonsTheater: "Theater1",
            surgeons: [{ name: "Amit Raande , Yogesh Patil" }],
          },
        ],
      },
    ],
  },
  {
    date: "5  February 2024",
    count: 5,
    surgeryDetails: [
      {
        startTime: "9 AM",
        endTime: "11 AM",
        theaters: [
          {
            surgeonsTheater: "Surgery 1 (Theater 1)",
            surgeons: [{ name: "Amit Raande , Yogesh Patil" }],
          },
          {
            surgeonsTheater: "Surgery 2 (Theater 1)",
            surgeons: [{ name: "Mahesh Salunkhe , Rajesh Jarange" }],
          },
        ],
      },
      {
        startTime: "11 AM",
        endTime: "12 PM",
        theaters: [
          {
            surgeonsTheater: "Surgery 1 (Theater 1)",
            surgeons: [{ name: "Amit Raande , Yogesh Patil" }],
          },
        ],
      },
      {
        startTime: "12 PM",
        endTime: "1 PM",
        theaters: [
          {
            surgeonsTheater: "Surgery 1 (Theater 1)",
            surgeons: [{ name: "Amit Raande , Yogesh Patil" }],
          },
        ],
      },
      {
        startTime: "2 PM",
        endTime: "3 PM",
        theaters: [
          {
            surgeonsTheater: "Surgery 1 (Theater 1)",
            surgeons: [{ name: "Amit Raande , Yogesh Patil" }],
          },
        ],
      },
      {
        startTime: "4 PM",
        endTime: "6 PM",
        theater: "Theater 1",
        theaters: [
          {
            surgeonsTheater: "Surgery 1 (Theater 1)",
            surgeons: [{ name: "Amit Raande , Yogesh Patil" }],
          },
        ],
      },
      {
        startTime: "6 PM",
        endTime: "9 PM",
        theater: "Theater 1",
        theaters: [
          {
            surgeonsTheater: "Surgery 1 (Theater 1)",
            surgeons: [{ name: "Amit Raande , Yogesh Patil" }],
          },
        ],
      },
    ],
  },
  {
    date: "6  February 2024",
    count: 4,
    surgeryDetails: [
      {
        startTime: "9 AM",
        endTime: "11 AM",
        theater: "Theater 1",
        theaters: [
          {
            surgeonsTheater: "Surgery 1 (Theater 1)",
            surgeons: [{ name: "Amit Raande , Yogesh Patil" }],
          },
        ],
      },
      {
        startTime: "11 AM",
        endTime: "12 PM",
        theater: "Theater 1",
        theaters: [
          {
            surgeonsTheater: "Theater1",
            surgeons: [{ name: "Amit Raande , Yogesh Patil" }],
          },
        ],
      },
      {
        startTime: "12 PM",
        endTime: "1 PM",
        theater: "Theater 1",
        theaters: [
          {
            surgeonsTheater: "Theater1",
            surgeons: [{ name: "Amit Raande , Yogesh Patil" }],
          },
        ],
      },
    ],
  },
];

const data = [
  { name: "Cataract Surgery", pv: 260 },
  { name: "Caesarean Section ", pv: 240 },
  { name: "Appendectomy", pv: 230 },
  { name: "Cholecystectomy", pv: 199 },
  { name: "Tubal Ligation", pv: 180 },
  { name: "Angioplasty", pv: 165 },
  { name: "Orthopedic Surgeries", pv: 135 },
  { name: "Hernia Repair", pv: 124 },
  { name: "Cardiac Bypass Surgery ", pv: 105 },
  { name: "Hysterectomy", pv: 85 },
];
const dataRecords = [
  { name: "Dr. Ben Friedrich", pv: 260 },
  { name: "Dr. Ernst Young", pv: 240 },
  { name: "Dr. Walter Günther", pv: 230 },
  { name: "Dr. Ben Hertz", pv: 199 },
  { name: "Dr. Lieselotte von Schubert", pv: 180 },
  { name: "Dr. Jurgen Krause", pv: 165 },
  { name: "Dr. Gisela von Schröder", pv: 135 },
  { name: "Dr. Jonas Huber", pv: 124 },
  { name: "Dr. Julia Kaiser", pv: 105 },
  { name: "Dr. Edith von Hartmann", pv: 85 },
];

let ctx;

export const measureText14HelveticaNeue = (text) => {
  if (!ctx) {
    ctx = document.createElement("canvas").getContext("2d");
    ctx.font = "14px 'Helvetica Neue";
  }

  return ctx.measureText(text).width;
};

const BAR_AXIS_SPACE = 10;

const OTDashboard = () => {
  const [selectedOTBookingsButton, setSelectedOTBookingsButton] =
    useState("Day");
  const [selectedDepartmentButton, setSelectedDepartmentButton] =
    useState("Day");
  const [selectedTopSurgeryButton, setSelectedTopSurgeryButton] =
    useState("Day");
  const [selectedSurgeonSurgeryButton, setSelectedSurgeonSurgeryButton] =
    useState("Day");
  const opList = () => {
    return [
      {
        id: 1,
        title: "Today’s Surgery (Confirmed)",
        totalCount: 3,
        bgColor: "bg-[#329DFF]",
        icon: <DashBoardTotalIcon />,
      },
      {
        id: 2,
        title: "Completed",
        totalCount: 3,
        bgColor: "bg-[#1EBFC4]",
        icon: <DashBoardTotalIcon />,
      },
      {
        id: 3,
        title: "Emergency",
        totalCount: 3,
        bgColor: "bg-[#EF9542]",
        icon: <DashBoardTotalIcon />,
      },
      {
        id: 4,
        title: "Total Bookings",
        totalCount: 3,
        bgColor: "bg-[#1B9BBF]",
        icon: <DashBoardTotalIcon />,
      },
    ];
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className=" bg-gray-200 border border-gray-400 rounded-lg">
          <div className="text-black text-xs   font-semibold px-2 py-1">{`${data.pv}`}</div>
        </div>
      );
    }
    return null;
  };

  const CustomBar = (props) => {
    const { x, y, height, fill, pv } = props;
    return (
      <g>
        <g transform={`translate(${x},${y})`}>
          <text
            x={-10}
            y={0}
            dy={-10}
            fontSize={10}
            textAnchor="bottom"
            className="text-xs font-semibold tracking-wide"
          >
            {pv}
          </text>
        </g>
        <rect
          x={x}
          y={y}
          width={10}
          height={height}
          fill={fill}
          rx={5}
          ry={5}
        />
      </g>
    );
  };

  const OpLists = useMemo(() => opList(), []);

  const maxTextWidth = useMemo(
    () =>
      data.reduce((acc, cur) => {
        const value = cur.pv;
        const width = measureText14HelveticaNeue(value.toLocaleString());
        if (width > acc) {
          return width;
        }
        return acc;
      }, 0),
    []
  );

  const ButtonGroup = ({ labels, selectedButton, onButtonClick }) => (
    <div className="inline-flex rounded-lg shadow-sm mr-2" role="group">
      {labels.map((label, index) => (
        <button
          key={index}
          type="button"
          className={`px-2 py-1 text-xs font-medium ${
            selectedButton === label
              ? "text-white bg-[#073763]"
              : "text-black bg-transparent border"
          } ${index === 0 ? "rounded-l-lg" : ""} ${
            index === labels.length - 1 ? "rounded-r-lg" : ""
          } hover:bg-[#073763] hover:text-white dark:focus:bg-gray-700`}
          onClick={() => onButtonClick(label)}
        >
          {label}
        </button>
      ))}
    </div>
  );

  const handleOTBookingsButtonClick = (button) => {
    setSelectedOTBookingsButton(button);
  };

  const handleDepartmentButtonClick = (button) => {
    setSelectedDepartmentButton(button);
  };

  const handleSurgeonSurgeryButtonClick = (button) => {
    setSelectedSurgeonSurgeryButton(button);
  };

  const handleTopSurgeryButtonClick = (button) => {
    setSelectedTopSurgeryButton(button);
  };
  const CustomTooltips = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-300 rounded-lg">
          <div className="text-black text-xs font-semibold px-2 py-1">{`${label} : ${payload[0].value}`}</div>
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <div className=" font-semibold  text-sm mb-1">Operation Theater</div>
      <div className=" grid lg:grid-cols-7 grid-cols-1 gap-2">
        <div className=" lg:col-span-5">
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div className="rounded border w-full ">
              <div className="  ">
                <div className="flex justify-between items-center">
                  <div className="text-sm p-2  font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                    OT Bookings
                  </div>
                  <ButtonGroup
                    labels={["Day", "Week", "Month"]}
                    selectedButton={selectedOTBookingsButton}
                    onButtonClick={handleOTBookingsButtonClick}
                  />
                </div>
                <div className="border-b border-gray-200 mx-2 shadow-md "></div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  width={325}
                  height={200}
                  data={LineData}
                  padding={{
                    bottom: 100,
                  }}
                  margin={{
                    top: 10,
                    bottom: 10,
                    right: 20,
                  }}
                >
                  <CartesianGrid
                    stroke="#f0f0f0"
                    strokeLine="4 1"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    hide={false}
                    axisLine={{ stroke: "none" }}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    hide={false}
                    axisLine={{ stroke: "none" }}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />

                  <Line
                    type="monotone"
                    dataKey="pv"
                    strokeOpacity={LineData.pv}
                    stroke="#0B83A5"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="rounded border w-full ">
              <div className="  ">
                <div className="flex justify-between items-center">
                  <div className="text-sm p-2 font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                    Department wise Surgery's
                  </div>
                  <div className="hidden md:block">
                    <ButtonGroup
                      labels={["Day", "Week", "Month"]}
                      selectedButton={selectedDepartmentButton}
                      onButtonClick={handleDepartmentButtonClick}
                    />
                  </div>
                </div>
                <div className="border-b border-gray-200 mx-2 shadow-md "></div>
              </div>
              <div className=" md:hidden m-2">
                <ButtonGroup
                  labels={["Day", "Week", "Month"]}
                  selectedButton={selectedDepartmentButton}
                  onButtonClick={handleDepartmentButtonClick}
                />
              </div>
              <div className=" mt-2">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    width={325}
                    height={200}
                    data={barList}
                    margin={{
                      top: 10,
                      bottom: 10,
                      right: 20,
                    }}
                  >
                    <CartesianGrid
                      stroke="#f0f0f0"
                      strokeLine="4 1"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      hide={false}
                      axisLine={{ stroke: "none" }}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      hide={false}
                      axisLine={{ stroke: "none" }}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      padding={{ top: 10 }}
                    />
                    <Tooltip
                      content={<CustomTooltips />}
                      cursor={{
                        width: 0.1,
                        height: 10,
                        rx: 5,
                      }}
                    />

                    <Bar
                      dataKey="pv"
                      fill="#65BA91"
                      barSize={10}
                      margin={{ top: 10 }}
                      activeBar={{ stroke: "#0B83A5", strokeWidth: 1 }}
                      shape={<CustomBar />}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="rounded border w-full ">
              <div className="  ">
                <div className="flex justify-between items-center">
                  <div className="text-sm p-2 font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                    Top 10 Surgery's Performed
                  </div>
                  <div className="hidden md:block n sm:block">
                    <ButtonGroup
                      labels={["Day", "Week", "Month"]}
                      selectedButton={selectedTopSurgeryButton}
                      onButtonClick={handleTopSurgeryButtonClick}
                    />
                  </div>
                </div>
                <div className="border-b border-gray-200 mx-2 shadow-md "></div>
              </div>
              <div className=" md:hidden  m-2">
                <ButtonGroup
                  labels={["Day", "Week", "Month"]}
                  selectedButton={selectedTopSurgeryButton}
                  onButtonClick={handleTopSurgeryButtonClick}
                />
              </div>
              <div className=" mt-2">
                <ResponsiveContainer
                  width={"100%"}
                  height={35 * data.length}
                  debounce={50}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <BarChart
                    data={data}
                    layout="vertical"
                    margin={{
                      left: 5,
                      right: maxTextWidth + (BAR_AXIS_SPACE + 3),
                    }}
                  >
                    <XAxis
                      type="number"
                      position="top"
                      orientation="top"
                      fill="#C3A91D"
                      tick={{ fontSize }}
                      link={{ stroke: "#77c878" }}
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      tickLine={false}
                      tick={{
                        fontWeight: "bold",
                        fontSize,
                        fill: "#000000",
                      }}
                      width={180}
                    />
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{
                        width: 0.1,
                        height: 10,
                        rx: 5,
                      }}
                    />
                    <Bar
                      dataKey="pv"
                      minPointSize={1}
                      barSize={12}
                      activeBar={{
                        stroke: "#9ca3af",
                        fill: "#C3A91D",
                        strokeWidth: 1,
                      }}
                      shape={({ x, y, width, height, radius, pv }) => (
                        <g>
                          <rect
                            x={x}
                            y={y}
                            width={width}
                            strokeWidth={1}
                            height={height}
                            fill="#C3A91D"
                            rx={5}
                          />
                          <text
                            x={x + width + 20}
                            y={y + height + 20}
                            dy={-24}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-xs tracking-wide"
                            fill="black"
                            fontSize={8}
                          >
                            {pv}
                          </text>
                        </g>
                      )}
                    ></Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="rounded border-[#E4E4E4] border w-full ">
              <div className="  ">
                <div className="flex justify-between items-center">
                  <div className="text-sm p-2 font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                    Surgeon v/s Surgery's
                  </div>
                  <div className="hidden sm:block md:block">
                    <ButtonGroup
                      labels={["Day", "Week", "Month"]}
                      selectedButton={selectedSurgeonSurgeryButton}
                      onButtonClick={handleSurgeonSurgeryButtonClick}
                    />
                  </div>
                </div>
                <div className="border-b border-gray-200 mx-2 shadow-md "></div>
              </div>
              <div className="md:hidden m-2">
                <ButtonGroup
                  labels={["Day", "Week", "Month"]}
                  selectedButton={selectedSurgeonSurgeryButton}
                  onButtonClick={handleSurgeonSurgeryButtonClick}
                />
              </div>
              <div className=" mt-2">
                <ResponsiveContainer
                  width={"100%"}
                  height={35 * dataRecords.length}
                  debounce={50}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <BarChart
                    cx="50%"
                    data={dataRecords}
                    layout="vertical"
                    margin={{
                      left: 5,
                      right: maxTextWidth + (BAR_AXIS_SPACE + 3),
                    }}
                  >
                    <XAxis
                      type="number"
                      position="top"
                      orientation="top"
                      fill="#C3A91D"
                      tick={{ fontSize }}
                      link={{ stroke: "#77c878" }}
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      tickLine={false}
                      tick={{
                        fontWeight: "bold",
                        fontSize,
                        fill: "#000000",
                      }}
                      width={180}
                    />
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{
                        width: 0.1,
                        height: 10,
                        rx: 5,
                      }}
                    />
                    <Bar
                      dataKey="pv"
                      minPointSize={1}
                      barSize={12}
                      activeBar={{
                        stroke: "#9ca3af",
                        fill: "#6B7FC6",
                        strokeWidth: 1,
                      }}
                      shape={({ x, y, width, height, radius, pv }) => (
                        <g>
                          <rect
                            x={x}
                            y={y}
                            width={width}
                            height={height}
                            fill="#6B7FC6"
                            strokeWidth={1}
                            rx={5}
                          />
                          <text
                            x={x + width + 20}
                            y={y + height + 20}
                            dy={-24}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-xs tracking-wide"
                            fill="black"
                          >
                            {pv}
                          </text>
                        </g>
                      )}
                    ></Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        <div className=" col-span-2">
          <div className="rounded border border-gray-300 w-full bg-white">
            <div className="  ">
              <div className="flex rounded-tr  rounded-tl bg-[#CEF4FF] justify-between items-center">
                <div className="text-md text-[#073763] p-2 font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                  OT Schedule
                </div>
              </div>
              <div className="border-b border-gray-300 shadow-md "></div>
              <TableContainer
                square={true}
                elevation={1}
                sx={{
                  marginRight: "1.50px",
                  "&::-webkit-scrollbar": {
                    width: 7,
                    height: 10,
                    margin: "6px",
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
                className="rounded  max-h-[695px] "
              >
                <table className="w-full ">
                  <tbody>
                    {scheduleData.map((day, index) =>
                      day.surgeryDetails.map((surgery, surgeryIndex) => (
                        <React.Fragment key={`${index}-${surgeryIndex}`}>
                          <tr className=" mx-2">
                            {surgeryIndex === 0 ? (
                              <>
                                <td
                                  className={`text-md  mr-2 bg-[#E9E9E9] grid grid-cols-2 font-semibold ml-2 my-1 py-1  border rounded-lg px-3 border-gray-200  border-gray-200`}
                                >
                                  <div className="text-md  whitespace-nowrap text-[#3B3B3B]">
                                    {day.date}
                                  </div>
                                  <div className="flex text-[red] justify-end text-md font-semibold">
                                    {day.count}
                                  </div>
                                </td>
                              </>
                            ) : (
                              <td colSpan="2"></td>
                            )}
                          </tr>
                          <tr
                            className="grid grid-cols-6 w-full mb-5 items-center "
                            key={`${index}-${surgeryIndex}`}
                          >
                            <td
                              rowSpan="2"
                              className={`col-span-1 
                        }`}
                            >
                              <div className=" flex justify-center items-center">
                                <div className="items-center">
                                  <span className=" font-semibold text-sm">
                                    {surgery.startTime}
                                  </span>
                                  <div className="text-xs  text-[#676767] flex justify-center">
                                    TO
                                  </div>
                                  <div className=" font-semibold text-sm">
                                    {surgery.endTime}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td
                              rowSpan="2"
                              className={`col-span-5 ml-2 items-center  border-l-4 rounded-t rounded-b ${
                                surgeryIndex % 2 === 0
                                  ? "border-[#FFA149]"
                                  : "border-[#468EFB]"
                              }`}
                            >
                              <div className="">
                                <div className=" items-center">
                                  {surgery.theaters.map(
                                    (theater, theaterIndex) => (
                                      <div
                                        className=" p-1  items-center"
                                        key={`${index}-${surgeryIndex}-${theaterIndex}`}
                                      >
                                        <div className="text-sm font-semibold text-[#073763]">
                                          {theater.surgeonsTheater}
                                        </div>
                                        <div className="text-sm text-[#676767] ">
                                          {theater.surgeons
                                            .map((surgeon) => surgeon.name)
                                            .join(", ")}
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        </React.Fragment>
                      ))
                    )}
                  </tbody>
                </table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTDashboard;
