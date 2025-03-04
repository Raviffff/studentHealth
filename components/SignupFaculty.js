import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupFaculty = () => {
  const [facultyId, setFacultyId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (facultyId.length < 5) {
      alert("Faculty ID must be at least 5 characters.");
      return;
    }
    if (!name.trim()) {
      alert("Name is required.");
      return;
    }
    if (!email.includes("@")) {
      alert("Enter a valid email.");
      return;
    }

    alert("Signup Successful! Redirecting to Login...");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Faculty Signup</h2>

        <input
          type="text"
          placeholder="Enter Faculty ID"
          className="w-full p-2 border rounded mb-3"
          value={facultyId}
          onChange={(e) => setFacultyId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Name"
          className="w-full p-2 border rounded mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={handleSignup}
        >
          Sign Up
        </button>

        <p className="text-center mt-4">
          Already have an account? <a href="/login" className="text-blue-500">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default SignupFaculty;
