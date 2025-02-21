import React, { useEffect, useState } from "react";
import night from "../images/pen.gif";
// import axios from "axios";
import { FcApproval } from "react-icons/fc";
import { FcPlus } from "react-icons/fc";
import Navbar from "../Components/Navbar";

function Plans(props) {
  const [plans, setPlans] = useState(null);
  const [planDescription, setPlanDescription] = useState("");
  const userId = 2;

  const addPlans = async () => {};

  const handleDeletePlan = async (planId) => {};

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen flex flex-col items-center">
        <div className="container mx-auto p-8 space-y-8">
          <div className="flex items-center justify-center space-x-2">
            <input
              type="text"
              value={planDescription}
              onChange={(e) => setPlanDescription(e.target.value)}
              placeholder="Enter your plan"
              className="px-5 py-3 border-2 border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-600 w-72 sm:w-96"
            />
            <button onClick={addPlans}>
              <FcPlus size={26} />
            </button>
          </div>

          {plans === null || plans.length == 0 ? (
            <div className="flex justify-center items-center mt-30">
              <img src={night} alt="No plans" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan, index) => (
                <div
                  id={plan.planId}
                  key={index}
                  className="bg-white shadow-lg rounded-lg p-6 transition-all duration-300 ease-in-out hover:scale-105 w-full h-40 relative border border-gray-300"
                >
                  <p className="text-gray-800 text-md mb-4">
                    {plan.planDescription}
                  </p>

                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={() => handleDeletePlan(plan.planId)}
                      className="text-red-600 hover:text-red-800 transition-all duration-200"
                    >
                      <FcApproval size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Plans;
