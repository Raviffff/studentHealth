import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiCheckCircle } from "react-icons/fi";

const FacultyLeaves = () => {
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      student: "Alice Brown",
      reason: "Family Emergency",
      date: "Oct 10-12",
      status: "Pending",
      history: [
        { date: "Feb 10-12", status: "Approved" },
        { date: "Jan 20-22", status: "Rejected" },
      ],
    },
    {
      id: 2,
      student: "Mark Wilson",
      reason: "Doctor Appointment",
      date: "Oct 5",
      status: "Pending",
      history: [
        { date: "Feb 1", status: "Approved" },
        { date: "Jan 15", status: "Rejected" },
      ],
    },
  ]);

  const [selectedLeave, setSelectedLeave] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter leave requests based on search query
  const filteredRequests = leaveRequests.filter((request) =>
    request.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApproval = (id, newStatus) => {
    setLeaveRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">HealthBuzz</h2>
        <nav className="space-y-4">
          <NavLink
            to="/faculty-dashboard"
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-3 text-blue-600 font-semibold w-full text-left bg-blue-100"
                : "flex items-center space-x-3 text-blue-500 font-semibold w-full text-left"
            }
          >
            <FiHome className="text-lg" />
            <span>Faculty Dashboard</span>
          </NavLink>
          <NavLink
            to="/faculty-leaves"
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-3 text-blue-600 font-semibold w-full text-left bg-blue-100"
                : "flex items-center space-x-3 text-gray-600 hover:text-blue-500"
            }
          >
            <FiCheckCircle className="text-lg" />
            <span>Leave Requests</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-4">Leave Requests</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by student name or status..."
          className="mb-6 p-3 border rounded-lg w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {!selectedLeave ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Pending Requests</h3>
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="p-4 border rounded-lg shadow-md cursor-pointer hover:bg-blue-100 flex justify-between"
                  onClick={() => setSelectedLeave(request)}
                >
                  <div>
                    <h4 className="font-bold">{request.student}</h4>
                    <p className="text-gray-500">{request.reason}</p>
                    <p>Date: {request.date}</p>
                    <p>
                      Status: <span className={`ml-2 px-2 py-1 rounded text-sm ${request.status === "Pending" ? "bg-yellow-200 text-yellow-700" : "bg-green-200 text-green-700"}`}>{request.status}</span>
                    </p>
                  </div>
                  {request.status === "Pending" && (
                    <div className="flex space-x-2">
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApproval(request.id, "Approved");
                        }}
                      >
                        Approve
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApproval(request.id, "Rejected");
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <button className="text-blue-500 mb-4" onClick={() => setSelectedLeave(null)}>← Back</button>
            <h3 className="text-xl font-semibold mb-4">{selectedLeave.student}'s Leave History</h3>
            <p>Recent Request: {selectedLeave.reason} on {selectedLeave.date}</p>
            <p>
              Status: <span className={`px-2 py-1 rounded ${selectedLeave.status === "Pending" ? "bg-yellow-200 text-yellow-700" : "bg-green-200 text-green-700"}`}>{selectedLeave.status}</span>
            </p>
            <h4 className="mt-4 font-bold">Past Leave Records (Last 1 Month)</h4>
            <ul className="mt-2 space-y-2">
              {selectedLeave.history.map((entry, index) => (
                <li key={index} className="p-2 border rounded-lg shadow-sm">
                  {entry.date} - <span className={`px-2 py-1 rounded ${entry.status === "Rejected" ? "bg-red-200 text-red-700" : "bg-green-200 text-green-700"}`}>{entry.status}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default FacultyLeaves;
