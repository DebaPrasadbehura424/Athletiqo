import React, { useState } from "react";
import therapy from "../images/therapy.png";
import {
  FaDumbbell,
  FaBrain,
  FaMicrophone,
  FaBed,
  FaWalking,
} from "react-icons/fa";

function TrackStart() {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="flex justify-center gap-3 items-center bg-gray-100 p-6 relative ">
      <div
        className={`flip-card w-full max-w-md relative bg-white p-6 rounded-lg shadow-lg overflow-hidden`}
      >
        <div>
          {!flipped ? (
            <div className="flex flex-col items-center">
              <img src={therapy} alt="therapy" className="w-full" />
              <div className="flex justify-center mt-10">
                <button
                  onClick={handleClick}
                  className="bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                >
                  Start Now
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 p-4 opacity-0 fade-in ">
              <Option icon={<FaDumbbell />} text="Fitness" />
              <Option icon={<FaBrain />} text="Mind Relaxation" />
              <Option icon={<FaMicrophone />} text="Vocal Exercise" />
              <Option icon={<FaWalking />} text="Weight Loss" />
              <Option icon={<FaBed />} text="Sleep Training" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const Option = ({ icon, text }) => (
  <div className="flex justify-between items-center bg-gray-200 p-4 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
    <div className="flex items-center gap-3">
      {icon}
      <span>{text}</span>
    </div>
    <button className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-700 transition duration-300">
      Visit
    </button>
  </div>
);

export default TrackStart;
