import { Box, Tooltip as MuiTooltip, TableContainer } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import CommonDynamicTablePaginationNew from "../../Common Components/CommonTable/CommonTransactionPaginationTable";
import DatePickerField from "../../Common Components/FormFields/DatePickerField";
import SearchBar from "../../Common Components/FormFields/SearchBar";
import { PrintIcon } from "../../Common Components/assets/commonassets/CommonAssets";
import {
  BarCodeIcon,
  DashBoardTotalIcon,
  PrintDisableIcon,
  RadiologyTodaysAdvisedIcon,
  RadiologyTodaysAuthorizedIcon,
  RadiologyTodaysTestsIcon,
  RadiologyWalkinPatientTestsIcon,
} from "../../Common Components/assets/ipdassets/Dashboard/DashboardIcons";
import LoadingSpinner from "../../Common Components/loadingspinner/loadingSpinner";
import {
  getCategoryWisePerformedTestDetails,
  getDoctorStatusList,
  getRadiologyDashboardDayWiseGraphCounts,
  getfilterwiseworkorderslist,
  getradiologyDashboardGraphCounts,
  postFilterwiseworkorderslist,
  postRadiologyDashboardCount,
  postRadiologyProcedureQueueList,
} from "./services/RadiologyDashboardService";
import SearchDropdown from "../../Common Components/FormFields/searchDropdown";

const barList = [
  {
    name: "10 jan",
    authorized: 790,
    printed: 750,
  },
  {
    name: "11 jan",
    authorized: 600,
    printed: 250,
  },
  {
    name: "Wed",
    authorized: 700,
    printed: 650,
  },
  {
    name: "12 jan",
    authorized: 500,
    printed: 450,
  },
  {
    name: "13 jan",
    authorized: 300,
    printed: 250,
  },
  {
    name: "14 jan",
    authorized: 100,
    printed: 90,
  },
  {
    name: "15 jan",
    authorized: 100,
    printed: 90,
  },
];
const fontSize = 12;

const COLORS = ["#EF9542", "#815DE8", "#1BC96B", "#e9a7d7"];
let ctx;

export const measureText14HelveticaNeue = (text) => {
  if (!ctx) {
    ctx = document.createElement("canvas").getContext("2d");
    ctx.font = "14px 'Helvetica Neue";
  }

  return ctx.measureText(text).width;
};

const RadiologyDashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [opLists, setOpLists] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedButton, setSelectedButton] = useState("General");
  const [dataResultlist, setdataResultList] = useState([]);
  const [workOrderList, setWorkOrderList] = useState([]);
  const [lineDataList, setlineDataList] = useState([
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
  ]);
  const [highPerformanceTestdetails, setHighPerformanceTestdetails] = useState(
    []
  );

  const [dataResult, setDataResult] = useState([]);

  const dataListing = [
    { name: "Head CT", pv: 290 },
    { name: "Chest CT ", pv: 250 },
    { name: "Abdominal CT", pv: 230 },
    { name: "Pelvic CT", pv: 198 },
    { name: "CT Angiography", pv: 180 },
  ];

  const [workOrderQueue, setWorkOrderQueue] = useState([
    {
      "Patient Name": "John Doe",
      UHID: "123456",
      "Order No": "WO123",
      "Reporting DateTime": "2024-03-11 10:00 AM",
      "Test Name": "MRI Brain",
      Status: "Pending",
    },
    {
      "Patient Name": "Jane Smith",
      UHID: "789012",
      "Order No": "WO456",
      "Reporting DateTime": "2024-03-11 11:00 AM",
      "Test Name": "CT Scan Abdomen",
      Status: "In Progress",
    },
    {
      "Patient Name": "Michael Johnson",
      UHID: "567890",
      "Order No": "WO789",
      "Reporting DateTime": "2024-03-11 12:00 PM",
      "Test Name": "X-ray Chest",
      Status: "Completed",
    },
    {
      "Patient Name": "Emily Brown",
      UHID: "234567",
      "Order No": "WO101",
      "Reporting DateTime": "2024-03-11 1:00 PM",
      "Test Name": "Ultrasound Abdomen",
      Status: "Pending",
    },
  ]);

  const { control, watch } = useForm();

  useEffect(() => {
    console.log("8884");

    getRadiologyDashboardDayWiseGraphCounts(9)
      .then((res) => {
        console.log("res 00000", res.data.result);
        return res.data.result;
      })
      .then((res) => {
        // setlineDataList(res);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    setCount(workOrderQueue.length - 1);
  }, [workOrderQueue]);
  const [doctorStatusList, setDoctorStatusList] = useState([]);

  useEffect(() => {
    postRadiologyProcedureQueueList({
      categoryId: null,
      fromDate: null,
      menuId: null,
      opdIpd: null,
      page: 0,
      patientId: null,
      searchId: null,
      searchString: "",
      size: 40,
      testId: null,
      testTypeId: 2,
      toDate: null,
      unitId: null,
    })
      .then((res) => res.data.result)
      .then((res) => {
        setWorkOrderQueue(res);
      })
      .catch((error) => {});
    postRadiologyDashboardCount({
      fromDate: null,
      page: 0,
      searchId: null,
      searchString: "",
      size: 10,
      toDate: null,
    })
      .then((res) => res.data.result)
      .then((res) => {
        const transformedData = res.map((item) => ({
          Radiologist: item.Radiologist,
          Ultrasound: item.ULTRASOUND,
          "CT Scan": item["CT-SCAN"],
          MRI: item.MRI,
          Mammography: item.Mammography,
          ECG: item.ECG,
          "X-Ray": item["X-Ray"],
          USG: item.USG,
          CATHLAB: item.CATHLAB,
          Total: item.Total,
        }));
        setdataResultList(transformedData);
        handleTotal(transformedData);
      })
      .catch((error) => {});
    postFilterwiseworkorderslist({
      category: null,
      fromDate: null,
      fromOrderNo: null,
      menuId: 109,
      opdIpd: null,
      page: 0,
      patientId: null,
      sampleStatus: null,
      searchString: "",
      size: 10,
      testTypeId: 1,
      toDate: null,
      toOrderNo: null,
      unitId: null,
    })
      .then((res) => res.data)
      .then((res) => {
        setDataResult(res.result);
        setCount(res.count);
      })
      .catch((error) => {});
  }, []);

  const generateData = () => {
    return {
      TodayAdvisedInvestigations: 20,
      TodayTotalInvestigations: 30,
      TodayAuthorizedInvestigations: 15,
      TodayWalkInInvestigations: 10,
      AdvisedInvestigations: 50,
      WalkInInvestigations: 25,
    };
  };

  useEffect(() => {
    // getradiologyDashboardGraphCounts(9)
    //   .then((res) => {
    //     const data = res.data.result;
    //     // setOpLists(opList(data));
    //     const newWorkOrderList = [
    //       { name: "Advised", value: data?.AdvisedInvestigations },
    //       { name: "Walk In", value: data?.WalkInInvestigations },
    //     ];
    //     setWorkOrderList(newWorkOrderList);
    const dummyData = generateData();
    setOpLists(opList(dummyData));
    const newWorkOrderList = [
      { name: "Advised", value: 112 },
      { name: "Walk In", value: 12 },
    ];
    setWorkOrderList(newWorkOrderList);
    // })
    // .catch((error) => {
    //   console.error("Error fetching data:", error);
    // });
  }, []);

  const opList = (data) => {
    return [
      {
        id: 1,
        title: "Todays Advised",
        totalCount: data?.TodayAdvisedInvestigations,
        bgColor: "bg-[#329DFF]",
        icon: <RadiologyTodaysAdvisedIcon />,
      },
      {
        id: 2,
        title: "Todays Tests",
        totalCount: data?.TodayTotalInvestigations,
        bgColor: "bg-[#1EBFC4]",
        icon: <RadiologyTodaysTestsIcon />,
      },
      {
        id: 3,
        title: "Todays Authorized",
        totalCount: data?.TodayAuthorizedInvestigations,
        bgColor: "bg-[#EF9542]",
        icon: <RadiologyTodaysAuthorizedIcon />,
      },
      {
        id: 4,
        title: "Walk In Patient",
        totalCount: data?.TodayWalkInInvestigations,
        bgColor: "bg-[#1B9BBF]",
        icon: <RadiologyWalkinPatientTestsIcon />,
      },
    ];
  };

  const handleTotal = (comingArray) => {
    const total = {
      Radiologist: "Total",
      Ultrasound: comingArray.reduce((acc, curr) => acc + curr.Ultrasound, 0),
      "CT Scan": comingArray.reduce((acc, curr) => acc + curr["CT Scan"], 0),
      MRI: comingArray.reduce((acc, curr) => acc + curr.MRI, 0),
      Mammography: comingArray.reduce((acc, curr) => acc + curr.Mammography, 0),
      ECG: comingArray.reduce((acc, curr) => acc + curr.ECG, 0),
      "X-Ray": comingArray.reduce((acc, curr) => acc + curr["X-Ray"], 0),
      USG: comingArray.reduce((acc, curr) => acc + curr.USG, 0),
      CATHLAB: comingArray.reduce((acc, curr) => acc + curr.CATHLAB, 0),
      Total: comingArray.reduce((acc, curr) => acc + curr.Total, 0),
    };

    let dataArray = [...comingArray, total];
    setdataResultList(dataArray);
  };

  const headers = Object.keys(dataResultlist[0] || "");

  const renderInput = (row, index, header) => {
    return (
      <div>
        {header === "Status" && (
          <p
            className={` text-[13px] ${
              row.Status === "Pending"
                ? `whitespace-nowrap text-[#EB585A] `
                : row.Status === "Authorised"
                ? `whitespace-nowrap   text-[#545AEB] `
                : "whitespace-nowrap  text-[#e0c54c]"
            }`}
          >
            {row.Status}
          </p>
        )}
      </div>
    );
  };

  const renderActions = (row, rowIndex) => {
    console.log("row, rowIndex", row, rowIndex);
    return (
      <>
        <div className="gap-2 flex  items-center">
          {row.Status === "Authorised" ? (
            <MuiTooltip title="Print" arrow>
              <button
                type="button"
                // onClick={() => {
                //   openPrintWindow(row.patientVisitId);
                // }}
              >
                <PrintIcon />
              </button>
            </MuiTooltip>
          ) : (
            <MuiTooltip title="Print" arrow>
              <button
                type="button"
                // onClick={() => {
                //   openPrintWindow(row.patientVisitId);
                // }}
              >
                <PrintDisableIcon />
              </button>
            </MuiTooltip>
          )}
          <MuiTooltip title="BarCode" arrow>
            <button
              type="button"
              // onClick={() => {
              //   openPrintWindow(row.patientVisitId);
              // }}
            >
              <BarCodeIcon />
            </button>
          </MuiTooltip>
        </div>
      </>
    );
  };

  const populateTable = () => {};

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border  items-center border-gray-300 rounded-lg">
          <div className="text-black text-xs  px-2 py-[1px]">{`Advised ${"\u00A0"} ${"\u00A0"}${"\u00A0"}: ${
            payload[0].value
          }`}</div>

          <div className="text-black text-xs px-2 py-[1px]">{`Converted : ${payload[1].value}`}</div>
        </div>
      );
    }

    return null;
  };

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

  const LineTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const valueKey = payload[0].dataKey;
      const valueKey1 = payload[1].dataKey;

      return (
        <div className="bg-white border border-gray-300 rounded-lg">
          <div className="text-black text-xs px-2">
            {`${valueKey === "advised" ? "Advised : " : ""} ${data[valueKey]}`}
          </div>
          <div className="text-black text-xs px-2">
            {`${valueKey1 === "converted" ? "Converted  :" : ""} ${
              data[valueKey1]
            }`}
          </div>
        </div>
      );
    }

    return null;
  };

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };
  const ButtonGroup = ({ labels, selectedButton, onButtonClick }) => (
    <div className="inline-flex rounded-lg shadow-sm mr-2" role="group">
      {labels.map((label, index) => (
        <button
          key={index}
          type="button"
          className={`px-2 py-1 text-xs font-medium ${
            selectedButton === label
              ? "text-white bg-[#4C63B5]"
              : "text-[#4C63B5] bg-transparent border border-[#4C63B5]"
          } ${index === 0 ? "rounded-l-lg" : ""} ${
            index === labels.length - 1 ? "rounded-r-lg" : ""
          }   dark:focus:bg-[#4C63B5]`}
          onClick={() => onButtonClick(label)}
        >
          {label}
        </button>
      ))}
    </div>
  );

  const maxTextWidth = useMemo(
    () =>
      dataListing.reduce((acc, cur) => {
        const value = cur.pv;
        const width = measureText14HelveticaNeue(value.toLocaleString());
        if (width > acc) {
          return width;
        }
        return acc;
      }, 0),
    []
  );
  const handleInputChange = (autoSearchString) => {
    if (autoSearchString != "") {
      let auto = autoSearchString + `/2`;
      getfilterwiseworkorderslist(auto)
        .then((res) => res.data.result)
        .then((res) => {
          setCategoryList(res);

          console.log("errrrrrrrrrrr", res);
        })
        .catch((error) => {});
    }
  };
  let category = watch("category");
  useEffect(() => {
    if (category?.id !== undefined) {
      getCategoryWisePerformedTestDetails(category?.id)
        .then((res) =>
          res.data.message ? JSON.parse(res.data.message) : res.data.message
        )
        .then((res) => {
          const sortedLowPerformanceTestdetails =
            res?.LowPerformanceTestdetails?.slice().sort(
              (a, b) => b.count - a.count
            );
          const sortedHighPerformanceTestdetails =
            res?.HighPerformanceTestdetails?.slice().sort(
              (a, b) => b.count - a.count
            );
          setHighPerformanceTestdetails(sortedHighPerformanceTestdetails);
        })
        .catch((error) => {});
    } else {
      setHighPerformanceTestdetails([]);
    }
  }, [category]);

  useEffect(() => {
    // getDoctorStatusList(9)
    //   .then((res) => res.data.result)
    //   .then((res) => {
    const dummyData = [
      { name: "Dr. John Doe", status: "Available" },
      { name: "Dr. Jane Smith", status: "Busy" },
      { name: "Dr. Michael Johnson", status: "Offline" },
      { name: "Dr. Emily Brown", status: "Available" },
      { name: "Dr. David Lee", status: "Busy" },
      { name: "Dr. Jane Smith", status: "Busy" },
      { name: "Dr. Michael Johnson", status: "Offline" },
      { name: "Dr. Michael Johnson", status: "Offline" },
      { name: "Dr. Emily Brown", status: "Available" },
      { name: "Dr. David Lee", status: "Busy" },
      { name: "Dr. Jane Smith", status: "Busy" },
      { name: "Dr. Michael Johnson", status: "Offline" },
    ];
    const currentRes = dummyData.map((item) => ({
      "Radiologist List": item.name,
      Status: item.status,
    }));
    setDoctorStatusList(currentRes);
    // })
    // .catch((error) => {});
  }, []);
  console.log("opLists", opLists);

  return (
    <div>
      <div className=" grid grid-cols-2 items-center p-2">
        <div className=" font-semibold text-[#073763]  text-sm mb-1">
          Radiology Dashboard{" "}
        </div>
        <div className=" flex justify-end">
          <ButtonGroup
            labels={["General", "Category"]}
            selectedButton={selectedButton}
            onButtonClick={handleButtonClick}
          />
        </div>
      </div>

      {selectedButton === "General" ? (
        <div className=" grid lg:grid-cols-7 grid-cols-1 gap-2">
          <div className=" lg:col-span-5">
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-2 xxl:grid-cols-4  gap-2 mb-2">
              {opLists.map((record, index) => (
                <div
                  key={index}
                  className={`${record.bgColor} order border-rose-200 border rounded-lg shadow p-2 hover:shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-102 `}
                >
                  <div className="">
                    <div className=" space-x-2 flex text-gray-900 font-semibold">
                      <div className=" items-center">
                        <div className="  bg-white  rounded-full h-[40px] w-[40px] flex items-center justify-center">
                          {record.icon}{" "}
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
            <div className="grid grid-cols-1 lg:grid-cols-2  gap-2">
              <div>
                <div className=" rounded border border-gray-300 w-full  ">
                  <div className=" rounded  ">
                    <div className="flex bg-gray-100 rounded  rounded-tr  rounded-tl justify-between items-center">
                      <div className="text-sm p-2  font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                        Test Advised / Direct (As on Today){" "}
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
                            data={workOrderList}
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
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                  }}
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
                            {workOrderList.map((entry, index) => (
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
                        {workOrderList.map((entry, index) => (
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
              </div>
              <div>
                <div className="rounded border w-full  ">
                  <div className="">
                    <div className="flex justify-between items-center">
                      <div className="text-sm p-2  font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                        Test Advised V/S Converted{" "}
                      </div>
                      <div className="">
                        <div className="flex justify-between  flex-wrap    items-center">
                          <div className="flex space-x-1 justify-end mr-2 items-center">
                            <div className="w-3 h-3 rounded-full bg-[#EF9542]"></div>
                            <div className="text-xs">Advised</div>
                          </div>
                          <div className="flex space-x-1 justify-end mr-2 items-center">
                            <div className="w-3 rounded-full h-3 bg-[#018438]"></div>
                            <div className="text-xs">Converted</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-b border-gray-200 mx-2 shadow-md "></div>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart
                      width={325}
                      height={200}
                      data={lineDataList}
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
                      <RechartsTooltip content={<LineTooltip />} />

                      <Line
                        type="monotone"
                        dataKey="advised"
                        strokeOpacity={lineDataList.advised}
                        stroke="#018438"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="converted"
                        strokeOpacity={lineDataList.advised}
                        stroke="#EF9542"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1  mt-2 mb-2 gap-2">
              <div className="rounded border  bg-white shadow-md min-h-[200px]">
                <div className="">
                  <div className="flex justify-between items- pt-[3px]">
                    <div className="text-sm p-1 text-gray-800  font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                      Radiologist{" "}
                    </div>
                    <div className="text-sm p-1 mr-3 text-[#E37702]  font-semibold flex items-center justify-end whitespace-nowrap ml-2">
                      Available :{" "}
                      {doctorStatusList.length
                        ? doctorStatusList?.filter(
                            (status) => status.Status === "Available"
                          ).length
                        : 0}
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
                      className=" h-[200px]   overflow-y-auto   border bg-white border-gray-300  "
                    >
                      <table className="w-full ">
                        <thead>
                          <tr className="border-b-[1px] bg-[#F1F1F1] sticky top-[-0.1px] border-t-[1px] w-full">
                            {headersDoctorList?.map((header, i) => (
                              <th key={i} className=" px-2 py-1 gap-5">
                                <span className="font-semibold flex items-center truncate gap-2 text-[13px] ">
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
                                  className={`  px-2 py-[2px]   text-[13px] font-semibold border-b border-b-gray-300 whitespace-nowrap`}
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
            <div className=" col-span-2 -mt-[15px]">
              <div>
                {isLoading ? (
                  <div className="flex justify-center text-gray-400 font-semibold my-5">
                    <LoadingSpinner />
                  </div>
                ) : (
                  <>
                    {dataResult?.length > 0 ? (
                      <CommonDynamicTablePaginationNew
                        dataResult={dataResult}
                        page={page}
                        setPage={setPage}
                        rowsPerPage={rowsPerPage}
                        count={count}
                        renderActions={renderActions}
                        populateTable={populateTable}
                        removeHeaders={["Id", "Sr No", ""]}
                        highlightRow={false}
                        tableHeading=" Work Orders"
                        editableColumns={["Status"]}
                        renderInput={renderInput}
                      />
                    ) : (
                      ""
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className=" col-span-2 -mt-4  lg:mt-0 ">
            <div className="rounded border border-[#C9C9C9] w-full bg-white">
              <div className="  ">
                <div className="flex rounded-tr  rounded-tl bg-[#CEF4FF] justify-between items-center">
                  <div className="text-[16px] text-[#073763] p-2 font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                    Work Order Queue{" "}
                  </div>
                  <div className=" text-sm font-semibold mr-4 text-red-500">
                    {workOrderQueue ? workOrderQueue?.length : 0}
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
                  className="rounded  max-h-[848px] "
                >
                  <div className=" grid  grid-cols-1 gap-2 p-2 ">
                    {workOrderQueue.map((row, rowI) => (
                      <div className="border border-[#1E3A8A] rounded">
                        <div className=" bg-[#FFDCDC]   rounded-tr  rounded-tl  items-center">
                          <div className="text-sm py-2  font-semibold  flex justify-between flex-wrap items-center whitespace-nowrap ml-2">
                            <div className=" text-[#1E3A8A] text-sm font-semibold">
                              {row?.["Patient Name"]}
                            </div>
                            <div className="  text-end pr-1 text-ellipsis  text-[#1E3A8A] text-sm font-semibold">
                              UHID : {row.UHID}
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="grid grid-cols-3 m-1">
                            <div className=" text-xs font-semibold">WO. No</div>
                            <div className="col-span-2 text-xs font-semibold">
                              : {row?.["Order No"]}
                            </div>
                          </div>
                          <div className="grid grid-cols-3 m-1">
                            <div className=" text-xs font-semibold">
                              Patient Rep
                            </div>
                            <div className="col-span-2 text-xs font-semibold">
                              : {row?.["Reporting DateTime"]}
                            </div>
                          </div>
                          <div className="grid grid-cols-3 m-1">
                            <div className=" text-xs font-semibold">
                              Test Name{" "}
                            </div>
                            <div className="col-span-2 text-xs font-semibold">
                              <div className="flex gap-1">
                                {" "}
                                <span>:</span> <p>{row?.["Test Name"]}</p>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 m-1">
                            <div className=" text-xs font-semibold">
                              Pros. Status{" "}
                            </div>
                            <div className="col-span-2 text-xs font-semibold">
                              : {row.Status}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-7 mb-2 gap-2">
            <div className="col-span-1">
              <DatePickerField
                name="fromDate"
                label="From Date"
                control={control}
                defaultValue={null}
                size="small"
                inputFormat="dd-MM-yyyy"
              />
            </div>
            <div className="col-span-1">
              <DatePickerField
                name="toDate"
                label="To Date"
                control={control}
                defaultValue={null}
                size="small"
                inputFormat="dd-MM-yyyy"
              />
            </div>
          </div>
          <table className="w-full rounded border border-[#F1F1F1]">
            <thead>
              <tr className="border-b-[1px] border-t-[1px] text-center bg-[#F1F1F1] mt-[1px] border-[#F1F1F1] w-full">
                {headers.map((header, index) => (
                  <th key={index} className="border-r-[1px] py-[8px]">
                    <span
                      className={`font-semibold flex ${
                        header === "Radiologist/Category"
                          ? "justify-left pl-2 items-center"
                          : " justify-center"
                      } truncate gap-2 text-xs`}
                    >
                      {header}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="w-full">
              {dataResultlist.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="text-left border-b-[1px] border-t-[1px] border-gray-200"
                >
                  {headers.map((header, columnIndex) => (
                    <td
                      key={columnIndex}
                      className={`  ${
                        rowIndex === dataResultlist.length - 1
                          ? "font-semibold"
                          : ""
                      } py-[8px] ${
                        columnIndex === 0 ? "text-left px-2" : "text-center"
                      }   border-r-[1px] text-xs whitespace-nowrap`}
                    >
                      {row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className=" font-semibold text-[#073763]  text-sm my-1">
            Category-wise Performed Test Details
          </div>
          <div className="grid grid-cols-6 lg:grid-cols-10 gap-2 items-center mt-2 mb-2">
            <div className="col-span-2 lg:col-span-2 z-40">
              <SearchDropdown
                handleInputChange={handleInputChange}
                control={control}
                name="category"
                placeholder="Category*"
                dataArray={categoryList}
                isClearable={true}
                isSearchable={true}
              />
            </div>
          </div>
          <div className=" grid  grid-cols-1 gap-2">
            <div className="rounded border w-full ">
              <div className="  ">
                <div className="flex justify-between items-center">
                  <div className="text-sm p-2 font-semibold flex items-center justify-start whitespace-nowrap ml-2">
                    High Performance Tests
                  </div>
                </div>
                <div className="border-b border-gray-200 mx-2 shadow-md "></div>
              </div>

              <div className=" mt-2">
                <ResponsiveContainer
                  width={"100%"}
                  height={35 * highPerformanceTestdetails?.length}
                  debounce={50}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <BarChart
                    data={highPerformanceTestdetails}
                    layout="vertical"
                    margin={{
                      left: 5,
                      right: maxTextWidth + (10 + 3),
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
                      dataKey="testName"
                      type="category"
                      tickLine={false}
                      tick={{
                        fontWeight: "bold",
                        fontSize,
                        fill: "#000000",
                      }}
                      width={180}
                    />
                    <MuiTooltip
                      content={<CustomTooltip />}
                      cursor={{
                        width: 0.1,
                        height: 10,
                        rx: 5,
                      }}
                    />
                    <Bar
                      dataKey="count"
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
        </div>
      )}
    </div>
  );
};

export default RadiologyDashboard;
