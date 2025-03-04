import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiCheckCircle } from "react-icons/fi";

const FacultyDashboard = () => {
  const [students] = useState([
    { id: 1, name: "John Smith", age: 20, bmi: 22.5, sleep: "7 hours", conditions: ["Mild Anxiety", "Seasonal Allergies"], updated: "2023-09-15" },
    { id: 2, name: "Emily Johnson", age: 19, bmi: 19.2, sleep: "6 hours", conditions: ["Iron Deficiency", "Stress"], updated: "2023-09-20" },
    { id: 3, name: "Michael Chen", age: 21, bmi: 24.8, sleep: "5.5 hours", conditions: ["Mild Hypertension", "Insomnia"], updated: "2023-09-18" },
  ]);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [motivationalQuotes] = useState([
    "Education is the most powerful weapon which you can use to change the world.",
    "The art of teaching is the art of assisting discovery.",
    "A good teacher can inspire hope, ignite the imagination, and instill a love of learning.",
    "Teachers affect eternity; no one can tell where their influence stops.",
    "Teaching is the one profession that creates all other professions.",
    "It is the supreme art of the teacher to awaken joy in creative expression and knowledge."
  ]);

  const [currentQuote, setCurrentQuote] = useState(0);

  // Rotate motivational quotes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [motivationalQuotes.length]);

  // Filter students based on search query
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
        <div>
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
        </div>

        {/* Inspirational Quotes Section for Faculty */}
        <div className="mt-auto bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-sm text-center font-semibold text-gray-600">Inspiration for Educators</p>
          <p className="text-center text-lg italic text-gray-800 mt-2">"{motivationalQuotes[currentQuote]}"</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-4">Faculty Dashboard</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by student name..."
          className="mb-6 p-3 border rounded-lg w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Show student list if no student is selected */}
        {!selectedStudent && (
          <div>
            {/* Student Health Reports Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Student Health Reports</h3>
              <div className="space-y-4">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className="p-4 border rounded-lg shadow cursor-pointer hover:bg-blue-100"
                    onClick={() => setSelectedStudent(student)}
                  >
                    <h4 className="font-bold">{student.name}</h4>
                    <p className="text-gray-500">Updated: {student.updated}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Show detailed student report when clicked */}
        {selectedStudent && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <button className="text-blue-500 mb-4" onClick={() => setSelectedStudent(null)}>← Back</button>
            <h3 className="text-xl font-semibold mb-4">{selectedStudent.name}'s Health Report</h3>
            <p>Age: {selectedStudent.age} years</p>
            <p>BMI: {selectedStudent.bmi}</p>
            <p>Sleep: {selectedStudent.sleep}</p>
            <p>Last Updated: {selectedStudent.updated}</p>
            <div className="mt-2">
              {selectedStudent.conditions.map((condition, index) => (
                <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm mr-2">
                  {condition}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default FacultyDashboard;
