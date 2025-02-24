import React, { useState, useContext, useEffect } from "react";
import { GiWaterBottle } from "react-icons/gi";
import { userContextData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { FaWeight, FaBed, FaWalking } from "react-icons/fa";
import { FcInternal, FcSearch } from "react-icons/fc";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import axios from "axios";

const GoalsCard = () => {
  const { userData, setUserData } = useContext(userContextData);
  const navigate = useNavigate(null);
  const cookie = new Cookies();
  const userId = cookie.get("userId");

  const [currentWeight, setCurrentWeight] = useState(
    userData?.currentWeight || 1
  );
  const [gainWeight, setGainWeight] = useState(userData?.targetWeight || 1);
  const [weightPerDay, setWeightPerDay] = useState(1);

  const [sleepTime, setSleepTime] = useState(userData?.sleepGoalOneDay || 1);
  const currentSleepGoal = userData?.sleepGoal || 1;

  const [glassCount, setGlassCount] = useState(userData?.waterGoalOneDay || 1);
  const currentGlassGoal = userData?.waterGoal || 1;

  const [pageCount, setPageCount] = useState(userData?.readingGoalOneDay || 1);
  const currentPageGoal = userData?.readingGoal || 1;

  const [stepCount, setStepCount] = useState(userData?.walkingGoalOneDay || 1);
  const currentStepGoal = userData?.walkingGoal || 1;

  useEffect(() => {
    if (userData) {
      setCurrentWeight(userData.currentWeight);
      setGainWeight(userData.targetWeight);
      const dailyWeightChange =
        (userData.targetWeight - userData.currentWeight) / 30;
      setWeightPerDay(dailyWeightChange.toFixed(2));
    }
  }, [userData]);

  const updateGoalProgress = async (
    goalCurrentValue,
    goalMaxValue,
    setGoalValue,
    goalName,
    goalUpdate
  ) => {
    if (goalCurrentValue < goalMaxValue) {
      setGoalValue(goalCurrentValue + 1);
      try {
        const response = await axios.patch(
          `http://localhost:5000/goals/incrementGoal/${userId}`,
          {
            goalType: goalUpdate,
            amount: 1,
          }
        );

        const updatedGoal = response.data.userGoal;
        setGoalValue(updatedGoal[goalUpdate]);
      } catch (error) {
        console.error("Error updating goal progress:", error);
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Something went wrong while updating the goal.",
        });
      }
    }
    if (goalCurrentValue === goalMaxValue - 1) {
      Swal.fire({
        icon: "success",
        title: `Today ${goalName} is complete`,
        text: "Congratulations, you gain 5 points",
      });
    }
  };

  const goals = [
    {
      id: 1,
      name: "Weight Goal",
      icon: <FaWeight className="text-pink-500 text-4xl" />,
      description: `from ${currentWeight} to ${gainWeight} kg in 30 days per day ${weightPerDay} kg`,
      type: "search",
    },
    {
      id: 2,
      name: "Sleep Goal",
      icon: <FaBed className="text-blue-500 text-4xl" />,
      description: `Sleep ${sleepTime}/${currentSleepGoal} hours per day`,
      type: "internal",
    },
    {
      id: 3,
      name: "Water Goal",
      icon: <GiWaterBottle className="text-blue-500 text-4xl" />,
      description: `Drink ${glassCount}/${currentGlassGoal} glasses of water a day`,
      type: "internal",
    },
    {
      id: 4,
      name: "Reading Goal",
      icon: <FcSearch className="text-red-500 text-4xl" />,
      description: `Read ${pageCount}/${currentPageGoal} pages per day`,
      type: "internal",
    },
    {
      id: 5,
      name: "Meditation Goal",
      icon: <FcSearch className="text-purple-500 text-4xl" />,
      description: "Meditate for 30 minutes per day",
      type: "search",
    },
    {
      id: 6,
      name: "Mind Relaxation Goal",
      icon: <FcSearch className="text-yellow-500 text-4xl" />,
      description: "Engage in mind relaxation exercises",
      type: "search",
    },
    {
      id: 7,
      name: "Vocal Exercise Goal",
      icon: <FcSearch className="text-pink-500 text-4xl" />,
      description: "Practice vocal exercises for 30 minutes",
      type: "search",
    },
    {
      id: 8,
      name: "Walking Goal",
      icon: <FaWalking className="text-green-500 text-4xl" />,
      description: `Walk ${stepCount}/${currentStepGoal} steps per day`,
      type: "internal",
    },
  ];

  const handleGoalClick = (goalName, index) => {
    let goalNameWithoutSpaces = goalName.replace(/\s+/g, "");
    switch (index) {
      case 0:
        navigate(`/yogaexcer/${goalNameWithoutSpaces.toLowerCase()}`);
        break;
      case 1:
        updateGoalProgress(
          sleepTime,
          currentSleepGoal,
          setSleepTime,
          goalName,
          "sleepGoalOneDay"
        );
        break;
      case 2:
        updateGoalProgress(
          glassCount,
          currentGlassGoal,
          setGlassCount,
          goalName,
          "waterGoalOneDay"
        );
        break;
      case 3:
        updateGoalProgress(
          pageCount,
          currentPageGoal,
          setPageCount,
          goalName,
          "readingGoalOneDay"
        );
        break;
      case 4:
        navigate(`/yogaexcer/${goalNameWithoutSpaces.toLowerCase()}`);
        break;
      case 5:
        navigate(`/yogaexcer/${goalNameWithoutSpaces.toLowerCase()}`);
        break;
      case 6:
        navigate(`/yogaexcer/${goalNameWithoutSpaces.toLowerCase()}`);
        break;
      case 7:
        updateGoalProgress(
          stepCount,
          currentStepGoal,
          setStepCount,
          goalName,
          "walkingGoalOneDay"
        );
        break;
      default:
        alert("There is no such type of goal you set");
        break;
    }
  };

  return (
    <div className="p-15 mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {goals.map((goal, index) => (
          <div
            key={goal.id}
            className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4"
          >
            {goal.icon}
            <div>
              <h3 className="text-sm font-semibold text-gray-800">
                {goal.name}
              </h3>
              <p className="text-sm text-gray-600">{goal.description}</p>
            </div>

            <button
              className="text-4xl text-blue-500 cursor-pointer ml-auto"
              onClick={() => handleGoalClick(goal.name, index)}
            >
              {goal.type === "internal" ? (
                <FcInternal className="text-2xl rotate-180" />
              ) : (
                <FcSearch className="text-2xl" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsCard;
