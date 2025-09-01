import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      {/* Logo/Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-pink-600 mb-1 sm:mb-1 text-center">
        COSYPOS
      </h1>

      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        
        <h1 className="text-2xl font-semibold mb-1 text-center text-gray-900">
          Forgot your password?
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Please enter your username or email to recover your password.
        </p>

        <label className="block text-sm mb-1 text-gray-700">
          Username / Email
        </label>
        <input
          className="w-full mb-4 px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none"
          placeholder="Enter your username"
        />

        <button className="w-1/3 sm:w-1/2 mx-auto block py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-medium text-sm sm:text-base transition">
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
