"use client";
import { useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { ArrowLeftIcon, BellIcon } from "@heroicons/react/24/outline";

export default function Dashboard() {
  // Sample sparkline data
  const salesData = [
    { day: "Mon", value: 400 },
    { day: "Tue", value: 300 },
    { day: "Wed", value: 500 },
    { day: "Thu", value: 200 },
    { day: "Fri", value: 600 },
    { day: "Sat", value: 350 },
    { day: "Sun", value: 450 },
  ];

  const revenueData = [
    { day: "Mon", value: 200 },
    { day: "Tue", value: 250 },
    { day: "Wed", value: 300 },
    { day: "Thu", value: 280 },
    { day: "Fri", value: 320 },
    { day: "Sat", value: 310 },
    { day: "Sun", value: 290 },
  ];

  const occupancyData = [
    { day: "Mon", value: 10 },
    { day: "Tue", value: 12 },
    { day: "Wed", value: 8 },
    { day: "Thu", value: 14 },
    { day: "Fri", value: 18 },
    { day: "Sat", value: 20 },
    { day: "Sun", value: 15 },
  ];

  // Data for the Overview chart
  const overviewDataMonthly = [
    { month: "Jan", sales: 4000, revenue: 2400 },
    { month: "Feb", sales: 3000, revenue: 1398 },
    { month: "Mar", sales: 2000, revenue: 9800 },
    { month: "Apr", sales: 2780, revenue: 3908 },
    { month: "May", sales: 1890, revenue: 4800 },
    { month: "Jun", sales: 2390, revenue: 3800 },
    { month: "Jul", sales: 3490, revenue: 4300 },
  ];

  const overviewDataWeekly = [
    { week: "W1", sales: 1200, revenue: 800 },
    { week: "W2", sales: 1500, revenue: 1000 },
    { week: "W3", sales: 1700, revenue: 1100 },
    { week: "W4", sales: 1400, revenue: 900 },
  ];

  const overviewDataDaily = [
    { day: "Mon", sales: 200, revenue: 150 },
    { day: "Tue", sales: 250, revenue: 180 },
    { day: "Wed", sales: 300, revenue: 200 },
    { day: "Thu", sales: 280, revenue: 170 },
    { day: "Fri", sales: 320, revenue: 210 },
    { day: "Sat", sales: 310, revenue: 190 },
    { day: "Sun", sales: 290, revenue: 175 },
  ];

  const [activeTab, setActiveTab] = useState("Monthly");

  // choose dataset based on tab
  const getChartData = () => {
    switch (activeTab) {
      case "Weekly":
        return overviewDataWeekly;
      case "Daily":
        return overviewDataDaily;
      default:
        return overviewDataMonthly;
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <ArrowLeftIcon className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer text-black hover:text-pink-500 transition" />
          <h1 className="text-xl sm:text-2xl font-bold text-black">Dashboard</h1>
        </div>
      </div>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {/* Daily Sales */}
        <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-gray-200 shadow hover:shadow-lg transition">
          <p className="text-gray-600 text-xs sm:text-sm">Daily Sales</p>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">$2k</h2>
          <p className="text-xs text-gray-500 mt-1">9 February 2024</p>
          <div className="h-14 sm:h-16 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <Bar dataKey="value" fill="#4ade80" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-gray-200 shadow hover:shadow-lg transition">
          <p className="text-gray-600 text-xs sm:text-sm">Monthly Revenue</p>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">$55k</h2>
          <p className="text-xs text-gray-500 mt-1">1 Jan - 1 Feb</p>
          <div className="h-14 sm:h-16 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <Bar dataKey="value" fill="#38bdf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table Occupancy */}
        <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-gray-200 shadow hover:shadow-lg transition">
          <p className="text-gray-600 text-xs sm:text-sm">Table Occupancy</p>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">25 Tables</h2>
          <p className="text-xs text-gray-500 mt-1">Active now</p>
          <div className="h-14 sm:h-16 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={occupancyData}>
                <Bar dataKey="value" fill="#f472b6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Popular Dishes + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Popular Dishes (1) */}
        <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-gray-200 shadow">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Popular Dishes
            </h3>
            <button className="text-xs sm:text-sm text-pink-600 hover:underline">
              See All
            </button>
          </div>
          <ul className="space-y-2 sm:space-y-3">
            {[
              { name: "Chicken Parmesan", status: "In Stock", price: "$55.00" },
              { name: "Chicken Parmesan", status: "In Stock", price: "$55.00" },
              {
                name: "Chicken Parmesan",
                status: "Out of Stock",
                price: "$55.00",
              },
              { name: "Chicken Parmesan", status: "In Stock", price: "$55.00" },
            ].map((dish, i) => (
              <li
                key={i}
                className="flex flex-col xs:flex-row justify-between items-start xs:items-center p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gray-50 border border-gray-200 gap-2 xs:gap-0"
              >
                <span className="text-sm sm:text-base text-gray-800">{dish.name}</span>
                <div className="flex items-center gap-2 xs:gap-4">
                  <span
                    className={`text-xs sm:text-sm ${
                      dish.status === "In Stock"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {dish.status}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-700">{dish.price}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Dishes (2) */}
        <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-gray-200 shadow">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Popular Dishes
            </h3>
            <button className="text-xs sm:text-sm text-pink-600 hover:underline">
              See All
            </button>
          </div>
          <ul className="space-y-2 sm:space-y-3">
            {[
              { name: "Grilled Salmon", status: "In Stock", price: "$65.00" },
              { name: "Veggie Burger", status: "In Stock", price: "$35.00" },
              { name: "Lobster Roll", status: "Out of Stock", price: "$75.00" },
              { name: "Pasta Alfredo", status: "In Stock", price: "$45.00" },
            ].map((dish, i) => (
              <li
                key={i}
                className="flex flex-col xs:flex-row justify-between items-start xs:items-center p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gray-50 border border-gray-200 gap-2 xs:gap-0"
              >
                <span className="text-sm sm:text-base text-gray-800">{dish.name}</span>
                <div className="flex items-center gap-2 xs:gap-4">
                  <span
                    className={`text-xs sm:text-sm ${
                      dish.status === "In Stock"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {dish.status}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-700">{dish.price}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-gray-200 shadow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-3 sm:gap-0">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Overview</h3>
          <div className="flex flex-col xs:flex-row items-start xs:items-center space-y-2 xs:space-y-0 xs:space-x-3">
            {/* Tabs */}
            <div className="flex space-x-2">
              {["Monthly", "Weekly", "Daily"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg ${
                    activeTab === tab
                      ? "bg-pink-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* Export button */}
            <button className="px-3 sm:px-4 py-1 text-xs sm:text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 mt-2 xs:mt-0">
              Export
            </button>
          </div>
        </div>

        {/* Overview Chart */}
        <div className="h-60 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={getChartData()}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey={
                  activeTab === "Monthly"
                    ? "month"
                    : activeTab === "Weekly"
                    ? "week"
                    : "day"
                }
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#38bdf8" radius={[4, 4, 0, 0]} />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#f472b6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}