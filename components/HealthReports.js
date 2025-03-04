import React from "react";
import { useNavigate } from "react-router-dom";

const HealthReports = () => {
  const navigate = useNavigate();

  const reports = [
    { date: "2023-09-15", bmi: 22.5, conditions: ["Mild Anxiety", "Seasonal Allergies"], sleep: 7 },
    { date: "2023-08-10", bmi: 22.1, conditions: ["Seasonal Allergies"], sleep: 7.5 },
    { date: "2023-07-05", bmi: 21.9, conditions: ["Mild Anxiety"], sleep: 6.8 },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">John Smith's Health Reports</h1>
      <p className="text-gray-500">History of health reports</p>

      <div className="mt-6">
        {reports.map((report, index) => (
          <div key={index} className="border p-4 rounded-lg mb-3 shadow-sm">
            <p className="text-gray-700"><strong>Date:</strong> {report.date}</p>
            <p className="text-gray-700"><strong>BMI:</strong> {report.bmi}</p>
            <p className="text-gray-700"><strong>Sleep Hours:</strong> {report.sleep}</p>
            <p className="text-gray-700">
              <strong>Conditions:</strong>{" "}
              {report.conditions.map((cond, i) => (
                <span key={i} className="bg-gray-200 px-2 py-1 text-sm rounded-full mr-2">
                  {cond}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>

      {/* ✅ Dynamic Back Navigation */}
      <button onClick={() => navigate(-1)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Back
      </button>
    </div>
  );
};

export default HealthReports;
