import React, { useContext } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { userContextData } from "../context/UserContext";
function GraphTrack(props) {
  const { userData } = useContext(userContextData);
  const { slot } = useParams();
  const arrays = userData.dailyPoints;

  const lineData = {
    labels: Array.from({ length: 30 }, (_, i) => (i + 1).toString()),
    datasets: [
      {
        label: `Monthly data of sleep${slot}`,
        data: arrays,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
      },
    ],
  };

  const barData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: `${slot}`,
        data: arrays,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        data: arrays,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#FF9F40",
          "#FFB6C1",
          "#8A2BE2",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#FF9F40",
          "#FFB6C1",
          "#8A2BE2",
        ],
      },
    ],
  };

  const [selectedOption, setSelectedOption] = useState("Weight Goals");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  return (
    <div className="p-2 md:p-8 bg-gray-100 w-full ">
      <div className="flex justify-end p-2">
        <select
          id="goal-selection"
          value={selectedOption}
          onChange={handleOptionChange}
          className="w-1/5 p-1 border rounded-lg"
        >
          <option value="Weight Goals">Weight Goals</option>
          <option value="Sleep Training">Sleep Training</option>
          <option value="Fitness Goals">Fitness Goals</option>
          <option value="Mind Relaxation">Mind Relaxation</option>
          <option value="Vocal Exercise">Vocal Exercise</option>
        </select>
      </div>
      <div className="w-full h-96 flex justify-center items-center  shadow-xl p-6 bg-white rounded-lg mb-4 md:mb-0">
        <Line data={lineData} options={{ responsive: true }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 md:mt-6">
        <div className="w-full shadow-lg h-96 p-6 bg-white rounded-lg">
          <Bar data={barData} />
        </div>

        <div className="w-full flex justify-center items-center shadow-lg h-96 p-6 bg-white rounded-lg">
          <Doughnut data={pieData} />
        </div>
      </div>
    </div>
  );
}

export default GraphTrack;
