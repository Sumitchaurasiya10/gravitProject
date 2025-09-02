import { Camera, Eye, EyeOff } from "lucide-react";
import { useState, useRef } from "react";
import ManageAccess from "./ManageAccess";

export default function Profile() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/80"
  );
  const [activeTab, setActiveTab] = useState("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-4xl flex justify-between items-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Profile</h2>
        
        {/* Mobile menu button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Profile Layout */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Sidebar - Mobile overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)}>
            <div className="absolute right-0 top-0 h-full w-3/4 bg-white p-4 shadow-lg" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <ul className="space-y-3 mt-8">
                <li>
                  <button
                    onClick={() => { setActiveTab("profile"); setIsSidebarOpen(false); }}
                    className={`w-full text-left px-4 py-2 rounded-lg font-medium ${
                      activeTab === "profile"
                        ? "bg-pink-100 text-pink-700"
                        : "text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    My Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setActiveTab("manage"); setIsSidebarOpen(false); }}
                    className={`block w-full text-left px-4 py-2 rounded-lg ${
                      activeTab === "manage"
                        ? "bg-pink-100 text-pink-700 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Manage Access
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Sidebar - Desktop */}
        <div className="hidden md:block bg-white border rounded-lg p-4 shadow-sm">
          <ul className="space-y-3">
            <li>
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left px-4 py-2 rounded-lg font-medium ${
                  activeTab === "profile"
                    ? "bg-pink-100 text-pink-700"
                    : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                My Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("manage")}
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === "manage"
                    ? "bg-pink-100 text-pink-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Manage Access
              </button>
            </li>
            <li>
              <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg">
                Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Right Content */}
        <div className="md:col-span-2 bg-white border rounded-lg p-4 sm:p-6 shadow-sm">
          {activeTab === "profile" && (
            <>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Personal Information
              </h3>

              {/* User Info */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-0 right-0 bg-pink-500 p-1 rounded-full text-white"
                  >
                    <Camera size={14} className="sm:size-4" />
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-lg font-semibold text-gray-900">
                    John Doe
                  </h4>
                  <p className="text-sm text-gray-700">Manager</p>
                </div>
              </div>

              {/* Form */}
              <form className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm text-gray-900">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="mt-1 w-full border rounded-lg p-2 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-900">Email</label>
                  <input
                    type="email"
                    defaultValue="johndoe123@gmail.com"
                    className="mt-1 w-full border rounded-lg p-2 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-900">Address</label>
                  <input
                    type="text"
                    defaultValue="123 Street USA, Chicago"
                    className="mt-1 w-full border rounded-lg p-2 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-900">
                    New Password
                  </label>
                  <div className="relative mt-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      defaultValue="password123"
                      className="w-full border rounded-lg p-2 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-pink-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-900">
                    Confirm Password
                  </label>
                  <div className="relative mt-1">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      defaultValue="password123"
                      className="w-full border rounded-lg p-2 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-pink-400"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-2.5 text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg text-gray-900 hover:bg-gray-100 order-2 sm:order-1"
                  >
                    Discard Changes
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 order-1 sm:order-2"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </>
          )}

          {activeTab === "manage" && <ManageAccess />}
        </div>
      </div>
    </div>
  );
}