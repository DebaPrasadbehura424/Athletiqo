import React, { useState, useContext, useEffect } from "react";
import { GiWaterBottle } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { userContextData } from "../context/UserContext";
import {
  FaWeight,
  FaDumbbell,
  FaBed,
  FaBrain,
  FaMicrophone,
  FaWalking,
} from "react-icons/fa";
import { FcSearch, FcInternal } from "react-icons/fc";

const GoalsCard = () => {
  const { userData, setUserData } = useContext(userContextData);

  const [currentWeight, setCurrentWeight] = useState(
    userData?.user?.currentWeight || 0
  );
  const [gainWeight, setGainWeight] = useState(userData?.gainWeight || 0);
  const [weightPerDay, setWeightPerDay] = useState(userData?.weightPerDay || 0);

  useEffect(() => {
    if (userData) {
      setCurrentWeight(userData.user.currentWeight);
      setGainWeight(userData.user.targetWeight);
      const perday =
        (userData.user.targetWeight - userData.user.currentWeight) / 30;

      setWeightPerDay(perday.toFixed(2));
    }
  }, [userData]);

  const mergedGoals = [
    {
      id: 0,
      title: "Weight Goal",
      description: `from ${currentWeight} to  ${gainWeight} kg in 30 days`,
      detail: `${weightPerDay} kg/per day`,
      icon: <FaWeight className="text-pink-500 text-4xl" />,
    },
    {
      id: 1,
      title: "Sleep Goal",
      description: "Sleep 8 hours per day",
      icon: <FaBed className="text-blue-500 text-4xl" />,
    },
    {
      id: 2,
      title: "Water Goal",
      description: "Drink 10 glasses of water a day",
      icon: <GiWaterBottle className="text-blue-500 text-4xl" />,
    },
    {
      id: 101,
      title: "Reading Goal",
      description: "Read 20 pages per day",
      icon: <FcInternal className="text-red-500 text-4xl" />,
    },
    {
      id: 201,
      title: "Meditation Goal",
      description: "Meditate for 30 minutes per day",
      icon: <FcInternal className="text-purple-500 text-4xl" />,
    },
    {
      id: 301,
      title: "Fitness Goal",
      description: "Workout regularly to stay fit",
      icon: <FaDumbbell className="text-orange-500 text-4xl" />,
    },
    {
      id: 302,
      title: "Mind Relaxation Goal",
      description: "Engage in mind relaxation exercises",
      icon: <FaBrain className="text-yellow-500 text-4xl" />,
    },
    {
      id: 303,
      title: "Vocal Exercise Goal",
      description: "Practice vocal exercises for 30 minutes",
      icon: <FaMicrophone className="text-pink-500 text-4xl" />,
    },
    {
      id: 304,
      title: "Walking  Goal",
      description: "Work towards ",
      icon: <FaWalking className="text-green-500 text-4xl" />,
    },
  ];

  return (
    <div className="p-15 mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mergedGoals.map((goal) => (
          <div
            key={goal.id}
            className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4"
          >
            {goal.icon}
            <div>
              <h3 className="text-sm font-semibold text-gray-800">
                {goal.title}
              </h3>
              <p className="text-sm text-gray-600">{goal.description}</p>
              {goal.detail && (
                <p className="text-sm text-gray-600">{goal.detail}</p>
              )}
            </div>
            <button className="text-4xl text-blue-500 cursor-pointer ml-auto">
              <NavLink to={`/yogaexcer/${goal.title}`}>
                <FcSearch />
              </NavLink>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsCard;
