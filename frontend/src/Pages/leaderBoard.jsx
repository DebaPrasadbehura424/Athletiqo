import React from "react";
import { FaCrown, FaMedal, FaStar } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import Navbar from "../Components/Navbar";

const LeaderBoard = () => {
  const leaders = [
    {
      rank: 1,
      name: "John Doe",
      points: 1200,
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      rank: 2,
      name: "Jane Smith",
      points: 1100,
      profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      rank: 3,
      name: "Alex Brown",
      points: 1000,
      profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      rank: 4,
      name: "Maria Garcia",
      points: 950,
      profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      rank: 5,
      name: "David Lee",
      points: 900,
      profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="p-6 md:p-12 bg-gradient-to-br from-blue-800 to-blue-400 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8 text-white tracking-wide">
          Leadership Board
        </h1>

        {/* Leaderboard Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leaders.map((leader) => (
            <div
              key={leader.rank}
              className={`bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center transition-transform transform hover:scale-105 duration-300 ease-in-out ${
                leader.rank === 1
                  ? "border-4 border-yellow-400"
                  : leader.rank === 2
                  ? "border-4 border-gray-400"
                  : "border-4 border-blue-500"
              }`}
            >
              {/* Profile Image */}
              <img
                src={leader.profilePic}
                alt={`${leader.name}'s profile`}
                className="w-16 h-16 rounded-full object-cover mb-4 border-4 border-white shadow-md"
              />

              {/* Leader Info */}
              <div className="text-lg font-semibold text-gray-800">
                {leader.name}
              </div>
              <div className="text-base text-gray-600 mt-1">
                {leader.points} points
              </div>

              {/* Rank Icon */}
              <div className="mt-4">
                {leader.rank === 1 && (
                  <FaCrown className="text-yellow-400 text-3xl mx-auto" />
                )}
                {leader.rank === 2 && (
                  <FaMedal className="text-gray-300 text-3xl mx-auto" />
                )}
                {leader.rank === 3 && (
                  <FaStar className="text-blue-300 text-3xl mx-auto" />
                )}
                {leader.rank > 3 && (
                  <IoMdPerson className="text-gray-500 text-3xl mx-auto" />
                )}
                <div className="mt-2 text-xl font-bold text-gray-800">
                  #{leader.rank}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LeaderBoard;
