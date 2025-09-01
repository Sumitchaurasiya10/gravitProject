import { Bell } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StaffList() {
  const [sortBy, setSortBy] = useState("name");
  const navigate = useNavigate();

  const staffData = [
    {
      id: "#101",
      name: "Watson Joyce",
      role: "Manager",
      email: "watsonjoyce11@gmail.com",
      phone: "+1 (123) 123 4654",
      age: 45,
      salary: 2200,
      timings: "9am to 6pm",
    },
    {
      id: "#102",
      name: "Alice Brown",
      role: "Cashier",
      email: "alicebrown@gmail.com",
      phone: "+1 (321) 456 7890",
      age: 30,
      salary: 1500,
      timings: "10am to 7pm",
    },
    {
      id: "#103",
      name: "John Smith",
      role: "Chef",
      email: "johnsmith@gmail.com",
      phone: "+1 (555) 987 6543",
      age: 38,
      salary: 2500,
      timings: "8am to 5pm",
    },
  ];

  // Sorting function
  const sortedStaff = [...staffData].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "age") return a.age - b.age;
    if (sortBy === "salary") return b.salary - a.salary; // high → low
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="flex items-center justify-between bg-white shadow px-6 py-3 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900">Staff Management</h1>

        <div className="flex items-center gap-6">
          <button className="relative text-gray-600 hover:text-pink-600 transition">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-pink-500 rounded-full"></span>
          </button>
          <img
            src="https://i.pravatar.cc/40"
            alt="user avatar"
            className="w-10 h-10 rounded-full border border-gray-300"
          />
        </div>
      </header>

      {/* Page Content */}
      <section className="space-y-6 p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900">Staff</h2>
            <span className="text-gray-500 text-lg">({staffData.length})</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button className="px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-medium transition">
              Add Staff
            </button>
            {/* Sort By Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 shadow-sm hover:border-gray-400 transition"
            >
              <option value="name">Sort by Name</option>
              <option value="age">Sort by Age</option>
              <option value="salary">Sort by Salary</option>
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-200">
          <button className="px-4 py-2 font-medium text-pink-600 border-b-2 border-pink-600">
            Staff Management
          </button>
          <button
            onClick={() => navigate("/attendance")}
            className="px-4 py-2 font-medium text-gray-600 hover:text-gray-900 transition"
          >
            Attendance
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-900 text-sm font-semibold">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Age</th>
                <th className="px-4 py-3">Salary</th>
                <th className="px-4 py-3">Timings</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedStaff.map((staff, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium">{staff.id}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-semibold text-gray-900">{staff.name}</p>
                      <p className="text-xs text-gray-500">{staff.role}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">{staff.email}</td>
                  <td className="px-4 py-3">{staff.phone}</td>
                  <td className="px-4 py-3">{staff.age} yr</td>
                  <td className="px-4 py-3">${staff.salary.toFixed(2)}</td>
                  <td className="px-4 py-3">{staff.timings}</td>
                  <td className="px-4 py-3 flex justify-center gap-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      ✏️
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
