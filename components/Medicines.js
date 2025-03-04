import React, { useState } from "react";
import { Link } from "react-router-dom";

const Medicines = () => {
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      time: "Morning",
      name: "Vitamin D - 1000 IU",
      description: "Morning, with breakfast",
      note: "Take with food for better absorption",
      taken: false,
    },
    {
      id: 2,
      time: "Evening",
      name: "Iron Supplement - 65 mg",
      description: "Evening, after dinner",
      note: "Avoid taking with dairy products or caffeine",
      taken: false,
    },
    {
      id: 3,
      time: "Night",
      name: "Melatonin - 3 mg",
      description: "30 minutes before bedtime",
      note: "Take only when having difficulty falling asleep",
      taken: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    time: "",
    name: "",
    description: "",
    note: "",
  });

  const toggleTaken = (id) => {
    setMedicines((prev) =>
      prev.map((med) => (med.id === id ? { ...med, taken: !med.taken } : med))
    );
  };

  const handleAddMedicine = (e) => {
    e.preventDefault();
    if (!newMedicine.time || !newMedicine.name || !newMedicine.description) {
      alert("Please fill all required fields.");
      return;
    }

    const newMed = {
      id: medicines.length + 1,
      ...newMedicine,
      taken: false,
    };

    setMedicines([...medicines, newMed]);
    setShowForm(false);
    setNewMedicine({ time: "", name: "", description: "", note: "" });
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
          <Link to="/medicines" className="block py-3 px-4 bg-blue-500 text-white rounded-lg">
            💊 Medicines
          </Link>
          <Link to="/leave-request" className="block py-3 px-4 bg-gray-200 rounded-lg hover:bg-blue-500 hover:text-white">
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
            <h1 className="text-3xl font-bold">💊 Medicine Reminder</h1>
            <p className="text-gray-600">Track your medications and stay on schedule</p>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
            onClick={() => setShowForm(true)}
          >
            + Add Medicine
          </button>
        </div>

        {/* Medicine Cards */}
        <div className="grid grid-cols-2 gap-6">
          {medicines.map((med) => (
            <div key={med.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={med.taken}
                  onChange={() => toggleTaken(med.id)}
                  className="w-5 h-5 text-blue-600 cursor-pointer"
                />
                <h2 className="text-lg font-semibold">
                  {med.time} Medications
                </h2>
              </div>
              <p className={`mt-2 text-gray-800 ${med.taken ? "line-through text-gray-500" : ""}`}>
                {med.name}
              </p>
              <p className="text-sm text-gray-600">{med.description}</p>
              <p className="text-xs text-gray-500 italic">{med.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Medicine Form (Modal) */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add New Medicine</h2>
            <form onSubmit={handleAddMedicine}>
              <div className="mb-3">
                <label className="block text-gray-700">Time of Day</label>
                <select
                  value={newMedicine.time}
                  onChange={(e) => setNewMedicine({ ...newMedicine, time: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select Time</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                  <option value="Night">Night</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block text-gray-700">Medicine Name</label>
                <input
                  type="text"
                  value={newMedicine.name}
                  onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700">Description</label>
                <input
                  type="text"
                  value={newMedicine.description}
                  onChange={(e) => setNewMedicine({ ...newMedicine, description: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700">Additional Notes</label>
                <input
                  type="text"
                  value={newMedicine.note}
                  onChange={(e) => setNewMedicine({ ...newMedicine, note: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Add Medicine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Medicines;
