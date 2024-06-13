import React, { useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { BedIcon } from "../../Common Components/assets/ipdassets/Dashboard/DashboardIcons";
import { useForm } from "react-hook-form";
import DropdownField from "../../Common Components/FormFields/DropdownField";

const IPDDashboard = () => {
  const {
    control,
    formState: { errors },
  } = useForm();
  const [activeIndex, setActiveIndex] = useState(0);

  const Info = () => {
    if (BOSLIST.length === 0) {
      return <div></div>;
    }
    const totalCandidates = BOSLIST.reduce(
      (total, record) => total + record.bed,
      0
    );
    return (
      <div className="pie-info absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center  items-center">
        <div className="font-semibold text-xs pl-2">Total Beds</div>
        <div className="font-semibold text-xs">{totalCandidates}</div>
      </div>
    );
  };

  const IPDList = () => {
    return [
      {
        id: 1,
        title: "Total Beds",
        totalCount: 112,
        bgColor: "bg-[#329DFF]",
      },
      {
        id: 2,
        title: "Occupied Beds",
        totalCount: 9,
        bgColor: "bg-[#1EBFC4]",
      },
      {
        id: 3,
        title: "Male",
        totalCount: 4,
        bgColor: "bg-[#EF9542]",
      },
      {
        id: 4,
        title: "FeMale",
        totalCount: 3,
        bgColor: "bg-[#CDA3A3]",
      },
      {
        id: 5,
        title: "Infant/Child",
        totalCount: 2,
        bgColor: "bg-[#018438]",
      },
      {
        id: 103,
        title: "Vacant Beds ",
        totalCount: 103,
        bgColor: "bg-[#8C7354]",
      },
      {
        id: 0,
        title: "New Admission",
        totalCount: 0,
        bgColor: "bg-[#247381]",
      },
      {
        id: 0,
        title: "Discharge Initiated",
        totalCount: 0,
        bgColor: "bg-[#A8AB1D]",
      },
      {
        id: 9,
        title: "Todays Discharged",
        totalCount: 0,
        bgColor: "bg-[#007EA9]",
      },
      {
        id: 10,
        title: "Medico Legal Case",
        totalCount: 0,
        bgColor: "bg-[#CF9C4F]",
      },
    ];
  };
  const BOSLIST = [
    {
      unit: "Occupied",
      bed: 9,
    },
    {
      unit: "Vacant",
      bed: 103,
    },
    {
      unit: "Under Maintenance",
      bed: 0,
    },
  ];
  const listRecord = [
    {
      header: "Cardiology",
      icon: <BedIcon />,
      "Total Total Patient Count  ": 3,
      "New Patients  ": 0,
      "Discharge Initiated ": 0,
      Discharged: 0,
      MLC: 0,
      bgColor: "bg-[#DCFFF9]",
      bgBorder: " border border-[#BCFFF4]",
    },

    {
      header: "Oncology",
      icon: <BedIcon />,
      "Total Total Patient Count  ": 1,
      "New Patients  ": 0,
      "Discharge Initiated ": 0,
      Discharged: 0,
      MLC: 0,
      bgColor: "bg-[#FFEDEF]",
      bgBorder: " border border-[#FFD4D9]",
    },
    {
      header: "Urology",
      icon: <BedIcon />,
      "Total Total Patient Count  ": 1,
      "New Patients  ": 0,
      "Discharge Initiated ": 0,
      Discharged: 0,
      MLC: 0,
      bgColor: "bg-[#FFF8EB]",
      bgBorder: " border border-[#FFEECD]",
    },
    {
      header: "General Medicine  Day Care Female",
      icon: <BedIcon />,
      "Total Total Patient Count  ": 455,
      "New Patients  ": 45,
      "Discharge Initiated ": 7,
      Discharged: 1,
      MLC: 2,
      bgColor: "bg-[#F2F2FF]",
      bgBorder: " border border-[#D2D2FF]",
    },
    {
      header: "Covid - 19  ICU",
      icon: <BedIcon />,
      "Total Total Patient Count  ": 455,
      "New Patients  ": 45,
      "Discharge Initiated ": 7,
      Discharged: 1,
      MLC: 2,
      bgColor: "bg-[#F9FFEC]",
      bgBorder: " border border-[#E7FCBA]",
    },
    {
      header: "Covid - 19  Ward",
      icon: <BedIcon />,
      "Total Total Patient Count  ": 455,
      "New Patients  ": 45,
      "Discharge Initiated ": 7,
      Discharged: 1,
      MLC: 2,
      bgColor: "bg-[#E1FFFD]",
      bgBorder: " border border-[#B5F3F0]",
    },
    {
      header: "BICU",
      icon: <BedIcon />,
      "Total Total Patient Count  ": 455,
      "New Patients  ": 45,
      "Discharge Initiated ": 7,
      Discharged: 1,
      MLC: 2,
      bgColor: "bg-[#FDE5FF]",
      bgBorder: " border border-[#F6BFFB]",
    },
    {
      header: "ICU",
      icon: <BedIcon />,
      "Total Total Patient Count  ": 455,
      "New Patients  ": 45,
      "Discharge Initiated ": 7,
      Discharged: 1,
      MLC: 2,
      bgColor: "bg-[#E9F6FF]",
      bgBorder: " border border-[#B1D7F2]",
    },
    {
      header: "Dermatology Male",
      icon: <BedIcon />,
      "Total Total Patient Count  ": 455,
      "New Patients  ": 45,
      "Discharge Initiated ": 7,
      Discharged: 1,
      MLC: 2,
      bgColor: "bg-[#FFEDFA]",
      bgBorder: " border border-[#FDABE6]",
    },
    {
      header: "Dermatology Female",
      icon: <BedIcon />,
      "Total Total Patient Count  ": 455,
      "New Patients  ": 45,
      "Discharge Initiated ": 7,
      Discharged: 1,
      MLC: 2,
      bgColor: "bg-[#FFE2E2]",
      bgBorder: " border border-[#F5B5B5]",
    },
    {
      header: "ENT Daycare Male ",
      icon: <BedIcon />,
      "Total Total Patient Count  ": 455,
      "New Patients  ": 45,
      "Discharge Initiated ": 7,
      Discharged: 1,
      MLC: 2,
      bgColor: "bg-[#FFFBE4]",
      bgBorder: " border border-[#F1E6A4]",
    },
    {
      header: "ENT Daycare Female ",
      icon: <BedIcon />,
      "Total Total Patient Count  ": 455,
      "New Patients  ": 45,
      "Discharge Initiated ": 7,
      Discharged: 1,
      MLC: 2,
      bgColor: "bg-[#E6FFE7]",
      bgBorder: " border border-[#B1F3B3]",
    },
  ];

  const [unit, setUnit] = useState([
    {
      id: 1,
      value: "Unit 1",
      label: "Unit 1 ",
    },
    {
      id: 2,
      value: "unit 2",
      label: "Unit 2",
    },
    {
      id: 3,
      value: "unit 3",
      label: "Unit 3",
    },
  ]);
  const [departmentList, setDepartmentList] = useState([
    {
      id: 1,
      value: "Cardiology",
      label: "Cardiology",
    },
    {
      id: 2,
      value: "Rediology",
      label: "Rediology",
    },
    {
      id: 3,
      value: "pathology",
      label: "pathology",
      "Mark Common": false,
    },
  ]);
  function onPieHover(data, index) {
    setActiveIndex(index);
  }

  function onMouseLeave() {
    setActiveIndex(0);
  }
  const Lists = useMemo(() => IPDList(), []);
  const COLORS = ["#007EA9", "#6DCD65", "#FA5252", "#FA8686"];

  const CustomTooltip = ({ active, payload, totalBedCount }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.bed / totalBedCount) * 100).toFixed(2);

      return (
        <div className="bg-white border border-gray-400 text-white px-2 py-[3px] rounded-lg">
          <p className="text-black text-xs font-semibold"> {percentage}%</p>
        </div>
      );
    }

    return null;
  };

  const totalBedCount = BOSLIST.reduce((acc, entry) => acc + entry.bed, 0);

  return (
    <div>
      <div className="grid  grid-cols-1  md:grid-cols-4   lg:grid-cols-4  xl:grid-cols-5 gap-2 py-2 items-center">
        <div className="   md:col-span-2  lg:col-span-1  text-sm mb-1">
          <span className="font-semibold ">IPD Dashboard</span>{" "}
          <span className="">(As On Today)</span>
        </div>
        <div className="col-span-1">
          <div>
            <DropdownField
              control={control}
              error={errors.unit}
              name="unit"
              placeholder="Unit"
              dataArray={unit}
              isClearable={false}
              isSearchable={true}
            />
          </div>
        </div>
        <div className="col-span-1">
          <div>
            <DropdownField
              className=""
              control={control}
              error={errors.department}
              name="department"
              placeholder="Department"
              dataArray={departmentList}
              isClearable={false}
              isSearchable={true}
            />
          </div>
        </div>
      </div>
      <div className=" grid  grid-cols-1  xl:grid-cols-7 lg:gap-2 gap-y-2">
        <div className=" lg:col-span-5">
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 ">
            {Lists.map((record, index) => (
              <div
                key={index}
                className={`${record.bgColor} order border-rose-200 border rounded-lg shadow p-2 hover:shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-102 `}
              >
                <div className="">
                  <div className=" space-x-2 py-[2px] flex text-gray-900 font-semibold">
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
        <div className="lg:col-span-2">
          <div className="rounded border w-full  p-1">
            <div>
              <div className=" text-sm ml-2  font-semibold">
                Bed Occupancy Status
              </div>
            </div>
            <div className="grid grid-cols-5 items-center">
              <div className=" col-span-3">
                <div className="pie-info-container relative top-[56px] right-1 ">
                  <Info />
                </div>
                <ResponsiveContainer width="100%" height={100}>
                  <PieChart>
                    <Pie
                      cx="50%"
                      cy="50%"
                      activeIndex={activeIndex}
                      data={BOSLIST}
                      dataKey="bed"
                      nameKey="name"
                      outerRadius={50}
                      innerRadius={35}
                      onMouseOver={onPieHover}
                      onMouseLeave={onMouseLeave}
                      label={(props) => {
                        const tooltipText = `${props.value}`;
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
                      {BOSLIST.map((entry, index) => {
                        return (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        );
                      })}
                    </Pie>
                    <Tooltip
                      content={(props) => (
                        <CustomTooltip
                          {...props}
                          totalBedCount={totalBedCount}
                        />
                      )}
                      wrapperStyle={{ zIndex: 999 }}
                    />{" "}
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="col-span-2">
                <div className=" grid grid-cols-1 gap-2 items-center">
                  {BOSLIST.map((value, index) => (
                    <div key={index} className=" flex  space-x-2">
                      <div
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                          width: "0.80rem",
                          height: "0.80rem",
                          borderRadius: "50%",
                        }}
                      ></div>
                      <div className="text-xs font-semibold">{value.unit}</div>{" "}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="grid  grid-cols-1 lg:grid-cols-4  xl:grid-cols-4   md:grid-cols-2 gap-2">
          {listRecord.map((record, index) => (
            <div
              key={index}
              className={`rounded p-2 ${record.bgColor} ${record.bgBorder} `}
            >
              <div className="flex items-center   space-x-2 pb-1 ">
                <div className=" items-center">
                  <div className="  bg-white  rounded-full h-[40px] w-[40px] flex items-center justify-center">
                    {record.icon}
                  </div>
                </div>
                <div className="font-semibold text-sm mb-2">
                  {record.header}
                </div>
              </div>
              <div className="text-sm  flex items-center   space-x-2 font-semibold ">
                <div className="w-[138px] whitespace-nowrap text-[#0B83A5] text-sm font-semibold">
                  Total Patient Count
                </div>
                <div className=" text-[#000] font-semibold">
                  : {record["Total Total Patient Count  "]}
                </div>
              </div>
              <div className="text-sm flex items-center   space-x-2 font-semibold  ">
                <div className=" w-[138px] whitespace-nowrap text-[#0B83A5] text-sm font-semibold">
                  {" "}
                  New Patients
                </div>
                <div className=" text-[#000] font-semibold">
                  : {record["New Patients  "]}
                </div>
              </div>
              <div className="text-sm flex items-center   space-x-2 font-semibold text-[#0B83A5] ">
                <div className="whitespace-nowrap  text-sm font-semibold w-[138px] text-[#0B83A5]">
                  Discharge Initiated
                </div>
                <div className=" text-[#000] font-semibold">
                  : {record["Discharge Initiated "]}
                </div>
              </div>
              <div className="text-sm font-semibold flex items-center   space-x-2 text-[#0B83A5] ">
                <div className=" whitespace-nowrap  w-[138px] text-[#0B83A5] text-sm font-semibold">
                  Discharged
                </div>
                <div className=" text-[#000] font-semibold">
                  : {record["Discharged"]}
                </div>
              </div>
              <div className="text-sm whitespace-nowrap flex items-center   space-x-2 font-semibold ">
                <div className="w-[138px] text-[#0B83A5] text-sm font-semibold ">
                  MLC
                </div>
                <div className=" text-[#000] font-semibold">
                  : {record["MLC"]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IPDDashboard;
