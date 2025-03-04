import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showReports, setShowReports] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [condition, setCondition] = useState("");

  // Initial Health Reports
  const [healthReports, setHealthReports] = useState([
    {
      id: 1,
      name: "John Smith",
      age: 20,
      bmi: 22.5,
      sleepHours: 7,
      updated: "2023-09-15",
      conditions: ["Mild Anxiety", "Seasonal Allergies"],
    },
  ]);

  // Function to calculate BMI
  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  };

  // Function to generate personalized recommendations
  const generateRecommendations = (bmi, conditions) => {
    let recommendations = [];
    if (bmi < 18.5) {
      recommendations.push("Consider eating nutrient-rich meals to gain healthy weight.");
    } else if (bmi > 25) {
      recommendations.push("Engage in regular physical activity and maintain a balanced diet.");
    } else {
      recommendations.push("Maintain your healthy lifestyle and stay active.");
    }
    if (conditions.includes("Mild Anxiety")) {
      recommendations.push("Try relaxation techniques such as meditation and deep breathing exercises.");
    }
    if (conditions.includes("Seasonal Allergies")) {
      recommendations.push("Avoid allergens and consider consulting a doctor for appropriate medications.");
    }
    return recommendations;
  };

  // Handle Form Submission
  const handleAddReport = (e) => {
    e.preventDefault();

    if (!weight || !height) {
      alert("Please enter both weight and height.");
      return;
    }

    const newBMI = calculateBMI(parseFloat(weight), parseFloat(height));
    const newReport = {
      id: healthReports.length + 1,
      name: "John Smith",
      age: 20,
      bmi: newBMI,
      sleepHours: 7,
      updated: new Date().toISOString().split("T")[0],
      conditions: condition ? [condition] : [],
    };

    setHealthReports([...healthReports, newReport]);
    setShowForm(false);
    setWeight("");
    setHeight("");
    setCondition("");
  };

  // Get latest BMI and conditions from last added report
  const latestReport = healthReports[healthReports.length - 1];
  const latestBMI = latestReport.bmi;
  const latestConditions = latestReport.conditions;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">💙 HealthBuzz</h2>
        <ul>
          <li className="p-3 bg-blue-100 text-blue-600 rounded-md mb-2 cursor-pointer" onClick={() => navigate("/dashboard")}>
            🏠 Dashboard
          </li>
          <li className="p-3 hover:bg-gray-200 rounded-md cursor-pointer" onClick={() => navigate("/meal-plan")}>
            📋 Meal Plan
          </li>
          <li className="p-3 hover:bg-gray-200 rounded-md cursor-pointer" onClick={() => navigate("/medicines")}>
            💊 Medicines
          </li>
          <li className="p-3 hover:bg-gray-200 rounded-md cursor-pointer" onClick={() => navigate("/leave-request")}>
            ✈️ Leave
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Health Dashboard</h1>
        <p className="text-gray-500">View and manage your health reports</p>

        {/* Health Reports Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Your Health Reports</h2>
          <div
            className="border p-4 mt-3 rounded-lg border-blue-500 cursor-pointer hover:bg-blue-50 transition flex justify-between items-center"
            onClick={() => setShowReports(!showReports)}
          >
            <div>
              <h3 className="text-lg font-semibold">{healthReports[0].name}</h3>
              <p className="text-sm text-gray-500">Click to {showReports ? "hide" : "view"} reports</p>
            </div>
            <button
              className="bg-blue-500 text-white px-3 py-2 rounded-md flex items-center"
              onClick={(e) => {
                e.stopPropagation();
                setShowForm(true);
              }}
            >
              <FaPlus className="mr-2" /> Add Report
            </button>
          </div>

          {/* Expanded Reports Section */}
          {showReports && (
            <div className="mt-3">
              {healthReports.map((report) => (
                <div key={report.id} className="border p-3 rounded-lg mt-2 bg-white shadow-sm">
                  <p className="text-sm text-gray-500">Updated: {report.updated}</p>
                  <div className="flex text-gray-700 mt-2">
                    <span className="mr-4">⚖️ BMI: {report.bmi}</span>
                    <span>🛌 {report.sleepHours} hours</span>
                  </div>
                  <div className="mt-2">
                    {report.conditions.length > 0 ? (
                      report.conditions.map((cond, i) => (
                        <span key={i} className="bg-gray-200 px-2 py-1 text-sm rounded-full mr-2">
                          {cond}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">No conditions reported</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Personalized Recommendations (Latest BMI) */}
        <div className="mt-6 p-4 bg-blue-100 rounded-lg border border-blue-400 shadow-md">
          <h2 className="text-lg font-semibold">Personalized Recommendations</h2>
          <p className="text-gray-700 text-sm">Based on your latest BMI: <strong>{latestBMI}</strong></p>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            {generateRecommendations(latestBMI, latestConditions).map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Add Report Form (Modal) */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add New Health Report</h2>
            <form onSubmit={handleAddReport}>
              <div className="mb-3">
                <label className="block text-gray-700">Weight (kg)</label>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full p-2 border rounded-md" required />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700">Height (cm)</label>
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full p-2 border rounded-md" required />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700">Condition (optional)</label>
                <input type="text" value={condition} onChange={(e) => setCondition(e.target.value)} className="w-full p-2 border rounded-md" />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2">Cancel</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
