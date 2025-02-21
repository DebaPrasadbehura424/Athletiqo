import React, { useState } from "react";
import {
  FaUserCircle,
  FaBars,
  FaChartLine,
  FaInfoCircle,
  FaSignOutAlt,
  FaTachometerAlt,
  FaFire,
  FaTimes,  // Import the cross icon
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import GraphTrack from "./GraphTrack";
import Growth from "./Growth";

function DashBoard(props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("GraphTrack");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleComponentChange = (component) => {
    setActiveComponent(component);
    setIsDropdownOpen(false); // Close dropdown after selecting an option
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      <div className="w-1/5 bg-blue-500 p-6 text-white flex-col space-y-6 hidden md:flex">
        <div className="text-3xl font-bold text-center">FitYatra</div>
        <div className="space-y-4">
          <div className="flex flex-col space-y-3">
            <div
              className="flex items-center space-x-2 cursor-pointer hover:bg-blue-600 p-2 rounded-lg"
              onClick={() => handleComponentChange("GraphTrack")}
            >
              <FaUserCircle className="text-2xl" />
              <span>Profile</span>
            </div>

            {/* Growth (No link) */}
            <div
              className="flex items-center space-x-3 cursor-pointer hover:bg-blue-600 p-2 rounded-lg"
              onClick={() => handleComponentChange("Growth")}
            >
              <FaChartLine className="text-xl" />
              <p>Growth</p>
            </div>

            {/* Progress - NavLink */}
            <NavLink
              to="/progress"
              className={({ isActive }) =>
                isActive ? "flex items-center space-x-3 cursor-pointer hover:bg-blue-600 p-2 rounded-lg bg-blue-700" : "flex items-center space-x-3 cursor-pointer hover:bg-blue-600 p-2 rounded-lg"
              }
            >
              <FaTachometerAlt className="text-xl" />
              <p>Progress</p>
            </NavLink>

            {/* Leaderboard - NavLink */}
            <NavLink
              to="/leaderboard"
              className={({ isActive }) =>
                isActive ? "flex items-center space-x-3 cursor-pointer hover:bg-blue-600 p-2 rounded-lg bg-blue-700" : "flex items-center space-x-3 cursor-pointer hover:bg-blue-600 p-2 rounded-lg"
              }
            >
              <FaFire className="text-xl" />
              <p>Leaderboard</p>
            </NavLink>

            {/* Information (No link) */}
            <div className="flex items-center space-x-3 cursor-pointer hover:bg-blue-600 p-2 rounded-lg">
              <FaInfoCircle className="text-xl" />
              <p>Information</p>
            </div>
          </div>
        </div>

        {/* Logout at the bottom */}
        <div className="mt-auto flex items-center space-x-2 cursor-pointer hover:bg-blue-600 p-2 rounded-lg">
          <FaSignOutAlt className="text-xl" />
          <span>Logout</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col items-center overflow-y-auto w-full md:w-4/5">
        <div className="w-full bg-white shadow-md p-3 md:flex justify-end items-center relative">
          <div className="md:hidden absolute right-3 top-3">
            <button onClick={toggleDropdown} className="text-xl text-blue-600">
              {/* Show Cross Icon when dropdown is open, else Hamburger Icon */}
              {isDropdownOpen ? <FaTimes /> : <FaBars />}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-blue-600 text-white rounded-lg shadow-xl z-10 transition-all">
                <div className="py-2">
                  <div
                    className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out"
                    onClick={() => handleComponentChange("GraphTrack")}
                  >
                    <FaUserCircle className="inline-block mr-2" />
                    Profile
                  </div>
                  <div
                    className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out"
                    onClick={() => handleComponentChange("Growth")}
                  >
                    <FaChartLine className="inline-block mr-2" />
                    Growth
                  </div>
                  <NavLink
                    to="/progress"
                    className={({ isActive }) =>
                      isActive ? "flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-blue-700 bg-blue-700 transition duration-300 ease-in-out" : "flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out"
                    }
                  >
                    <FaTachometerAlt className="inline-block mr-2" />
                    Progress
                  </NavLink>
                  <NavLink
                    to="/leaderboard"
                    className={({ isActive }) =>
                      isActive ? "flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-blue-700 bg-blue-700 transition duration-300 ease-in-out" : "flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out"
                    }
                  >
                    <FaFire className="inline-block mr-2" />
                    Leaderboard
                  </NavLink>
                  <div className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out">
                    <FaInfoCircle className="inline-block mr-2" />
                    Information
                  </div>
                  <div className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out">
                    <FaSignOutAlt className="inline-block mr-2" />
                    Logout
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-10 h-10 rounded-[10px] bg-gray-300 flex justify-center items-center">
            <img
              src="/path-to-your-profile-pic.jpg"
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        <div className="w-full h-80">
          {activeComponent === "GraphTrack" && <GraphTrack />}
          {activeComponent === "Growth" && <Growth />}
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
