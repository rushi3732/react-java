import React, { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
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

import CommonTransactionTable from "../../Common Components/CommonTable/CommonTransactionTable";

let ctx;
export const measureText14HelveticaNeue = (text) => {
  if (!ctx) {
    ctx = document.createElement("canvas").getContext("2d");
    ctx.font = "14px 'Helvetica Neue";
  }

  return ctx.measureText(text).width;
};
const PharmacyDashboard = () => {
  const [totalSaleButton, setTotalSaleButton] = useState("Day");
  const [selectedTopSurgeryButton, setSelectedTopSurgeryButton] =
    useState("Day");
  const [selectedPfrButton, setSelectedPfrButton] = useState("Day");
  const [bookedAppointmentsList, setBookedAppointmentsList] = useState([
    {
      "Sr No": 1,
      "Item Name": "Chlorhexidine gluconate 0.12%",
      "Balance Qty": 0,
      "Hospital Bal Qty": 9,
      Rack: 16,
      Shelf: 1,
    },
    {
      "Sr No": 2,
      "Item Name": "Metoprolol succinate ER 25 mg",
      "Balance Qty": 10,
      "Hospital Bal Qty": 10,
      Rack: 87,
      Shelf: 2,
    },
    {
      "Sr No": 3,
      "Item Name": "Metoprolol succinate ER 25 mg",
      "Balance Qty": 10,
      "Hospital Bal Qty": 10,
      Rack: 12,
      Shelf: 2,
    },
    {
      "Sr No": 4,
      "Item Name": "Omeprazole 20 mg",
      "Balance Qty": 10,
      "Hospital Bal Qty": 10,
      Rack: 55,
      Shelf: 8,
    },
    {
      "Sr No": 5,
      "Item Name": "Amlodipine besylate 10 mg",
      "Balance Qty": 10,
      "Hospital Bal Qty": 10,
      Rack: 55,
      Shelf: 8,
    },
    {
      "Sr No": 6,
      "Item Name": "Naproxen 500 mg",
      "Batch No": "HH072101F",
      "Expiry Date": "01-02-2024",
      "Balance Qty": 10,
      "Hospital Bal Qty": 10,
      Rack: 55,
      Shelf: 8,
    },
  ]);

  const [inrlList, setInrlList] = useState([
    {
      "Sr No": 1,
      "Item Name": "Chlorhexidine gluconate 0.12%",
      "Balance Qty": 0,
    },
    {
      "Sr No": 2,
      "Item Name": "Metoprolol succinate ER 25 mg",
      "Balance Qty": 10,
    },
    {
      "Sr No": 3,
      "Item Name": "Metoprolol succinate ER 25 mg",
      "Balance Qty": 10,
    },
    {
      "Sr No": 4,
      "Item Name": "Omeprazole 20 mg",
      "Balance Qty": 10,
    },
    {
      "Sr No": 5,
      "Item Name": "Amlodipine besylate 10 mg",
      "Balance Qty": 10,
    },
    {
      "Sr No": 6,
      "Item Name": "Naproxen 500 mg",
      "Balance Qty": 10,
    },
  ]);

  const [patientSurveyList, SetPatientSurveyList] = useState([
    {
      name: "03-Feb",
      "Total Prescriptions": 3,
      "Unfilled Prescriptions": 30,
    },
    {
      name: "05-Feb",
      "Total Prescriptions": 16,
      "Unfilled Prescriptions": 35,
    },
    {
      name: "06-Feb",
      "Total Prescriptions": 6,
      "Unfilled Prescriptions": 31,
    },
    {
      name: "07-Feb",
      "Total Prescriptions": 6,
      "Unfilled Prescriptions": 28,
    },
    {
      name: "08-Feb",
      "Total Prescriptions": 6,
      "Unfilled Prescriptions": 23,
    },
    {
      name: "09-Feb",
      "Total Prescriptions": 8,
      "Unfilled Prescriptions": 83,
    },
    {
      name: "10-Feb",
      "Total Prescriptions": 0,
      "Unfilled Prescriptions": 34,
    },
  ]);

  const totalSaleData = [
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
  const BAR_AXIS_SPACE = 10;
  const fontSize = 12;

  const data = [
    { name: "Analgesics", value: 26582 },
    { name: "Antibiotics", value: 39862 },
    { name: "Antidepressants", value: 10324 },
    { name: "Antihypertensives", value: 56545 },
    { name: "Antidiabetics", value: 26523 },
  ];
  const dataList = [
    { name: "Cataract Surgery", pv: 260 },
    { name: "Caesarean Section ", pv: 240 },
    { name: "Appendectomy", pv: 230 },
    { name: "Cholecystectomy", pv: 199 },
    { name: "Tubal Ligation", pv: 180 },
  ];
  const COLORS = ["#ebca91", "#a6e4c8", "#f09ea0", "#a9a1e4", "#e9a7d7"];

  const maxTextWidth = useMemo(
    () =>
      data.reduce((acc, cur) => {
        const value = cur.pv;
        if (value !== undefined && value !== null) {
          const width = measureText14HelveticaNeue(value.toLocaleString());
          if (width > acc) {
            return width;
          }
        }
        return acc;
      }, 0),
    []
  );

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const valueKey = payload[0].dataKey;

      return (
        <div className="bg-black rounded-lg">
          <div className="text-white  text-sm px-2">
            {`${valueKey !== "pv" ? "" : ""}  ${data[valueKey]}`}
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
        <div className="bg-white border border-gray-400 rounded-lg">
          <div className="text-black text-xs px-2">
            {`${
              valueKey1 === "Total Prescriptions"
                ? "Total Prescriptions  :"
                : ""
            } ${data[valueKey]}`}
          </div>
          <div className="text-black text-xs px-2">
            {`${
              valueKey === "Unfilled Prescriptions"
                ? "Unfilled Prescriptions : "
                : ""
            } ${data[valueKey1]}`}
          </div>
        </div>
      );
    }

    return null;
  };
  const CustomTooltipPie = ({ active, payload }) => {
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
  const handleTotalSaleButtonClick = (button) => {
    setTotalSaleButton(button);
  };
  const handleTopSurgeryButtonClick = (button) => {
    setSelectedTopSurgeryButton(button);
  };
  const handleTopPfrClick = (button) => {
    setSelectedPfrButton(button);
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

  const calculateTotalCount = (data) => {
    return data.reduce((total, entry) => total + entry.value, 0);
  };
  return (
    <div>
      <div className="font-semibold  text-sm mb-1">Pharmacy</div>
      <div className=" grid grid-cols-1 lg:grid-cols-5 gap-2">
        <div className="rounded border w-full  lg:col-span-3 ">
          <div className="  ">
            <div className="flex justify-between items-center">
              <div className="text-sm p-2  font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                Total Sale
              </div>
              <ButtonGroup
                labels={["Day", "Week", "Month"]}
                selectedButton={totalSaleButton}
                onButtonClick={handleTotalSaleButtonClick}
              />
            </div>
            <div className="border-b border-gray-200 mx-2 shadow-md "></div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                width={325}
                height={200}
                data={totalSaleData}
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
                  strokeOpacity={totalSaleData.pv}
                  stroke="#0B83A5"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className=" rounded border w-full  lg:col-span-2">
          <div className="  ">
            <div className="flex justify-between items-center">
              <div className="text-sm p-2  font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                Top 5 Category Wise Detail{" "}
              </div>
            </div>
            <div className="border-b border-gray-200 mx-2 shadow-md "></div>
          </div>
          <div className="flex">
            <ResponsiveContainer width="75%" height={200}>
              <PieChart
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
                        {props.value}
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
      <div className=" mt-2 grid grid-cols-1 lg:grid-cols-5 gap-2">
        <div className="rounded lg:col-span-3  border w-full ">
          <div className="  ">
            <div className="flex justify-between items-center">
              <div className="text-sm p-2  font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                Prescription Fulfillment Rate{" "}
              </div>
              <div className="mr-2 flex items-center">
                <div className=" hidden md:block  lg:block sm:block   items-center">
                  <div className="flex  justify-between  space-x-1  mr-2 items-center ">
                    <div className="flex space-x-1 items-center">
                      <div className=" w-3 h-3 rounded-full bg-[#018438]"></div>
                      <div className="text-xs">Total Prescriptions </div>
                    </div>
                    <div className="flex  space-x-1 items-center">
                      <div className=" w-3 rounded-full h-3 bg-[#B73C3C]"></div>
                      <div className="text-xs">Unfilled Prescriptions</div>
                    </div>
                  </div>
                </div>
                <div className="hidden  lg:block  ">
                  <ButtonGroup
                    labels={["Day", "Week", "Month"]}
                    selectedButton={selectedPfrButton}
                    onButtonClick={handleTopPfrClick}
                  />
                </div>
              </div>
            </div>
            <div className="border-b border-gray-200 mx-2 shadow-md "></div>
          </div>
          <div>
            <div className=" md:hidden flex justify-between space-x-1 ml-2 mt-2 mr-2 items-center ">
              <div className="flex space-x-1 items-center">
                <div className=" w-3 h-3 rounded-full bg-[#018438]"></div>
                <div className="text-xs">Total Prescriptions </div>
              </div>
              <div className="flex  space-x-1 items-center">
                <div className=" w-3 rounded-full h-3 bg-[#B73C3C]"></div>
                <div className="text-xs">Unfilled Prescriptions</div>
              </div>
            </div>
          </div>
          <div className=" lg:hidden  flex  justify-evenly  mt-2 pl-5 pr-5">
            <ButtonGroup
              labels={["Day", "Week", "Month"]}
              selectedButton={selectedTopSurgeryButton}
              onButtonClick={handleTopSurgeryButtonClick}
            />
          </div>
          <ResponsiveContainer width="100%" height={180}>
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
              <CartesianGrid
                stroke="#f0f0f0"
                strokeLine="4 1"
                vertical={false}
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
                dataKey="Unfilled Prescriptions"
                stackId="1"
                stroke="none"
                fill="url(#customGradient1)"
                dot={{ r: 4, fill: "#073763" }}
              />
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
              <Area
                type="monotone"
                dataKey="Total Prescriptions"
                stackId="1"
                fill="url(#customGradient)"
                tickLine={false}
                stroke="none"
                dot={{ r: 4, stroke: "073763" }}
              />
              <defs>
                <linearGradient id="customGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="1%" stop-color="#239F21" />
                  <stop offset="100%" stop-color="#D9D9D9" />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded border lg:col-span-2 w-full ">
          <div className="  ">
            <div className="flex justify-between items-center">
              <div className="text-sm p-2 font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                Top 5 Medicines{" "}
              </div>
              <div className="hidden md:block  sm:block">
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
          <div className=" -ml-9 mt-2">
            <ResponsiveContainer
              width={"100%"}
              height={35 * data.length}
              debounce={0}
              margin={{
                top: 10,
                left: 0,
                right: 50,

                bottom: 0,
              }}
            >
              <BarChart
                data={dataList}
                cx="50%"
                cy={200}
                layout="vertical"
                margin={{
                  left: 5,
                  right: maxTextWidth + (BAR_AXIS_SPACE + 25),
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
      </div>
      <div className="grid  grid-cols-1 mt-2 lg:grid-cols-2 gap-2">
        <div className="rounded border border-gray-300   bg-white shadow-md">
          <div className="">
            <div className="flex justify-between  rounded-tr  rounded-tl bg-[#E9F5FF] items-center">
              <div className="text-sm p-2 text-gray-800  font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                Near Expiry Item Details{" "}
              </div>
              <div className="mr-2">
                <div className="text-sm font-semibold text-[#E37702]">
                  Total Near Expiry : 320
                </div>
              </div>
            </div>
            <div className=" rounded-bl rounded-br">
              <CommonTransactionTable
                dataResult={bookedAppointmentsList}
                removeHeaders={["id", "actions", "Sr No"]}
                tableClass="overflow-auto -mt-[7px] -mb-2"
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
        </div>
        <div className="rounded border border-gray-300 bg-white shadow-md">
          <div className="">
            <div className="flex justify-between  rounded-tr  rounded-tl bg-[#E9F5FF] items-center">
              <div className="text-sm p-2 text-gray-800  font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                Items Near Reorder level{" "}
              </div>
              <div className="mr-2">
                <div className="text-sm font-semibold text-[#E37702]">
                  Total Near Reorder : 320
                </div>
              </div>
            </div>
            <div className=" rounded-bl rounded-br">
              <CommonTransactionTable
                dataResult={inrlList}
                removeHeaders={["id", "actions", "Sr No"]}
                tableClass="overflow-auto -mt-[7px] -mb-2"
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
        </div>
      </div>
    </div>
  );
};

export default PharmacyDashboard;
