import { Camera, Eye, EyeOff } from "lucide-react";
import { useState, useRef } from "react";
import ManageAccess from "./ManageAccess";

export default function Profile() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/80"
  );
  const [activeTab, setActiveTab] = useState("profile"); // 👈 Controls sidebar section
  const fileInputRef = useRef(null);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-4xl flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Profile</h2>
        
      </header>

      {/* Profile Layout */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="bg-white border rounded-lg p-4 shadow-sm">
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

        {/* Right Content (Switches based on activeTab) */}
        <div className="md:col-span-2 bg-white border rounded-lg p-6 shadow-sm">
          {activeTab === "profile" && (
            <>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Personal Information
              </h3>

              {/* User Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-20 h-20 rounded-full border object-cover"
                  />
                  {/* Upload Button */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-0 right-0 bg-pink-500 p-1 rounded-full text-white"
                  >
                    <Camera size={16} />
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    John Doe
                  </h4>
                  <p className="text-sm text-gray-700">Manager</p>
                </div>
              </div>

              {/* Form */}
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm text-gray-900">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="mt-1 w-full border rounded-lg p-2 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-gray-900">Email</label>
                  <input
                    type="email"
                    defaultValue="johndoe123@gmail.com"
                    className="mt-1 w-full border rounded-lg p-2 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                <div className="col-span-2">
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
                <div className="col-span-2 flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg text-gray-900 hover:bg-gray-100"
                  >
                    Discard Changes
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600"
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
