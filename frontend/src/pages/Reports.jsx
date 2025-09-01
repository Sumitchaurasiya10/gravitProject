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
import RevenueReport from "./RevenueReport"; // import revenue report component

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
];

const totalReservations = pieData.reduce((acc, item) => acc + item.value, 0);

export default function Reports() {
  const [activeTab, setActiveTab] = useState("Reservation Report");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center flex-wrap gap-3">
          <h2 className="text-xl font-semibold text-gray-900">Reports</h2>
          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="date"
              className="border rounded-md px-2 py-1 text-sm text-gray-900"
              defaultValue="2024-04-01"
            />
            <input
              type="date"
              className="border rounded-md px-2 py-1 text-sm text-gray-900"
              defaultValue="2024-04-08"
            />
            <button className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600">
              Generate Report
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 flex-wrap">
          {["Reservation Report", "Revenue Report", "Staff Report"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === tab
                  ? "bg-pink-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "Reservation Report" && (
          <>
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pie Chart */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-gray-900 font-semibold mb-4">
                  Total Reservation
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      fill="#8884d8"
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
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-lg font-bold"
                      fill="#111827"
                    >
                      {totalReservations}
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
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#111827" />
                    <YAxis stroke="#111827" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="confirmed"
                      stroke="#ec4899"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="awaited"
                      stroke="#fbbf24"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="cancelled"
                      stroke="#f87171"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="failed"
                      stroke="#9ca3af"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Reservation Table */}
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-900">
                <thead className="bg-gray-100 text-gray-900">
                  <tr>
                    <th className="px-4 py-2">Reservation ID</th>
                    <th className="px-4 py-2">Customer Name</th>
                    <th className="px-4 py-2">Phone Number</th>
                    <th className="px-4 py-2">Reservation Date</th>
                    <th className="px-4 py-2">Check In</th>
                    <th className="px-4 py-2">Check Out</th>
                    <th className="px-4 py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((res) => (
                    <tr key={res.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{res.id}</td>
                      <td className="px-4 py-2">{res.customer}</td>
                      <td className="px-4 py-2">{res.phone}</td>
                      <td className="px-4 py-2">{res.date}</td>
                      <td className="px-4 py-2">{res.checkIn}</td>
                      <td className="px-4 py-2">{res.checkOut}</td>
                      <td className="px-4 py-2">{res.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === "Revenue Report" && <RevenueReport />}

        {activeTab === "Staff Report" && (
          <div className="bg-white rounded-lg shadow p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900">Staff Report</h3>
            <p className="text-gray-700">This is the staff report section.</p>
          </div>
        )}
      </main>
    </div>
  );
}
