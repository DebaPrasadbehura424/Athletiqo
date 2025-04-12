import React from "react";
import { FaTrophy, FaMedal, FaShieldAlt } from "react-icons/fa";
import Navbar from "../Components/Navbar";

const names = [
  "Sophie",
  "Liam",
  "Emma",
  "Noah",
  "Olivia",
  "Mason",
  "Ava",
  "Ethan",
  "Isabella",
  "Lucas",
];

const Leaderboard = () => {
  const leaderboardData = names.map((name, index) => ({
    rank: index + 1,
    profile: `https://i.pravatar.cc/150?img=${index + 30}`,
    name,
    points: Math.floor(Math.random() * 2000) + 1000,
    achievements: Math.floor(Math.random() * 30) + 10,
    lastActive: new Date(
      Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-900 via-blue-900 to-blue-700 p-4 sm:p-6 md:p-8 font-sans">
      <Navbar />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-white mb-8 sm:mb-12 drop-shadow-2xl animate-fade-in">
          Cosmic Leaderboard
        </h1>
        <div className="grid gap-4 sm:gap-6 md:gap-8">
          {leaderboardData.map((entry, index) => (
            <div
              key={entry.rank}
              className={`relative flex items-center p-4 sm:p-6 rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] ${
                index === 0
                  ? "bg-gradient-to-r from-yellow-500 to-amber-600"
                  : index === 1
                  ? "bg-gradient-to-r from-gray-400 to-gray-600"
                  : index === 2
                  ? "bg-gradient-to-r from-amber-600 to-amber-800"
                  : index % 2 === 0
                  ? "bg-gradient-to-r from-blue-600 to-blue-800"
                  : "bg-gradient-to-r from-purple-600 to-purple-800"
              } text-white animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,transparent_70%)] rounded-2xl pointer-events-none"></div>
              <div className="flex items-center justify-center w-12 sm:w-16 text-xl sm:text-2xl font-bold gap-2 z-10">
                {entry.rank === 1 && <FaTrophy className="text-yellow-200" />}
                {entry.rank === 2 && <FaMedal className="text-gray-200" />}
                {entry.rank === 3 && <FaShieldAlt className="text-amber-300" />}
                <span>{entry.rank}</span>
              </div>
              <img
                src={entry.profile}
                alt={entry.name}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-white/80 mx-4 sm:mx-6 object-cover transition-transform duration-300 hover:scale-110 z-10"
              />
              <div className="flex-1 z-10">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
                  {entry.name}
                </h2>
                <p className="text-base sm:text-lg font-medium text-gray-100">
                  {entry.points} Points
                </p>
                <p className="text-sm sm:text-base text-gray-200">
                  Achievements: {entry.achievements}
                </p>
                <p className="text-sm sm:text-base text-gray-200">
                  Last Active: {entry.lastActive}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;