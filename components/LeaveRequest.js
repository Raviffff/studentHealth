import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LeaveRequest = () => {
  const [userType, setUserType] = useState("student"); 
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, type: "pending", title: "Family Emergency", date: "Oct 10-12", submitted: "10/2/2023", status: "Pending" },
    { id: 2, type: "approved", title: "Doctor Appointment", date: "Oct 5", submitted: "28/9/2023", status: "Approved" },
    { id: 3, type: "approved", title: "Fever and Flu", date: "Sep 18-20", submitted: "17/9/2023", status: "Approved" },
  ]);

  const [newLeave, setNewLeave] = useState({ title: "", date: "" });

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType") || "student"; 
    setUserType(storedUserType);
  }, []);

  const handleRequestLeave = () => {
    if (!newLeave.title.trim() || !newLeave.date.trim()) return; // Prevent empty submissions

    setLeaveRequests((prevRequests) => [
      { id: Date.now(), type: "pending", ...newLeave, submitted: new Date().toLocaleDateString(), status: "Pending" },
      ...prevRequests,
    ]);

    setNewLeave({ title: "", date: "" });
  };

  const handleApproval = (id, status) => {
    setLeaveRequests((prevRequests) =>
      prevRequests.map((leave) =>
        leave.id === id ? { ...leave, type: status.toLowerCase(), status } : leave
      )
    );
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-100 p-5 flex flex-col">
        <h2 className="text-2xl font-bold text-blue-600 mb-5">HealthBuzz</h2>
        <nav className="space-y-4">
          <Link to="/dashboard" className="block py-3 px-4 bg-gray-200 rounded-lg hover:bg-blue-500 hover:text-white">
            🏠 Dashboard
          </Link>
          <Link to="/meal-plan" className="block py-3 px-4 bg-gray-200 rounded-lg hover:bg-blue-500 hover:text-white">
            🍽 Meal Plan
          </Link>
          <Link to="/medicines" className="block py-3 px-4 bg-gray-200 rounded-lg hover:bg-blue-500 hover:text-white">
            💊 Medicines
          </Link>
          <Link to="/leave-request" className="block py-3 px-4 bg-blue-500 text-white rounded-lg">
            📝 Leave
          </Link>
        </nav>
        <p className="mt-auto text-sm text-gray-500 italic">
          "Rest is not lazy, it's essential for your mental and physical recovery."
        </p>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-8 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">📝 Leave Requests</h1>
            <p className="text-gray-600">Apply for health-related leave and track status</p>
          </div>
          {userType === "student" && (
            <button
              onClick={handleRequestLeave}
              disabled={!newLeave.title.trim() || !newLeave.date.trim()}
              className={`px-4 py-2 rounded-lg shadow-md ${
                newLeave.title && newLeave.date
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              + Request Leave
            </button>
          )}
        </div>

        {/* Student Leave Request Form */}
        {userType === "student" && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Request Leave</h2>
            <input
              type="text"
              placeholder="Reason for leave"
              value={newLeave.title}
              onChange={(e) => setNewLeave({ ...newLeave, title: e.target.value })}
              className="w-full p-2 mb-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Leave Dates (e.g., Oct 10-12)"
              value={newLeave.date}
              onChange={(e) => setNewLeave({ ...newLeave, date: e.target.value })}
              className="w-full p-2 mb-2 border rounded-lg"
            />
            <button
              onClick={handleRequestLeave}
              disabled={!newLeave.title.trim() || !newLeave.date.trim()}
              className={`px-4 py-2 rounded-lg ${
                newLeave.title && newLeave.date
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Submit Request
            </button>
          </div>
        )}

        {/* Pending Requests */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-yellow-600">⏳ Pending Requests</h2>
          {leaveRequests.filter((leave) => leave.type === "pending").map((leave) => (
            <div key={leave.id} className="bg-white p-4 mt-2 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{leave.title}</h3>
                <p className="text-gray-600">{leave.date}</p>
                <p className="text-xs text-gray-500">Submitted on {leave.submitted}</p>
              </div>
              <span className="px-3 py-1 text-sm text-yellow-600 bg-yellow-100 rounded-full">{leave.status}</span>
              {userType === "faculty" && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleApproval(leave.id, "Approved")}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => handleApproval(leave.id, "Rejected")}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    ❌ Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Previous Requests */}
        <div>
          <h2 className="text-xl font-semibold text-green-600">✔️ Previous Requests</h2>
          {leaveRequests
            .filter((leave) => leave.type !== "pending") 
            .map((leave) => (
              <div key={leave.id} className="bg-white p-4 mt-2 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{leave.title}</h3>
                  <p className="text-gray-600">{leave.date}</p>
                  <p className="text-xs text-gray-500">Submitted on {leave.submitted}</p>
                </div>
                <span className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-full">{leave.status}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LeaveRequest;
