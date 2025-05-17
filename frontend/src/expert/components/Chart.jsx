import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", seekers: 400, experts: 240 },
  { name: "Feb", seekers: 300, experts: 139 },
  { name: "Mar", seekers: 200, experts: 980 },
  { name: "Apr", seekers: 278, experts: 390 },
  { name: "May", seekers: 189, experts: 480 },
];

const Chart = () => {
  return (
    <div className="p-0 w-full bg-white dark:bg-gray-900 rounded-2xl shadow-md">
      <ResponsiveContainer width="100%" height={250}>
      <AreaChart
  data={data}
  margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
>

          <defs>
            <linearGradient id="colorSeekers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#72A4F2" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#72A4F2" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorExperts" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip contentStyle={{ fontSize: 12 }} />
          <Area
            type="monotone"
            dataKey="seekers"
            stroke="#72A4F2"
            fillOpacity={1}
            fill="url(#colorSeekers)"
          />
          <Area
            type="monotone"
            dataKey="experts"
            stroke="#D4AF37"
            fillOpacity={1}
            fill="url(#colorExperts)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
