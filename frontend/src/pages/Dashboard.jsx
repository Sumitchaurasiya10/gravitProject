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
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header Replaced */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <ArrowLeftIcon className="w-6 h-6 cursor-pointer text-black hover:text-pink-500 transition" />
          <h1 className="text-2xl font-bold text-black">Dashboard</h1>
        </div>

       
      </div>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols- xl:grid-cols-4 gap-7">
        {/* Daily Sales */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow hover:shadow-lg transition">
          <p className="text-gray-600 text-sm">Daily Sales</p>
          <h2 className="text-2xl font-semibold text-gray-900">$2k</h2>
          <p className="text-xs text-gray-500 mt-1">9 February 2024</p>
          <div className="h-16 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <Bar dataKey="value" fill="#4ade80" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow hover:shadow-lg transition">
          <p className="text-gray-600 text-sm">Monthly Revenue</p>
          <h2 className="text-2xl font-semibold text-gray-900">$55k</h2>
          <p className="text-xs text-gray-500 mt-1">1 Jan - 1 Feb</p>
          <div className="h-16 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <Bar dataKey="value" fill="#38bdf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table Occupancy */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow hover:shadow-lg transition">
          <p className="text-gray-600 text-sm">Table Occupancy</p>
          <h2 className="text-2xl font-semibold text-gray-900">25 Tables</h2>
          <p className="text-xs text-gray-500 mt-1">Active now</p>
          <div className="h-16 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={occupancyData}>
                <Bar dataKey="value" fill="#f472b6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Popular Dishes + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Dishes (1) */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-900">
              Popular Dishes
            </h3>
            <button className="text-sm text-pink-600 hover:underline">
              See All
            </button>
          </div>
          <ul className="space-y-3">
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
                className="flex justify-between items-center p-3 rounded-xl bg-gray-50 border border-gray-200"
              >
                <span className="text-gray-800">{dish.name}</span>
                <span
                  className={`text-sm ${
                    dish.status === "In Stock"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {dish.status}
                </span>
                <span className="text-gray-700">{dish.price}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Dishes (2) */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-900">
              Popular Dishes
            </h3>
            <button className="text-sm text-pink-600 hover:underline">
              See All
            </button>
          </div>
          <ul className="space-y-3">
            {[
              { name: "Grilled Salmon", status: "In Stock", price: "$65.00" },
              { name: "Veggie Burger", status: "In Stock", price: "$35.00" },
              { name: "Lobster Roll", status: "Out of Stock", price: "$75.00" },
              { name: "Pasta Alfredo", status: "In Stock", price: "$45.00" },
            ].map((dish, i) => (
              <li
                key={i}
                className="flex justify-between items-center p-3 rounded-xl bg-gray-50 border border-gray-200"
              >
                <span className="text-gray-800">{dish.name}</span>
                <span
                  className={`text-sm ${
                    dish.status === "In Stock"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {dish.status}
                </span>
                <span className="text-gray-700">{dish.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Overview</h3>
          <div className="flex items-center space-x-3">
            {/* Tabs */}
            <div className="flex space-x-2">
              {["Monthly", "Weekly", "Daily"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 text-sm rounded-lg ${
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
            <button className="px-4 py-1 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100">
              Export
            </button>
          </div>
        </div>

        {/* Overview Chart */}
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={getChartData()}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
              />
              <YAxis stroke="#6b7280" />
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
