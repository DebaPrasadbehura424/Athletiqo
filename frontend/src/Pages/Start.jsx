import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Start = () => {
  return (
    <div className="relative h-screen bg-white">
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-10">
        <div className="text-black text-4xl font-extrabold italic">
          Athletiqo
        </div>
        <div>
          <NavLink to="/register">
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-full
             hover:bg-blue-600 transition duration-300 cursor-pointer"
            >
              Create Account
            </button>
          </NavLink>
        </div>
      </div>

      <div className="flex h-full">
        <div className="flex-1 p-8 flex flex-col justify-center space-y-6 text-black">
          <h1 className="text-6xl font-extrabold leading-tight"> Athletiqo</h1>
          <p className="text-xl text-gray-700 mt-2 leading-relaxed">
            Experience personal health care and yoga in one place. Our app is
            here to support your health journey.
          </p>
          <NavLink to="/login">
            <button
              className="  w-40 h-10 bg-blue-500 text-white rounded-full mt-6
             hover:bg-blue-600 transition 
             duration-300 cursor-pointer"
            >
              Already a user
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Start;
