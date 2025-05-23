import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import TrackCal from "../Components/TrackCal";
import GoalsCard from "../Components/GoalCard";
import Footer from "../Components/Footer";
import axios from "axios";
import { userContextData } from "../context/UserContext";

function Progress(props) {
  const goalId = sessionStorage.getItem("goalId");

  const { userData, setUserData } = useContext(userContextData);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/goals/getUserdetails/${goalId}`)
      .then((response) => {
        if (response.status === 200) {
          setUserData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [goalId]);

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <TrackCal />
        <div className="text-center p-8">Loading...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <TrackCal />
      <GoalsCard />
      <Footer />
    </div>
  );
}

export default Progress;
