import { Link } from "react-router-dom";
import logo from "../../assets/CULlai.svg";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen grid place-items-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        {/* Logo inside the card */}
        
          <h1 className="mb-4 sm:mb-3 flex justify-center">
                  <img src={logo} alt="CUL Logo" className="h-16 sm:h-20 md:h-24" />
                </h1>
        
        
        <h1 className="text-2xl font-semibold mb-2 text-center text-gray-900">
          Forgot your password?
        </h1>
        <p className="text-gray-600 mb-6 text-center text-sm">
          Please enter your username or email to recover your password.
        </p>
        
        <div className="mb-4">
          <label className="block text-sm mb-2 text-gray-700 font-medium">
            Username / Email
          </label>
          <input
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none text-sm"
            placeholder="Enter your username"
          />
        </div>
        
        <button className="w-full py-3 mb-4 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-medium text-sm transition-colors">
          Submit Now
        </button>
        
         <Link
          to="/login"
          className="block text-center text-sm text-gray-500 hover:text-pink-600 hover:underline mt-4"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}