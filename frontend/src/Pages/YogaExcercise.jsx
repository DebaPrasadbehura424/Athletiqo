import React, { useState } from "react";

function YogaExcercise(props) {
  const [activeTab, setActiveTab] = useState("Yoga");

  const yogaItems = [
    {
      name: "Downward Dog",
      description: "A yoga pose to stretch the body",
      duration: "Hold for 30 seconds",
      image: "https://www.yogajournal.com/.image/t_share/MTQ2MTgwNjA3NjAzMTExMzQ1/downward-dog-pose.jpg", // Real image URL
    },
    {
      name: "Tree Pose",
      description: "A balance pose to strengthen the legs",
      duration: "Hold for 30 seconds",
      image: "https://www.yogajournal.com/.image/t_share/MTQ2MTgwNjA3NjAzMTExMzQ3/tree-pose.jpg", // Real image URL
    },
    {
      name: "Child's Pose",
      description: "A resting pose for relaxation",
      duration: "Hold for 1 minute",
      image: "https://www.yogajournal.com/.image/t_share/MTQ2MTgwNjA3NjAzMTExMzQ8/childs-pose.jpg", // Real image URL
    },
  ];

  const exerciseItems = [
    {
      name: "Push-ups",
      description: "A basic upper body exercise",
      repetitions: "Do 15 reps",
      image: "https://www.verywellfit.com/thmb/d4EDjsCIoZGpC_bV5ImRh_mrHjc=/4500x3000/filters:fill(FFDB5D,1)/push-ups-56c9c7e85f9b5855a3f8e8e5.jpg", // Real image URL
    },
    {
      name: "Squats",
      description: "A leg exercise to build strength",
      repetitions: "Do 20 reps",
      image: "https://www.verywellfit.com/thmb/xuGh2FSwmaFT7eVvhzTtsdHCycs=/3000x2000/filters:fill(FFDB5D,1)/squat-exercise-56c9c6c85f9b5855a3f8e8e2.jpg", // Real image URL
    },
    {
      name: "Planks",
      description: "Core strengthening exercise",
      repetitions: "Hold for 1 minute",
      image: "https://www.verywellfit.com/thmb/XHmbQmzZTqPzYr3KBG1AZDjaC8I=/4000x2667/filters:fill(FFDB5D,1)/plank-exercise-56c9c7745f9b5855a3f8e8df.jpg", // Real image URL
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-8">
        <div className="bg-gray-300 h-56 flex justify-center items-center text-xl font-bold">
          <p>Video/Audio/Images Section</p>
        </div>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("Yoga")}
          className={`py-2 px-4 rounded-md text-white transition-colors ${
            activeTab === "Yoga" ? "bg-blue-500" : "bg-gray-500"
          }`}
        >
          Yoga
        </button>
        <button
          onClick={() => setActiveTab("Exercise")}
          className={`py-2 px-4 rounded-md text-white transition-colors ${
            activeTab === "Exercise" ? "bg-blue-500" : "bg-gray-500"
          }`}
        >
          Exercise
        </button>
      </div>

      <div className="transition-all">
        {activeTab === "Yoga" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {yogaItems.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-md shadow-md hover:scale-105 transition-all flex"
              >
                <div className="w-2/3 pr-4">
                  <h3 className="text-xl font-semibold text-blue-600">
                    {item.name}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-gray-500">{item.duration}</p>
                </div>
                <div className="w-1/3 pl-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {exerciseItems.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-md shadow-md hover:scale-105 transition-all flex"
              >
                <div className="w-2/3 pr-4">
                  <h3 className="text-xl font-semibold text-green-600">
                    {item.name}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-gray-500">{item.repetitions}</p>
                </div>
                <div className="w-1/3 pl-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default YogaExcercise;
