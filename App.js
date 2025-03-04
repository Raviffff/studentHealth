import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import FacultyDashboard from "./components/FacultyDashboard";
import MealPlan from "./components/MealPlan";
import Medicines from "./components/Medicines";
import LeaveRequest from "./components/LeaveRequest";
import HealthReports from "./components/HealthReports";
import FacultyLeaves from "./components/FacultyLeaves";
import Login from "./components/Login";
import SignupStudent from "./components/SignupStudent";
import SignupFaculty from "./components/SignupFaculty";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <div className="font-sans">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
          <Route path="/meal-plan" element={<MealPlan />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/leave-request" element={<LeaveRequest />} /> {/* ✅ Fixed route */}
          <Route path="/health-reports" element={<HealthReports />} />
          <Route path="/faculty-leaves" element={<FacultyLeaves />} />
          <Route path="/signup-student" element={<SignupStudent />} />
          <Route path="/signup-faculty" element={<SignupFaculty />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
