import React, { useMemo, useState } from "react";
import { DashBoardTotalIcon } from "../../Common Components/assets/ipdassets/Dashboard/DashboardIcons";
import {
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

const data = [
  { name: "Cash", value: 26582 },
  { name: " UPI / Online", value: 39862 },
  { name: "Credit Card ", value: 10324 },
  { name: "Debit Card", value: 56545 },
  { name: "Cheque", value: 26523 },
];

const COLORS = ["#ebca91", "#a6e4c8", "#f09ea0", "#a9a1e4", "#e9a7d7"];

const BillingDashboard = () => {
  const [selectedIncomeExpenseButton, setSelectedIncomeExpenseButton] =
    useState("Day");
  const [selectedPaymentTypeButton, setSelectedPaymentTypeButton] =
    useState("Day");
  const [selectedIPDIncomeButton, setSelectedIPDIncomeButton] = useState("Day");
  const [selectedOPDIncomeButton, setSelectedOPDIncomeButton] = useState("Day");
  const [selectedDrButton, setSelectedDrButton] = useState("Day");

  const opList = () => {
    return [
      {
        id: 1,
        title: "Today’s Revenue",
        totalCount: 3000,
        bgColor: "bg-[#329DFF]",
        icon: <DashBoardTotalIcon />,
      },
      {
        id: 2,
        title: "OPD",
        totalCount: 300,
        bgColor: "bg-[#1EBFC4]",
        icon: <DashBoardTotalIcon />,
      },
      {
        id: 3,
        title: "IPD",
        totalCount: 3000,
        bgColor: "bg-[#EF9542]",
        icon: <DashBoardTotalIcon />,
      },
      {
        id: 4,
        title: "Pathology",
        totalCount: 4563,
        bgColor: "bg-[#CDA3A3]",
        icon: <DashBoardTotalIcon />,
      },
      {
        id: 5,
        title: "Radiology",
        totalCount: 74553,
        bgColor: "bg-[#1B9BBF]",
        icon: <DashBoardTotalIcon />,
      },
      {
        id: 6,
        title: "Pharmacy Collection",
        totalCount: 38485,
        bgColor: "bg-[#018438]",
        icon: <DashBoardTotalIcon />,
      },
      {
        id: 7,
        title: "Expenses",
        totalCount: 9090,
        bgColor: "bg-[#B73C3C]",
        icon: <DashBoardTotalIcon />,
      },
      {
        id: 8,
        title: "Self Outstanding",
        totalCount: 4567,
        bgColor: "bg-[#8C7354]",
        icon: <DashBoardTotalIcon />,
      },
      {
        id: 9,
        title: "Company Outstanding",
        totalCount: 1324,
        bgColor: "bg-[#247381]",
        icon: <DashBoardTotalIcon />,
      },
      {
        id: 10,
        title: "Total Outstanding",
        totalCount: 3000,
        bgColor: "bg-[#A8AB1D]",
        icon: <DashBoardTotalIcon />,
      },
    ];
  };
  const OpLists = useMemo(() => opList(), []);
  const LineData = [
    {
      name: "Mon",
      pv: 100,
      expense: 0,
    },
    {
      name: "Tue",
      expense: 300,
      pv: 408,
    },
    {
      name: "Wed",
      expense: 500,
      pv: 1000,
    },
    {
      name: "Thu",
      expense: 10,
      pv: 700,
    },
    {
      name: "Fri",
      expense: 390,
      pv: 650,
    },
    {
      name: "Sat",
      expense: 390,
      pv: 800,
    },
    {
      name: "Sun",
      expense: 600,
      pv: 900,
    },
  ];
  const pieData = [
    { name: "Hospital ", value: 400 },
    { name: "Doctor ", value: 300 },
  ];
  const IPDLineData = [
    {
      name: "Mon",
      pv: 100,
    },
    {
      name: "Tue",
      pv: 308,
    },
    {
      name: "Wed",
      pv: 200,
    },
    {
      name: "Thu",
      pv: 450,
    },
    {
      name: "Fri",
      pv: 350,
    },
    {
      name: "Sat",
      pv: 550,
    },
    {
      name: "Sun",
      pv: 600,
    },
  ];
  const OPDLineData = [
    {
      name: "Mon",
      pv: 100,
    },
    {
      name: "Tue",
      pv: 308,
    },
    {
      name: "Wed",
      pv: 200,
    },
    {
      name: "Thu",
      pv: 450,
    },
    {
      name: "Fri",
      pv: 350,
    },
    {
      name: "Sat",
      pv: 550,
    },
    {
      name: "Sun",
      pv: 600,
    },
  ];
  const PIECOLORS = ["#E99566", "#AADF12", "#FFBB28", "#FF8042"];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const valueKey = payload[0].dataKey;

      return (
        <div className="bg-black rounded-lg">
          <div className="text-white  text-sm px-2">
            {`${valueKey !== "pv" ? "₹" : ""} ₹ ${data[valueKey]}`}
          </div>
        </div>
      );
    }

    return null;
  };
  const CustomTooltipPie = ({ active, payload }) => {
    console.log("aaaaa", active, payload);
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const valueKey = payload[0].dataKey;

      return (
        <div className="bg-white border border-gray-400 rounded-lg">
          <div className="text-black text-xs  px-2 py-[3px]">
            {`${valueKey !== "pv" ? "" : ""}  ${data.name}`}
          </div>
        </div>
      );
    }

    return null;
  };
  const LineTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const valueKey = payload[0].dataKey;
      const valueKey1 = payload[1].dataKey;

      return (
        <div className="bg-white border border-gray-300 rounded-lg">
          <div className="text-black text-xs px-2">
            {`${valueKey === "pv" ? "Income : ₹" : ""} ${data[valueKey]}`}
          </div>
          <div className="text-black text-xs px-2">
            {`${valueKey1 === "expense" ? "Expense  :₹" : ""} ${
              data[valueKey1]
            }`}
          </div>
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

  const handleIncomeExpenseButtonClick = (button) => {
    setSelectedIncomeExpenseButton(button);
  };

  const handlePaymentTypeButtonClick = (button) => {
    setSelectedPaymentTypeButton(button);
  };

  const handleOPDIncomeButtonClick = (button) => {
    setSelectedOPDIncomeButton(button);
  };

  const handleIPDIncomeButtonClick = (button) => {
    setSelectedIPDIncomeButton(button);
  };
  const handleDrButtonClick = (button) => {
    setSelectedDrButton(button);
  };
  const calculateTotalCount = (data) => {
    return data.reduce((total, entry) => total + entry.value, 0);
  };

  return (
    <div>
      <div className=" font-semibold  text-sm mb-1">Billing</div>
      <div className="">
        <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-5 gap-2 mb-2">
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
                      ₹ {record.totalCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className=" grid grid-cols-1 lg:grid-cols-5 gap-2">
        <div className="rounded border w-full  md:col-span-3">
          <div className="">
            <div className="flex justify-between items-center">
              <div className="text-sm p-2  font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                Income v/s Expense{" "}
              </div>
              <div className="hidden md:block">
                <div className="flex justify-between space-x-1 items-center">
                  <div className="flex space-x-1 items-center">
                    <div className=" w-3 h-3 rounded-full bg-[#018438]"></div>
                    <div className="text-xs">Income</div>
                  </div>
                  <div className="flex  space-x-1 items-center">
                    <div className=" w-3 rounded-full h-3 bg-[#B73C3C]"></div>
                    <div className="text-xs">Expense</div>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <ButtonGroup
                  labels={["Day", "Week", "Month"]}
                  selectedButton={selectedIncomeExpenseButton}
                  onButtonClick={handleIncomeExpenseButtonClick}
                />
              </div>
            </div>
            <div className="border-b border-gray-200 mx-2 shadow-md "></div>
          </div>

          <div className="md:hidden  sm:hidden mt-1  sm:flex-wrap sm:gap-2 flex justify-between items-center ">
            <div className="m-2">
              <div className="flex justify-between space-x-1 items-center">
                <div className="flex space-x-1 items-center">
                  <div className="w-3 h-3 rounded-full bg-[#018438]"></div>
                  <div className="text-xs">Income</div>
                </div>
                <div className="flex space-x-1 items-center">
                  <div className="w-3 rounded-full h-3 bg-[#B73C3C]"></div>
                  <div className="text-xs">Expense</div>
                </div>
              </div>
            </div>
            <div className="sm:m-3">
              <ButtonGroup
                labels={["Day", "Week", "Month"]}
                selectedButton={selectedIncomeExpenseButton}
                onButtonClick={handleIncomeExpenseButtonClick}
              />
            </div>
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
              <Tooltip content={<LineTooltip />} />

              <Line
                type="monotone"
                dataKey="pv"
                strokeOpacity={LineData.pv}
                stroke="#018438"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="expense"
                strokeOpacity={LineData.pv}
                stroke="#B73C3C"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className=" rounded border w-full  col-span-2">
          <div className="  ">
            <div className="flex justify-between items-center">
              <div className="text-sm p-2  font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                Payment Type Wise Detail{" "}
              </div>
              <div className="hidden md:block">
                <ButtonGroup
                  labels={["Day", "Week", "Month"]}
                  selectedButton={selectedPaymentTypeButton}
                  onButtonClick={handlePaymentTypeButtonClick}
                />
              </div>
            </div>
            <div className="border-b border-gray-200 mx-2 shadow-md "></div>
          </div>
          <div className="m-2 md:hidden">
            <ButtonGroup
              labels={["Day", "Week", "Month"]}
              selectedButton={selectedPaymentTypeButton}
              onButtonClick={handlePaymentTypeButtonClick}
            />
          </div>
          <div className="flex">
            <ResponsiveContainer width="75%" height={200}>
              <PieChart
                width={300}
                height={200}
                margin={{
                  top: 30,
                }}
              >
                <Pie
                  data={data}
                  margin={{
                    top: 30,
                  }}
                  cx="50%"
                  cy={80}
                  isAnimationActive={true}
                  label={(props) => {
                    return (
                      <text
                        {...props}
                        style={{ fontSize: "12px", fontWeight: "bold" }}
                      >
                        ₹ {props.value}
                      </text>
                    );
                  }}
                  tick={10}
                  outerRadius={80}
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
                <Tooltip
                  content={<CustomTooltipPie />}
                  wrapperStyle={{ zIndex: 999 }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-2">
              <div className="text-sm  mb-6 font-semibold">
                Total : {calculateTotalCount(data)}
              </div>

              {data.map((entry, index) => (
                <div
                  key={`cell-${index}`}
                  className=" flex  items-center space-x-2  mb-2  "
                >
                  <div
                    style={{
                      backgroundColor: COLORS[index % COLORS.length],
                      width: "0.80rem",
                      height: "0.80rem",
                      borderRadius: "50%",
                    }}
                  ></div>
                  <div className="text-sm">{entry.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-1 lg:grid-cols-5 gap-2 mt-2">
        <div className="lg:col-span-1">
          <div className="rounded border w-full  ">
            <div className="  ">
              <div className="flex justify-between items-center">
                <div className="text-sm p-2  font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                  Dr. V/S Hospital share
                </div>
                <div
                  className="inline-flex rounded-lg shadow-sm mr-2"
                  role="group"
                ></div>
              </div>
              <div className="border-b border-gray-200 mx-2 shadow-md "></div>
              <div className="h-full">
                <div className="p-[2px]">
                  <div className="">
                    <div className="flex items-center justify-center flex-wrap space-y-1">
                      <div>
                        <ButtonGroup
                          labels={["Day", "Week", "Month"]}
                          selectedButton={selectedDrButton}
                          onButtonClick={handleDrButtonClick}
                        />
                      </div>
                      <div className=" grid grid-cols-1 gap-1 items-center">
                        <div className="flex justify-end ">
                          <div>
                            {pieData.map((entry, index) => (
                              <div
                                key={`cell-${index}`}
                                className=" flex  items-center ml-2 space-x-3"
                              >
                                <div
                                  style={{
                                    backgroundColor:
                                      PIECOLORS[index % PIECOLORS.length],
                                    width: "0.80rem",
                                    height: "0.80rem",
                                    borderRadius: "50%",
                                  }}
                                ></div>
                                <div className="text-xs font-semibold">
                                  {entry.name}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart height={80}>
                      <Pie
                        data={pieData}
                        cy={85}
                        cx="50%"
                        innerRadius={23}
                        outerRadius={44}
                        fill="black"
                        dataKey="value"
                        label={(props) => {
                          return (
                            <text
                              fill="black"
                              {...props}
                              style={{
                                fontSize: "12px",
                                fontWeight: "bold",
                              }}
                            >
                              ₹ {props.value}
                            </text>
                          );
                        }}
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={PIECOLORS[index % PIECOLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        content={<CustomTooltipPie />}
                        wrapperStyle={{ zIndex: 999 }}
                      />
                    </PieChart>{" "}
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="rounded border w-full  col-span-2">
            <div className="  ">
              <div className="flex justify-between items-center">
                <div className="text-sm p-2  font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                  IPD Income{" "}
                </div>
                <ButtonGroup
                  labels={["Day", "Week", "Month"]}
                  selectedButton={selectedIPDIncomeButton}
                  onButtonClick={handleIPDIncomeButtonClick}
                />
              </div>
              <div className="border-b border-gray-200 mx-2 shadow-md "></div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  width={325}
                  height={200}
                  data={IPDLineData}
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
                    strokeOpacity={IPDLineData.pv}
                    stroke="#0B83A5"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="rounded border w-full  col-span-2">
            <div className="  ">
              <div className="flex justify-between items-center">
                <div className="text-sm p-2  font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                  OPD Income
                </div>
                <ButtonGroup
                  labels={["Day", "Week", "Month"]}
                  selectedButton={selectedOPDIncomeButton}
                  onButtonClick={handleOPDIncomeButtonClick}
                />
              </div>
              <div className="border-b border-gray-200 mx-2 shadow-md "></div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  width={325}
                  height={200}
                  data={OPDLineData}
                  padding={{
                    bottom: 100,
                  }}
                  margin={{
                    top: 10,
                    bottom: 10,
                    right: 20,
                  }}
                >
                  {" "}
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
                    strokeOpacity={OPDLineData.pv}
                    stroke="#0B83A5"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingDashboard;
