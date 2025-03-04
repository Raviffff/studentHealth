import React, { useState } from "react";
import { Link } from "react-router-dom";

const MealPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState("veg");

  const mealData = {
    veg: [
      {
        day: "Monday",
        meals: {
          Breakfast: "Oats with fruits & almonds",
          Lunch: "Vegetable Curry with Brown Rice",
          Snacks: "Mixed Nuts & Yogurt",
          Dinner: "Lentil Soup with Whole Wheat Roti",
        },
      },
      {
        day: "Tuesday",
        meals: {
          Breakfast: "Sprouts Salad & Green Tea",
          Lunch: "Spinach Dal with Brown Rice",
          Snacks: "Fruit Salad with Honey",
          Dinner: "Paneer Bhurji with Roti",
        },
      },
      {
        day: "Wednesday",
        meals: {
          Breakfast: "Banana Smoothie & Whole Grain Toast",
          Lunch: "Rajma with Jeera Rice",
          Snacks: "Roasted Chickpeas",
          Dinner: "Mixed Veg Soup with Khichdi",
        },
      },
      {
        day: "Thursday",
        meals: {
          Breakfast: "Methi Paratha with Curd",
          Lunch: "Chickpea Salad & Vegetable Stir Fry",
          Snacks: "Carrot & Cucumber Sticks with Hummus",
          Dinner: "Dal Tadka with Roti",
        },
      },
      {
        day: "Friday",
        meals: {
          Breakfast: "Poha with Peanuts & Lemon",
          Lunch: "Vegetable Pulao with Raita",
          Snacks: "Handful of Walnuts & Herbal Tea",
          Dinner: "Stuffed Capsicum with Multigrain Roti",
        },
      },
      {
        day: "Saturday",
        meals: {
          Breakfast: "Dhokla with Mint Chutney",
          Lunch: "Soya Chunk Curry with Rice",
          Snacks: "Masala Buttermilk",
          Dinner: "Baingan Bharta with Roti",
        },
      },
      {
        day: "Sunday",
        meals: {
          Breakfast: "Chia Pudding with Nuts",
          Lunch: "Matar Paneer with Brown Rice",
          Snacks: "Baked Sweet Potato Fries",
          Dinner: "Khichdi with Kadhi",
        },
      },
    ],
    nonVeg: [
      {
        day: "Monday",
        meals: {
          Breakfast: "Boiled Eggs with Brown Bread",
          Lunch: "Grilled Chicken with Quinoa",
          Snacks: "Greek Yogurt with Berries",
          Dinner: "Fish Curry with Rice",
        },
      },
      {
        day: "Tuesday",
        meals: {
          Breakfast: "Omelet with Whole Wheat Toast",
          Lunch: "Chicken Biryani with Raita",
          Snacks: "Roasted Peanuts",
          Dinner: "Lemon Garlic Fish with Vegetables",
        },
      },
      {
        day: "Wednesday",
        meals: {
          Breakfast: "Scrambled Eggs with Avocado Toast",
          Lunch: "Mutton Curry with Brown Rice",
          Snacks: "Protein Bar",
          Dinner: "Tandoori Chicken with Stir-fried Veggies",
        },
      },
      {
        day: "Thursday",
        meals: {
          Breakfast: "Chicken Sausages with Toast",
          Lunch: "Egg Curry with Chapati",
          Snacks: "Handful of Almonds & Herbal Tea",
          Dinner: "Grilled Fish with Sweet Potato",
        },
      },
      {
        day: "Friday",
        meals: {
          Breakfast: "Salmon Omelet with Whole Wheat Bread",
          Lunch: "Chicken Soup & Salad",
          Snacks: "Boiled Chickpeas with Lemon",
          Dinner: "Baked Chicken with Roasted Veggies",
        },
      },
      {
        day: "Saturday",
        meals: {
          Breakfast: "Paneer-Egg Bhurji with Toast",
          Lunch: "Grilled Prawns with Brown Rice",
          Snacks: "Banana Shake",
          Dinner: "Mutton Keema with Chapati",
        },
      },
      {
        day: "Sunday",
        meals: {
          Breakfast: "Omelet with Spinach & Cheese",
          Lunch: "Fish Fry with Vegetable Pulao",
          Snacks: "Homemade Protein Smoothie",
          Dinner: "Grilled Chicken with Quinoa Salad",
        },
      },
    ],
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
          <Link to="/meal-plan" className="block py-3 px-4 bg-blue-500 text-white rounded-lg">
            🍽 Meal Plan
          </Link>
          <Link to="/medicines" className="block py-3 px-4 bg-gray-200 rounded-lg hover:bg-blue-500 hover:text-white">
            💊 Medicines
          </Link>
          {/* ✅ Fixed Link to Leave Request */}
          <Link to="/leave-request" className="block py-3 px-4 bg-gray-200 rounded-lg hover:bg-blue-500 hover:text-white">
            📝 Leave
          </Link>
        </nav>
        <p className="mt-auto text-sm text-gray-500 italic">
          "Healthy food fuels a healthy mind and body."
        </p>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-8 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">🍽 Meal Plan</h1>
            <p className="text-gray-600">Personalized meals based on your health</p>
          </div>
        </div>

        {/* Meal Plan Type Toggle */}
        <div className="mb-6 flex gap-4">
          <button
            className={`px-5 py-2 text-lg font-semibold rounded-lg ${
              selectedPlan === "veg" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedPlan("veg")}
          >
            🌱 Vegetarian
          </button>
          <button
            className={`px-5 py-2 text-lg font-semibold rounded-lg ${
              selectedPlan === "nonVeg" ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedPlan("nonVeg")}
          >
            🍗 Non-Vegetarian
          </button>
        </div>

        {/* Meal Plan Table */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4 text-lg font-semibold">Day</th>
                <th className="p-4 text-lg font-semibold">Breakfast</th>
                <th className="p-4 text-lg font-semibold">Lunch</th>
                <th className="p-4 text-lg font-semibold">Snacks</th>
                <th className="p-4 text-lg font-semibold">Dinner</th>
              </tr>
            </thead>
            <tbody>
              {mealData[selectedPlan].map((meal, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4 font-medium">{meal.day}</td>
                  <td className="p-4">{meal.meals.Breakfast}</td>
                  <td className="p-4">{meal.meals.Lunch}</td>
                  <td className="p-4">{meal.meals.Snacks}</td>
                  <td className="p-4">{meal.meals.Dinner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MealPlan;
