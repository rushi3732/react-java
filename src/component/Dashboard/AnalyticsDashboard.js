import React, { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashBoardTotalIcon } from "../../Common Components/assets/ipdassets/Dashboard/DashboardIcons";

const AnalyticsDashboard = () => {
  const COLORS = ["#4C63B5", "#FFC44B", "#1BC96B", "#e9a7d7"];
  const data = [
    { name: "Advised", value: 662 },
    { name: "No Advice ", value: 50 },
    { name: " Converted", value: 535 },
  ];
  const barList = [
    {
      name: "Surgery",
      advised: 790,
      converted: 750,
    },
    {
      name: "Admission",
      advised: 600,
      converted: 250,
    },
    {
      name: "Pathology",
      advised: 700,
      converted: 650,
    },
    {
      name: "Radiology",
      advised: 500,
      converted: 450,
    },
    {
      name: "Prescriptions",
      advised: 300,
      converted: 250,
    },
    {
      name: "Physiotherapy",
      advised: 100,
      converted: 90,
    },
  ];

  const SurgeryAdvisedData = [
    {
      name: "Mon",
      advised: 100,
      converted: 0,
    },
    {
      name: "Tue",
      converted: 300,
      advised: 408,
    },
    {
      name: "Wed",
      converted: 500,
      advised: 1000,
    },
    {
      name: "Thu",
      converted: 10,
      advised: 700,
    },
    {
      name: "Fri",
      converted: 390,
      advised: 650,
    },
    {
      name: "Sat",
      converted: 390,
      advised: 800,
    },
    {
      name: "Sun",
      converted: 600,
      advised: 900,
    },
  ];
  const AdmissionAdvisedData = [
    {
      name: "Mon",
      advised: 100,
      converted: 0,
    },
    {
      name: "Tue",
      converted: 300,
      advised: 408,
    },
    {
      name: "Wed",
      converted: 500,
      advised: 1000,
    },
    {
      name: "Thu",
      converted: 10,
      advised: 700,
    },
    {
      name: "Fri",
      converted: 390,
      advised: 650,
    },
    {
      name: "Sat",
      converted: 390,
      advised: 800,
    },
    {
      name: "Sun",
      converted: 600,
      advised: 900,
    },
  ];
  const PathologyAdvisedData = [
    {
      name: "Mon",
      advised: 100,
      converted: 0,
    },
    {
      name: "Tue",
      converted: 300,
      advised: 408,
    },
    {
      name: "Wed",
      converted: 500,
      advised: 1000,
    },
    {
      name: "Thu",
      converted: 10,
      advised: 700,
    },
    {
      name: "Fri",
      converted: 390,
      advised: 650,
    },
    {
      name: "Sat",
      converted: 390,
      advised: 800,
    },
    {
      name: "Sun",
      converted: 600,
      advised: 900,
    },
  ];
  const RadiologyAdvisedData = [
    {
      name: "Mon",
      advised: 100,
      converted: 0,
    },
    {
      name: "Tue",
      converted: 300,
      advised: 408,
    },
    {
      name: "Wed",
      converted: 500,
      advised: 1000,
    },
    {
      name: "Thu",
      converted: 10,
      advised: 700,
    },
    {
      name: "Fri",
      converted: 390,
      advised: 650,
    },
    {
      name: "Sat",
      converted: 390,
      advised: 800,
    },
    {
      name: "Sun",
      converted: 600,
      advised: 900,
    },
  ];
  const PrescriptionsAdvisedData = [
    {
      name: "Mon",
      advised: 100,
      converted: 0,
    },
    {
      name: "Tue",
      converted: 300,
      advised: 408,
    },
    {
      name: "Wed",
      converted: 500,
      advised: 1000,
    },
    {
      name: "Thu",
      converted: 10,
      advised: 700,
    },
    {
      name: "Fri",
      converted: 390,
      advised: 650,
    },
    {
      name: "Sat",
      converted: 390,
      advised: 800,
    },
    {
      name: "Sun",
      converted: 600,
      advised: 900,
    },
  ];
  const PhysiotherapyAdvisedData = [
    {
      name: "Mon",
      advised: 100,
      converted: 0,
    },
    {
      name: "Tue",
      converted: 300,
      advised: 408,
    },
    {
      name: "Wed",
      converted: 500,
      advised: 1000,
    },
    {
      name: "Thu",
      converted: 10,
      advised: 700,
    },
    {
      name: "Fri",
      converted: 390,
      advised: 650,
    },
    {
      name: "Sat",
      converted: 390,
      advised: 800,
    },
    {
      name: "Sun",
      converted: 600,
      advised: 900,
    },
  ];
  const chartData = [
    { title: "Surgery Advised", data: SurgeryAdvisedData },
    { title: "Admission Advised", data: AdmissionAdvisedData },
    { title: "Pathology Advised", data: PathologyAdvisedData },
    { title: "Radiology Advised", data: RadiologyAdvisedData },
    { title: "Prescriptions Advised", data: PrescriptionsAdvisedData },
    { title: "Physiotherapy Advised", data: PhysiotherapyAdvisedData },
  ];
  const LineTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const valueKey = payload[0].dataKey;
      const valueKey1 = payload[1].dataKey;

      return (
        <div className="bg-white border border-gray-300 rounded-lg">
          <div className="text-black text-xs px-2">
            {`${
              valueKey === "advised" ? "Advised  " : ""
            }${"\u00A0"} ${"\u00A0"}  :${"\u00A0"}${data[valueKey]}`}
          </div>

          <div className="text-black text-xs px-2">
            {`${valueKey1 === "converted" ? "Converted  :" : ""} ${
              data[valueKey1]
            }`}
          </div>
        </div>
      );
    }
  };
  const opList = [
    {
      id: 1,
      title: "Patient Visits",
      totalCount: 500,
      bgColor: "bg-[#329DFF]",
      icon: <DashBoardTotalIcon />,
    },
    {
      id: 2,
      title: "Surgery",
      totalCount: 50,
      bgColor: "bg-[#1EBFC4]",
      icon: <DashBoardTotalIcon />,
    },
    {
      id: 3,
      title: "Admission",
      totalCount: 50,
      bgColor: "bg-[#EF9542]",
      icon: <DashBoardTotalIcon />,
    },
    {
      id: 4,
      title: "Pathology",
      totalCount: 50,
      bgColor: "bg-[#CDA3A3]",
      icon: <DashBoardTotalIcon />,
    },
    {
      id: 5,
      title: "Radiology",
      totalCount: 50,
      bgColor: "bg-[#1B9BBF]",
      icon: <DashBoardTotalIcon />,
    },
    {
      id: 6,
      title: "Prescriptions",
      totalCount: 50,
      bgColor: "bg-[#018438]",
      icon: <DashBoardTotalIcon />,
    },
    {
      id: 7,
      title: "Physiotherapy",
      totalCount: 50,
      bgColor: "bg-[#A8AB1D]",
      icon: <DashBoardTotalIcon />,
    },
    {
      id: 8,
      title: "No Advices",
      totalCount: 50,
      bgColor: "bg-[#B73C3C]",
      icon: <DashBoardTotalIcon />,
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    console.log("Tooltip Props:", active, payload, label);

    if (active && payload && payload.length) {
      return (
        <div className="bg-white border items-center border-gray-300 rounded-lg">
          <div className="text-black text-xs items-center text-center font-semibold px-2 py-[1px]">{`${label}`}</div>
          <div className="text-black text-xs  px-2 py-[1px]">{`Advised ${"\u00A0"} ${"\u00A0"}${"\u00A0"}: ${
            payload[0].value
          }`}</div>

          <div className="text-black text-xs px-2 py-[1px]">{`Converted : ${payload[1].value}`}</div>
        </div>
      );
    }

    return null;
  };
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


  return (
    <div>
      <div className=" font-semibold  text-sm mb-1">Patient Analytics </div>
      <div className="">
        <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-2 mb-2">
          {opList.map((record, index) => (
            <div
              key={record.id}
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
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div className=" rounded border border-gray-300 w-full  ">
          <div className=" rounded  ">
            <div className="flex bg-gray-100 rounded  rounded-tr  rounded-tl justify-between items-center">
              <div className="text-sm p-2  font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                Overall Advised V/s Converted Ratio{" "}
              </div>
            </div>
          </div>
          <div className=" grid grid-cols-4 items-center">
            <div className="col-span-3">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart
                  margin={{
                    top: 30,
                    bottom: 50,
                  }}
                  padding={{
                    bottom: 50,
                  }}
                >
                  <Pie
                    data={data}
                    margin={{
                      top: 30,
                      bottom: 50,
                    }}
                    cx="50%"
                    cy={74}
                    isAnimationActive={true}
                    label={(props) => {
                      return (
                        <text
                          {...props}
                          style={{ fontSize: "12px", fontWeight: "bold" }}
                        >
                          {props.value}
                        </text>
                      );
                    }}
                    tick={10}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="col-span-1  items-center">
              <div className="mt-2 items-center ">
                {data.map((entry, index) => (
                  <div
                    key={`cell-${index}`}
                    className=" flex  items-center space-x-2  mb-2  "
                  >
                    <div
                      className=" whitespace-nowrap"
                      style={{
                        backgroundColor: COLORS[index % COLORS.length],
                        width: "0.80rem",
                        height: "0.80rem",
                        borderRadius: "50%",
                      }}
                    ></div>
                    <div className="text-sm  whitespace-nowrap ">
                      {entry.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="rounded border border-gray-300 w-full ">
          <div className="  ">
            <div className="flex justify-between rounded-tr  rounded-tl  bg-gray-100 items-center">
              <div className="text-sm p-2 font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                Type-wise Conversion{" "}
              </div>
              <div className="hidden md:block mr-2">
                <div className="flex justify-between space-x-1 items-center">
                  <div className="flex space-x-1 items-center">
                    <div className=" w-3 h-3 rounded-full bg-[#4C63B5]"></div>
                    <div className="text-xs">Advised</div>
                  </div>
                  <div className="flex  space-x-1 items-center">
                    <div className=" w-3 rounded-full h-3 bg-[#FFC44B]"></div>
                    <div className="text-xs">Converted</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" mt-2">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
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
                  content={CustomTooltip}
                  cursor={{
                    width: 0.1,
                    height: 10,
                    rx: 5,
                  }}
                />
                <Bar dataKey="advised" barSize={20} fill="#4C63B5" />
                <Bar barSize={20} dataKey="converted" fill="#FFC44B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-2  gap-2">
        {chartData.map((chart, index) => (
          <div key={index} className="rounded border border-gray-300 w-full">
            <div className="  ">
              <div className="flex justify-between rounded-tr  rounded-tl  bg-gray-100  items-center">
                <div
                  key={index}
                  className="text-sm p-2 font-semibold flex items-center justify-start whitespace-nowrap ml-2"
                >
                  {chart.title}{" "}
                </div>
                <div className="hidden md:block mr-2">
                  <div className="flex justify-between space-x-1 items-center">
                    <div className="flex space-x-1 items-center">
                      <div className=" w-3 h-3 rounded-full bg-[#4F28A0]"></div>
                      <div className="text-xs">Advised</div>
                    </div>
                    <div className="flex  space-x-1 items-center">
                      <div className=" w-3 rounded-full h-3 bg-[#42801C]"></div>
                      <div className="text-xs">Converted</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={chart.data}
                padding={{ bottom: 100 }}
                margin={{ top: 10, bottom: 10, right: 20 }}
              >
                <CartesianGrid
                  stroke="#f0f0f0"
                  strokeLine="3 1"
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
                <Tooltip key={index} content={<LineTooltip />} />
                <Line
                  type="monotone"
                  dataKey="advised"
                  strokeOpacity={chart.data.advised}
                  stroke="#4F28A0"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />

                <Line
                  type="monotone"
                  dataKey="converted"
                  strokeOpacity={chart.data.converted}
                  stroke="#42801C"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;