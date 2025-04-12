import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function HomeProtector({ children }) {
  const naviagate = useNavigate(null);

  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (token != null && userId != null) {
      naviagate("/progress");
    }
  }, []);
  return <>{children}</>;
}

export default HomeProtector;
