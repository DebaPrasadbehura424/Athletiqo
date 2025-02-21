import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
function HomeProtector({ children }) {
  const naviagate = useNavigate(null);

  const cookies = new Cookies();
  const token = cookies.get("token");
  console.log(token);

  useEffect(() => {
    if (token != null) {
      naviagate("/progress");
    }
  }, []);
  return <>{children}</>;
}

export default HomeProtector;
