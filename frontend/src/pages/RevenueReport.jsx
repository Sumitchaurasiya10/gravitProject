import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

// Pie chart data
const pieData = [
  { name: "Confirmed", value: 110 },
  { name: "Awaited", value: 40 },
  { name: "Cancelled", value: 25 },
  { name: "Failed", value: 17 },
];

const COLORS = ["#ff4d6d", "#ff80a1", "#ff99b7", "#ffc2d1"];
const totalRevenue = 1556;

// Line chart data
const lineData = [
  { month: "JAN", Confirmed: 2000, Awaited: 1000, Cancelled: 800, Failed: 500 },
  { month: "FEB", Confirmed: 2400, Awaited: 1200, Cancelled: 900, Failed: 600 },
  { month: "MAR", Confirmed: 2800, Awaited: 1400, Cancelled: 1000, Failed: 700 },
  { month: "APR", Confirmed: 3200, Awaited: 1500, Cancelled: 1100, Failed: 800 },
  { month: "MAY", Confirmed: 4000, Awaited: 2000, Cancelled: 1200, Failed: 850 },
  { month: "JUN", Confirmed: 3800, Awaited: 1900, Cancelled: 1300, Failed: 900 },
  { month: "JUL", Confirmed: 4200, Awaited: 2100, Cancelled: 1400, Failed: 950 },
  { month: "AUG", Confirmed: 4600, Awaited: 2300, Cancelled: 1500, Failed: 1000 },
  { month: "SEP", Confirmed: 3900, Awaited: 2000, Cancelled: 1300, Failed: 850 },
  { month: "OCT", Confirmed: 3700, Awaited: 1800, Cancelled: 1200, Failed: 800 },
  { month: "NOV", Confirmed: 4200, Awaited: 2100, Cancelled: 1400, Failed: 950 },
  { month: "DEC", Confirmed: 4800, Awaited: 2400, Cancelled: 1600, Failed: 1100 },
];

// Table Data
const tableData = [
  {
    id: 1,
    food: "Chicken Parmesan",
    date: "28.03.2024",
    price: "$55.00",
    profit: "$7,985.00",
    margin: "15.00%",
    revenue: "$8000.00",
  },
  {
    id: 2,
    food: "Pasta Alfredo",
    date: "28.03.2024",
    price: "$45.00",
    profit: "$6,785.00",
    margin: "12.00%",
    revenue: "$7000.00",
  },
  {
    id: 3,
    food: "Grilled Salmon",
    date: "28.03.2024",
    price: "$65.00",
    profit: "$8,985.00",
    margin: "18.00%",
    revenue: "$9000.00",
  },
];

const RevenueReport = () => {
  const [activeTab, setActiveTab] = useState("Revenue Report");

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-black">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-6">Reports</h2>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {["Reservation Report", "Revenue Report", "Staff Report"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === tab
                ? "bg-pink-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-900 font-semibold mb-4">
            Total Revenue
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
              {/* Center Label */}
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-lg font-bold"
                fill="#111827"
              >
                {totalRevenue}$
              </text>
            </PieChart>
          </ResponsiveContainer>
          <ul className="mt-4 space-y-1 text-sm text-gray-800">
            {pieData.map((item, i) => (
              <li key={i}>
                <span
                  className="inline-block w-3 h-3 rounded-full mr-2"
                  style={{ background: COLORS[i] }}
                />
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-900 font-semibold mb-4">Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Confirmed" stroke="#ff4d6d" />
              <Line type="monotone" dataKey="Awaited" stroke="#ff80a1" />
              <Line type="monotone" dataKey="Cancelled" stroke="#ff99b7" />
              <Line type="monotone" dataKey="Failed" stroke="#ffc2d1" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
        <table className="w-full text-sm text-left text-black">
          <thead className="bg-gray-200 text-black">
            <tr>
              <th className="px-4 py-2">S.No</th>
              <th className="px-4 py-2">Top Selling Food</th>
              <th className="px-4 py-2">Revenue By Date</th>
              <th className="px-4 py-2">Sell Price</th>
              <th className="px-4 py-2">Profit</th>
              <th className="px-4 py-2">Profit Margin</th>
              <th className="px-4 py-2">Total Revenue</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, i) => (
              <tr
                key={i}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="px-4 py-2">{item.id}</td>
                <td className="px-4 py-2">{item.food}</td>
                <td className="px-4 py-2">{item.date}</td>
                <td className="px-4 py-2">{item.price}</td>
                <td className="px-4 py-2">{item.profit}</td>
                <td className="px-4 py-2">{item.margin}</td>
                <td className="px-4 py-2">{item.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueReport;
