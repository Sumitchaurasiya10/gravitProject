import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import RevenueReport from "./RevenueReport";



const pieData = [
  { name: "Confirmed", value: 110 },
  { name: "Awaited", value: 40 },
  { name: "Cancelled", value: 25 },
  { name: "Failed", value: 17 },
];

const COLORS = ["#ec4899", "#fbbf24", "#f87171", "#9ca3af"];

const lineData = [
  { month: "JAN", confirmed: 2000, awaited: 800, cancelled: 500, failed: 200 },
  { month: "FEB", confirmed: 3000, awaited: 1200, cancelled: 700, failed: 300 },
  { month: "MAR", confirmed: 2500, awaited: 1500, cancelled: 600, failed: 400 },
  { month: "APR", confirmed: 4000, awaited: 1800, cancelled: 900, failed: 500 },
  { month: "MAY", confirmed: 3500, awaited: 1600, cancelled: 800, failed: 450 },
  { month: "JUN", confirmed: 5000, awaited: 2000, cancelled: 1000, failed: 600 },
  { month: "JUL", confirmed: 4200, awaited: 1700, cancelled: 950, failed: 500 },
  { month: "AUG", confirmed: 4600, awaited: 1800, cancelled: 850, failed: 550 },
  { month: "SEP", confirmed: 3200, awaited: 1500, cancelled: 700, failed: 400 },
  { month: "OCT", confirmed: 4800, awaited: 1900, cancelled: 1000, failed: 650 },
  { month: "NOV", confirmed: 3900, awaited: 1700, cancelled: 850, failed: 450 },
  { month: "DEC", confirmed: 5200, awaited: 2000, cancelled: 1200, failed: 700 },
];

const reservations = [
  {
    id: "#12354564",
    customer: "Watson Joyce",
    phone: "+1 (123) 123 4564",
    date: "28.03.2024",
    checkIn: "03:18 PM",
    checkOut: "05:00 PM",
    total: "$250.00",
  },
  {
    id: "#12354565",
    customer: "Emily Smith",
    phone: "+1 (987) 654 3210",
    date: "28.03.2024",
    checkIn: "04:00 PM",
    checkOut: "06:00 PM",
    total: "$180.00",
  },
  {
    id: "#12354566",
    customer: "John Doe",
    phone: "+1 (555) 123 4567",
    date: "29.03.2024",
    checkIn: "02:30 PM",
    checkOut: "04:30 PM",
    total: "$320.00",
  },
];

const totalReservations = pieData.reduce((acc, item) => acc + item.value, 0);

// Revenue Report Component


export default function Reports() {
  const [activeTab, setActiveTab] = useState("Reservation Report");

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Reports Dashboard
          </h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
              <input
                type="date"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 shadow-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-colors duration-200 w-full xs:w-auto"
                defaultValue="2024-04-01"
              />
              <input
                type="date"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 shadow-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-colors duration-200 w-full xs:w-auto"
                defaultValue="2024-04-08"
              />
            </div>
            <button className="w-full sm:w-auto px-4 py-2 bg-pink-500 text-white rounded-md shadow hover:shadow-lg hover:bg-pink-600 transition-all duration-200 font-medium">
              Generate Report
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {["Reservation Report", "Revenue Report", "Staff Report"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === tab
                  ? "bg-pink-500 text-white shadow-md transform scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md shadow-sm border border-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "Reservation Report" && (
          <div className="space-y-6">
            {/* Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Pie Chart */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Total Reservations
                </h3>
                <div className="h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={window.innerWidth < 640 ? 50 : 60}
                        outerRadius={window.innerWidth < 640 ? 80 : 90}
                        fill="#8884d8"
                        dataKey="value"
                        paddingAngle={3}
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [`${value}`, `${name}`]}
                        cursor={{ fill: "rgba(0,0,0,0.05)" }}
                      />
                      <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-xl sm:text-2xl font-bold"
                        fill="#111827"
                      >
                        {totalReservations}
                      </text>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {pieData.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 transition-colors duration-200"
                    >
                      <span
                        className="inline-block w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: COLORS[i] }}
                      />
                      <span className="text-sm text-gray-700 truncate">{item.name}</span>
                      <span className="text-sm font-medium text-gray-900 ml-auto">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Line Chart */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Monthly Trends
                </h3>
                <div className="h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="month" 
                        stroke="#111827"
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        stroke="#111827"
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip cursor={{ stroke: "#d1d5db", strokeWidth: 2 }} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="confirmed"
                        stroke="#ec4899"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="awaited"
                        stroke="#fbbf24"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="cancelled"
                        stroke="#f87171"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="failed"
                        stroke="#9ca3af"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Reservation Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Reservations</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-900">
                  <thead className="bg-gray-50 text-gray-900">
                    <tr>
                      <th className="px-4 py-3 font-medium">Reservation ID</th>
                      <th className="px-4 py-3 font-medium">Customer Name</th>
                      <th className="px-4 py-3 font-medium hidden sm:table-cell">Phone Number</th>
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium hidden md:table-cell">Check In</th>
                      <th className="px-4 py-3 font-medium hidden md:table-cell">Check Out</th>
                      <th className="px-4 py-3 font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {reservations.map((res) => (
                      <tr
                        key={res.id}
                        className="hover:bg-pink-50 transition-colors duration-200"
                      >
                        <td className="px-4 py-3 font-medium text-gray-900">{res.id}</td>
                        <td className="px-4 py-3">{res.customer}</td>
                        <td className="px-4 py-3 hidden sm:table-cell text-gray-600">{res.phone}</td>
                        <td className="px-4 py-3">{res.date}</td>
                        <td className="px-4 py-3 hidden md:table-cell text-gray-600">{res.checkIn}</td>
                        <td className="px-4 py-3 hidden md:table-cell text-gray-600">{res.checkOut}</td>
                        <td className="px-4 py-3 font-semibold text-pink-600">{res.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

         {activeTab === "Revenue Report" && <RevenueReport />}

        {activeTab === "Staff Report" && (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Staff Report</h3>
            <div className="space-y-4">
              <p className="text-gray-700">
                This section displays comprehensive staff performance metrics and analytics.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900">Total Staff</h4>
                  <p className="text-2xl font-bold text-blue-600 mt-2">24</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900">Active Today</h4>
                  <p className="text-2xl font-bold text-green-600 mt-2">18</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900">Avg Performance</h4>
                  <p className="text-2xl font-bold text-purple-600 mt-2">4.2/5</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}