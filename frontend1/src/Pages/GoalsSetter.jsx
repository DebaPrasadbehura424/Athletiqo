import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import userContextData from "../context/UserContext";

function GoalsSetter() {
  const context = useContext(userContextData);
  const userData = context?.userData;

  const goalId = sessionStorage.getItem("goalId");

  const [currentWeight, setCurrentWeight] = useState(
    userData?.currentWeight || 0
  );
  const [targetWeight, setTargetWeight] = useState(userData?.targetWeight || 0);
  const [sleepGoal, setSleepGoal] = useState(userData?.sleepGoal || 0);
  const [readingGoal, setReadingGoal] = useState(userData?.readingGoal || 0);
  const [waterGoal, setWaterGoal] = useState(userData?.waterGoal || 0);
  const [walkingGoal, setWalkingGoal] = useState(userData?.walkingGoal || 0);
  const [age, setAge] = useState(userData?.age || 0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const goalData = {
      currentWeight,
      targetWeight,
      sleepGoal,
      readingGoal,
      waterGoal,
      walkingGoal,
      age,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/goals/updateUserdetails/${goalId}`,
        goalData
      );

      Swal.fire({
        icon: "success",
        title: "Goals updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to update goals.",
        text: "Please try again later.",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Set Your Goals</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="currentWeight"
            className="block text-sm font-medium text-gray-700"
          >
            Current Weight
          </label>
          <input
            type="number"
            id="currentWeight"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="targetWeight"
            className="block text-sm font-medium text-gray-700"
          >
            Target Weight
          </label>
          <input
            type="number"
            id="targetWeight"
            value={targetWeight}
            onChange={(e) => setTargetWeight(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="sleepGoal"
            className="block text-sm font-medium text-gray-700"
          >
            Sleep Goal (hours)
          </label>
          <input
            type="number"
            id="sleepGoal"
            value={sleepGoal}
            onChange={(e) => setSleepGoal(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="readingGoal"
            className="block text-sm font-medium text-gray-700"
          >
            Reading Goal (pages)
          </label>
          <input
            type="number"
            id="readingGoal"
            value={readingGoal}
            onChange={(e) => setReadingGoal(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="waterGoal"
            className="block text-sm font-medium text-gray-700"
          >
            Water Goal (liters)
          </label>
          <input
            type="number"
            id="waterGoal"
            value={waterGoal}
            onChange={(e) => setWaterGoal(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="walkingGoal"
            className="block text-sm font-medium text-gray-700"
          >
            Walking Goal (steps)
          </label>
          <input
            type="number"
            id="walkingGoal"
            value={walkingGoal}
            onChange={(e) => setWalkingGoal(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Age
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 mt-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
        >
          Update Goals
        </button>
      </form>

      {message && <div className="mt-4 text-green-500">{message}</div>}
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
}

export default GoalsSetter;
