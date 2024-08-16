import React from "react";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">
          BoomAI
        </h1>

        <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg mb-4 hover:bg-blue-700 transition-all duration-200">
          Sign up with Google
        </button>
        <button className="w-full bg-blue-800 text-white py-3 px-4 rounded-lg mb-4 hover:bg-blue-900 transition-all duration-200">
          Sign up with Facebook
        </button>
        <button className="w-full bg-gray-700 text-white py-3 px-4 rounded-lg mb-6 hover:bg-gray-600 transition-all duration-200">
          Sign up with Microsoft
        </button>

        <input
          type="email"
          placeholder="Email"
          className="w-full bg-gray-700 p-3 rounded-lg text-white placeholder-gray-400 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="text"
          placeholder="Name"
          className="w-full bg-gray-700 p-3 rounded-lg text-white placeholder-gray-400 mb-6 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <button className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 px-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default SignUp;
