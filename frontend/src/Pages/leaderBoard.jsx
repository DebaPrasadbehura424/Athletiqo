import React from "react";
import { FaTrophy, FaMedal, FaShieldAlt } from "react-icons/fa"; // Importing icons for top 3 ranks
import Navbar from "../Components/Navbar";

// Random names and points
const names = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eve",
  "Frank",
  "Grace",
  "Hannah",
  "Ivy",
  "Jack",
];

const getRandomPoints = () => Math.floor(Math.random() * 1000) + 1;

const Leaderboard = () => {
  // Create 10 random leaderboard entries
  const leaderboardData = names.map((name, index) => ({
    rank: index + 1,
    profile: `https://randomuser.me/api/portraits/men/${index + 10}.jpg`, // Random image for profile
    name,
    points: getRandomPoints(),
  }));

  return (
    <div className="container mx-auto p-6">
      <Navbar />

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full table-auto bg-white text-black">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-6 py-4 text-left">Rank</th>
              <th className="px-6 py-4 text-left">Profile</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.sort().map((entry, index) => (
              <tr
                key={entry.rank}
                className={
                  index === 0
                    ? "bg-blue-500 text-white"
                    : index === 1
                    ? "bg-green-500 text-white"
                    : index === 2
                    ? "bg-yellow-500 text-white"
                    : index % 5 === 0
                    ? "bg-pink-500 text-white"
                    : index % 5 === 1
                    ? "bg-purple-500 text-white"
                    : index % 5 === 2
                    ? "bg-teal-500 text-white"
                    : index % 5 === 3
                    ? "bg-indigo-500 text-white"
                    : "bg-red-500 text-white"
                }
              >
                <td className="px-6 py-6">{entry.rank}</td>
                <td className="px-6 py-6">
                  <img
                    src={entry.profile}
                    alt={entry.name}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td className="px-6 py-6 font-semibold">
                  {entry.rank === 1 && (
                    <FaTrophy className="inline text-yellow-500 mr-2" />
                  )}
                  {entry.rank === 2 && (
                    <FaMedal className="inline text-gray-500 mr-2" />
                  )}
                  {entry.rank === 3 && (
                    <FaShieldAlt className="inline text-amber-700 mr-2" />
                  )}
                  {entry.name}
                </td>
                <td className="px-6 py-6">{entry.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
