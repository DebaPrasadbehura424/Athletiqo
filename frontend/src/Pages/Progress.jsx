import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import TrackCal from "../Components/TrackCal";
import GoalsCard from "../Components/GoalCard";
import Footer from "../Components/Footer";
import axios from "axios";
import Cookies from "universal-cookie";
import { userContextData } from "../context/UserContext";

function Progress(props) {
  const cookies = new Cookies();
  const token = cookies.get("token");

  const { userData, setUserData } = useContext(userContextData);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/profileUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
  }, [token]);

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
