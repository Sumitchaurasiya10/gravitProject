import { Bell, ChevronDown } from "lucide-react";

export default function AttendancePage() {
  const staff = [
    {
      id: "#101",
      name: "Watson Joyce",
      role: "Manager",
      date: "16-Apr-2024",
      timings: "9am to 6pm",
      status: ["Present", "Absent", "Half Shift", "Leave"],
    },
    {
      id: "#102",
      name: "Sarah Connor",
      role: "Chef",
      date: "16-Apr-2024",
      timings: "10am to 7pm",
      status: ["Present", "Absent", "Half Shift", "Leave"],
    },
  ];

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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Staff (22)</h2>
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-medium transition">
              Add Staff
            </button>
            <button className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition text-black font-semibold">
              Sort by <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 border-b">
          <button className="px-4 py-2 font-medium text-gray-700 border-b-2 border-transparent hover:border-pink-500 hover:text-pink-600">
            Staff Management
          </button>
          <button className="px-4 py-2 font-medium text-pink-600 border-b-2 border-pink-500">
            Attendance
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-100">
              <tr className="text-left text-sm font-medium text-gray-600">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Timings</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s, i) => (
                <tr
                  key={i}
                  className="border-t text-sm hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium text-black font-semibold">{s.id}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-semibold text-gray-900">{s.name}</p>
                      <p className="text-xs text-gray-500">{s.role}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-black font-semibold">{s.date}</td>
                  <td className="px-4 py-3 text-black font-semibold">{s.timings}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button className="px-3 py-1 rounded-lg bg-green-100 text-green-700 text-xs font-medium hover:bg-green-200">
                      Present
                    </button>
                    <button className="px-3 py-1 rounded-lg bg-yellow-100 text-yellow-700 text-xs font-medium hover:bg-yellow-200">
                      Absent
                    </button>
                    <button className="px-3 py-1 rounded-lg bg-blue-100 text-blue-700 text-xs font-medium hover:bg-blue-200">
                      Half Shift
                    </button>
                    <button className="px-3 py-1 rounded-lg bg-red-100 text-red-700 text-xs font-medium hover:bg-red-200">
                      Leave
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
