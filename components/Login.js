import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userType, setUserType] = useState("student"); // Default: Student
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (userId.length === 10 && password === userId.slice(-3)) {
      if (userType === "student") {
        navigate("/dashboard", { state: { userType } });
      } else {
        navigate("/faculty-dashboard", { state: { userType } });
      }
    } else {
      alert("Invalid Credentials! Make sure ID is 10 digits & password is last 3 digits of ID.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* User Type Selection */}
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 rounded-l-lg ${
              userType === "student" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setUserType("student")}
          >
            Student
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg ${
              userType === "faculty" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setUserType("faculty")}
          >
            Faculty
          </button>
        </div>

        {/* Input Fields */}
        <input
          type="text"
          placeholder="Enter 10-digit ID"
          className="w-full p-2 border rounded mb-3"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password (last 3 digits of ID)"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>

        {/* Signup Options */}
        <p className="text-center mt-4">
          {userType === "student" ? (
            <a href="/signup-student" className="text-blue-500">
              New Student? Sign up here
            </a>
          ) : (
            <a href="/signup-faculty" className="text-blue-500">
              New Faculty? Sign up here
            </a>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;

