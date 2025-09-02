import { useState, useMemo } from "react";
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
} from "recharts";

const STATUS_COLORS = {
  Confirmed: "#ff4d6d",
  Awaited: "#ff80a1",
  Cancelled: "#ff99b7",
  Failed: "#ffc2d1",
};

const COLORS = Object.values(STATUS_COLORS);

const RevenueReport = () => {
  const [tableData] = useState([
    { id: 1, food: "Chicken Parmesan", date: "28.03.2024", price: 55, profit: 7985, margin: "15.00%", revenue: 8000, status: "Confirmed" },
    { id: 2, food: "Pasta Alfredo", date: "28.03.2024", price: 45, profit: 6785, margin: "12.00%", revenue: 7000, status: "Awaited" },
    { id: 3, food: "Grilled Salmon", date: "28.03.2024", price: 65, profit: 8985, margin: "18.00%", revenue: 9000, status: "Cancelled" },
    { id: 4, food: "Tacos", date: "28.03.2024", price: 35, profit: 2985, margin: "10.00%", revenue: 4000, status: "Failed" },
  ]);

  const statusList = Object.keys(STATUS_COLORS);
  const [activeStatuses, setActiveStatuses] = useState(statusList);

  // Pie Data
  const pieData = useMemo(() => {
    const statusRevenue = {};
    tableData.forEach((item) => {
      statusRevenue[item.status] = (statusRevenue[item.status] || 0) + item.revenue;
    });
    return Object.keys(statusRevenue).map((key) => ({
      name: key,
      value: statusRevenue[key],
    }));
  }, [tableData]);

  // Line Data
  const lineData = useMemo(() => {
    const monthMap = {};
    tableData.forEach((item) => {
      const month = item.date.split(".")[1];
      if (!monthMap[month]) {
        monthMap[month] = { month, Confirmed: 0, Awaited: 0, Cancelled: 0, Failed: 0 };
      }
      monthMap[month][item.status] += item.revenue;
    });
    return Object.values(monthMap);
  }, [tableData]);

  const totalRevenue = tableData.reduce((sum, row) => sum + row.revenue, 0);

  const toggleStatus = (status) => {
    setActiveStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8 space-y-6">
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          
          {/* Donut Chart */}
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-gray-900 font-bold mb-4 text-lg md:text-xl lg:text-2xl text-center">
              Total Revenue
            </h3>
            
            <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius="45%"
                    outerRadius="75%"
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                    }}
                  />
                  <text
                    x="50%"
                    y="45%"
                    textAnchor="middle"
                    className="text-sm md:text-base font-semibold"
                    fill="#6b7280"
                  >
                    Total
                  </text>
                  <text
                    x="50%"
                    y="55%"
                    textAnchor="middle"
                    className="text-lg md:text-xl lg:text-2xl font-bold"
                    fill="#111827"
                  >
                    ${totalRevenue.toLocaleString()}
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Responsive Legend */}
            <div className="mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
              {pieData.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2 md:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <span
                      className="w-3 h-3 md:w-4 md:h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: COLORS[i] }}
                    />
                    <span className="text-gray-700 text-xs sm:text-sm md:text-base font-medium truncate">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm md:text-base font-bold text-gray-900 ml-2">
                    ${item.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Line Chart */}
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-gray-900 font-bold mb-4 text-lg md:text-xl lg:text-2xl">
              Revenue Trends
            </h3>

            {/* Responsive Toggle Buttons */}
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 md:mb-6">
              {statusList.map((status) => (
                <button
                  key={status}
                  onClick={() => toggleStatus(status)}
                  className={`px-2 sm:px-3 md:px-4 py-1 md:py-2 rounded-lg text-xs sm:text-sm md:text-base font-medium border transition-all duration-200 ${
                    activeStatuses.includes(status)
                      ? "text-white shadow-md transform scale-105"
                      : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                  }`}
                  style={{
                    backgroundColor: activeStatuses.includes(status)
                      ? STATUS_COLORS[status]
                      : undefined,
                    borderColor: STATUS_COLORS[status],
                  }}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: "#374151", fontSize: 12 }}
                    axisLine={{ stroke: "#9ca3af" }}
                    tickLine={{ stroke: "#9ca3af" }}
                  />
                  <YAxis 
                    tick={{ fill: "#374151", fontSize: 12 }}
                    axisLine={{ stroke: "#9ca3af" }}
                    tickLine={{ stroke: "#9ca3af" }}
                    tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                    }}
                  />

                  {activeStatuses.includes("Confirmed") && (
                    <Line 
                      type="monotone" 
                      dataKey="Confirmed" 
                      stroke={STATUS_COLORS.Confirmed} 
                      strokeWidth={2}
                      dot={{ r: 4, fill: STATUS_COLORS.Confirmed }}
                      activeDot={{ r: 6, fill: STATUS_COLORS.Confirmed }}
                    />
                  )}
                  {activeStatuses.includes("Awaited") && (
                    <Line 
                      type="monotone" 
                      dataKey="Awaited" 
                      stroke={STATUS_COLORS.Awaited} 
                      strokeWidth={2}
                      dot={{ r: 4, fill: STATUS_COLORS.Awaited }}
                      activeDot={{ r: 6, fill: STATUS_COLORS.Awaited }}
                    />
                  )}
                  {activeStatuses.includes("Cancelled") && (
                    <Line 
                      type="monotone" 
                      dataKey="Cancelled" 
                      stroke={STATUS_COLORS.Cancelled} 
                      strokeWidth={2}
                      dot={{ r: 4, fill: STATUS_COLORS.Cancelled }}
                      activeDot={{ r: 6, fill: STATUS_COLORS.Cancelled }}
                    />
                  )}
                  {activeStatuses.includes("Failed") && (
                    <Line 
                      type="monotone" 
                      dataKey="Failed" 
                      stroke={STATUS_COLORS.Failed} 
                      strokeWidth={2}
                      dot={{ r: 4, fill: STATUS_COLORS.Failed }}
                      activeDot={{ r: 6, fill: STATUS_COLORS.Failed }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-200">
            <h3 className="text-gray-900 font-bold text-lg md:text-xl lg:text-2xl">
              Revenue Details
            </h3>
          </div>
          
          {/* Mobile Card View */}
          <div className="block md:hidden">
            <div className="p-4 space-y-4">
              {tableData.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.food}</h4>
                      <p className="text-sm text-gray-600">#{item.id}</p>
                    </div>
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: STATUS_COLORS[item.status] }}
                    >
                      {item.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Date</p>
                      <p className="font-medium">{item.date}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Price</p>
                      <p className="font-medium">${item.price}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Profit</p>
                      <p className="font-medium">${item.profit.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Revenue</p>
                      <p className="font-bold text-lg text-gray-900">${item.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Profit Margin</span>
                      <span className="font-medium">{item.margin}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm lg:text-base text-left text-gray-700">
              <thead className="bg-gray-50 text-gray-900">
                <tr>
                  {["S.No", "Top Selling Food", "Revenue By Date", "Sell Price", "Profit", "Profit Margin", "Total Revenue", "Status"].map((head, i) => (
                    <th key={i} className="px-4 lg:px-6 py-3 lg:py-4 font-semibold">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tableData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-4 lg:px-6 py-3 lg:py-4 font-medium">{item.id}</td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 font-medium text-gray-900">{item.food}</td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4">{item.date}</td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4">${item.price}</td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4">${item.profit.toLocaleString()}</td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4">{item.margin}</td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 font-bold text-gray-900">${item.revenue.toLocaleString()}</td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs lg:text-sm font-medium text-white"
                        style={{ backgroundColor: STATUS_COLORS[item.status] }}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueReport;