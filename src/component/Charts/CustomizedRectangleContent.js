import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Customized,
  Rectangle,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const CustomizedRectangle = (props) => {
  const { formattedGraphicalItems } = props;
  console.log(props);
  const firstSeries = formattedGraphicalItems[0];
  const secondSeries = formattedGraphicalItems[1];

  return firstSeries?.props?.points.map((_, index) => {
    const firstSeriesPoint = firstSeries?.props?.points[index];
    const secondSeriesPoint = secondSeries?.props?.points[index];
    const yDiff = firstSeriesPoint.y - secondSeriesPoint.y;

    return (
      <Rectangle
        width={10}
        height={-yDiff}
        x={firstSeriesPoint.x - 5}
        y={firstSeriesPoint.y}
        fill={yDiff > 0 ? "red" : yDiff < 0 ? "green" : "none"}
      />
    );
  });
};

const CustomizedRectangleContent = () => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        <Customized component={CustomizedRectangle} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomizedRectangleContent;
