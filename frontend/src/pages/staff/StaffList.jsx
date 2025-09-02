import { Bell, ArrowLeft, Upload, User, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function StaffList() {
  const [sortBy, setSortBy] = useState("name");
  const [showAddStaffSidebar, setShowAddStaffSidebar] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [activeTab, setActiveTab] = useState("staff"); // New state for tab management

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    phone: "",
    salary: "",
    dateOfBirth: "",
    shiftStart: "",
    shiftEnd: "",
    address: "",
    additionalDetails: ""
  });

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

  // Attendance data
  const attendanceData = [
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
      name: "Alice Brown",
      role: "Cashier",
      date: "16-Apr-2024",
      timings: "10am to 7pm",
      status: ["Present", "Absent", "Half Shift", "Leave"],
    },
    {
      id: "#103",
      name: "John Smith",
      role: "Chef",
      date: "16-Apr-2024",
      timings: "8am to 5pm",
      status: ["Present", "Absent", "Half Shift", "Leave"],
    },
  ];

  const roles = ["Manager", "Cashier", "Chef", "Server", "Kitchen Helper", "Cleaner"];

  // Sorting function
  const sortedStaff = [...staffData].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "age") return a.age - b.age;
    if (sortBy === "salary") return b.salary - a.salary;
    return 0;
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    setShowAddStaffSidebar(false);
    setFormData({
      fullName: "",
      email: "",
      role: "",
      phone: "",
      salary: "",
      dateOfBirth: "",
      shiftStart: "",
      shiftEnd: "",
      address: "",
      additionalDetails: ""
    });
    setProfileImage(null);
  };

  const handleConfirm = () => {
    // Here you would typically submit the form data
    console.log("Form Data:", formData);
    console.log("Profile Image:", profileImage);
    
    // Reset form and close sidebar
    handleCancel();
    
    // Show success message or handle the submission
    alert("Staff member added successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="flex items-center justify-between bg-white shadow px-6 py-3 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900">Staff Management</h1>
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
            <button 
              onClick={() => setShowAddStaffSidebar(true)}
              className="px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-medium transition"
            >
              Add Staff
            </button>
            {/* Sort By Dropdown - only show for staff tab */}
            {activeTab === "staff" && (
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 shadow-sm hover:border-gray-400 transition"
              >
                <option value="name">Sort by Name</option>
                <option value="age">Sort by Age</option>
                <option value="salary">Sort by Salary</option>
              </select>
            )}
            {/* Sort button for attendance tab */}
            {activeTab === "attendance" && (
              <button className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition text-black font-semibold">
                Sort by <ChevronDown className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-200">
          <button 
            className={`px-4 py-2 font-medium transition ${
              activeTab === "staff" 
                ? "text-pink-600 border-b-2 border-pink-600" 
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("staff")}
          >
            Staff Management
          </button>
          <button
            className={`px-4 py-2 font-medium transition ${
              activeTab === "attendance" 
                ? "text-pink-600 border-b-2 border-pink-600" 
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("attendance")}
          >
            Attendance
          </button>
        </div>

        {/* Staff Management Table */}
        {activeTab === "staff" && (
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
        )}

        {/* Attendance Table */}
        {activeTab === "attendance" && (
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
                {attendanceData.map((s, i) => (
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
        )}
      </section>

      {/* Add Staff Sidebar */}
      {showAddStaffSidebar && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleCancel}
          ></div>
          
          {/* Sidebar */}
          <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleCancel}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Add New Staff</h3>
                </div>
              </div>

              {/* Form Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="space-y-4 sm:space-y-6">
                  {/* Profile Picture */}
                  <div className="text-center">
                    <div className="relative inline-block">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                        {profileImage ? (
                          <img 
                            src={profileImage} 
                            alt="Profile preview" 
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <User className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                        )}
                      </div>
                      <label className="absolute bottom-0 right-0 p-1 bg-pink-500 rounded-full cursor-pointer hover:bg-pink-600 transition">
                        <Upload className="w-4 h-4 text-white" />
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 mt-2">Upload Profile Picture</p>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="text-black w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className=" text-black w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Enter email address"
                      required
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role *
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className=" text-black w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm sm:text-base"
                      required
                    >
                      <option value="">Select a role</option>
                      {roles.map((role) => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className=" text-black w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="+1 (123) 456-7890"
                      required
                    />
                  </div>

                  {/* Salary */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salary *
                    </label>
                    <input
                      type="number"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      className=" text-black w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Enter salary amount"
                      required
                    />
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className=" text-black w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm sm:text-base"
                      required
                    />
                  </div>

                  {/* Shift Timings */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-black block text-sm font-medium text-gray-700 mb-2">
                        Shift Start *
                      </label>
                      <input
                        type="time"
                        name="shiftStart"
                        value={formData.shiftStart}
                        onChange={handleInputChange}
                        className="text-black w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm sm:text-base"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-black block text-sm font-medium text-gray-700 mb-2">
                        Shift End *
                      </label>
                      <input
                        type="time"
                        name="shiftEnd"
                        value={formData.shiftEnd}
                        onChange={handleInputChange}
                        className="text-black w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm sm:text-base"
                        required
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="text-black w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none text-sm sm:text-base"
                      placeholder="Enter complete address"
                      required
                    />
                  </div>

                  {/* Additional Details */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Details
                    </label>
                    <textarea
                      name="additionalDetails"
                      value={formData.additionalDetails}
                      onChange={handleInputChange}
                      rows={3}
                      className="text-black w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none text-sm sm:text-base"
                      placeholder="Any additional information..."
                    />
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleCancel}
                    className="flex-1 px-4 py-2.5 sm:py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 px-4 py-2.5 sm:py-2 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-lg transition text-sm sm:text-base"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}