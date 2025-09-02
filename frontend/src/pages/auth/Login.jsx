import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "../../assets/CULlai.svg";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {/* Login Form */}
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white-100 p-6 sm:p-8 rounded-2xl shadow-md border border-gray-300"
      >
      {/* Logo/Title */}
      <h1 className="mb-6 sm:mb-2 flex justify-center">
        <img src={logo} alt="CUL Logo" className="h-16 sm:h-20 md:h-24" />
      </h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-900 text-center">
          Login!
        </h2>

        <p className="text-gray-600 mb-6 text-center text-sm sm:text-base">
          Please enter your credentials below to continue
        </p>

        {/* Username */}
        <label className="block text-sm mb-1 text-gray-700">Username</label>
        <input
          className="w-full mb-4 px-3 py-2 rounded-xl bg-white border border-gray-400 outline-none text-sm sm:text-base"
          placeholder="Enter your username"
        />

        {/* Password with toggle */}
        <label className="block text-sm mb-1 text-gray-700">Password</label>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-3 py-2 rounded-xl bg-white border border-gray-400 outline-none pr-10 text-sm sm:text-base"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Remember & Forgot */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 text-sm gap-2">
          <label className="inline-flex items-center gap-2 text-gray-700">
            <input type="checkbox" className="accent-pink-500" /> Remember me
          </label>
          <Link to="/forgot-password" className="text-pink-600 hover:underline">
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button className="w-1/3 sm:w-1/2 mx-auto block py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-medium text-sm sm:text-base">
          Login
        </button>
      </form>
    </div>
  );
}
