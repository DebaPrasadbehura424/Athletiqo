import React, { createContext, useEffect, useState } from "react";

export const userContextData = createContext(null);

const UserContext = ({ children }) => {
  const url = "https://athletiqo-backend.vercel.app"; 
  const [addProduct, setAddProduct] = useState([]);
  const [userData, setUserData] = useState([]);

  return (
    <userContextData.Provider
      value={{
        setAddProduct,
        setUserData,
        userData,
      }}
    >
      {children}
    </userContextData.Provider>
  );
};

export default UserContext;
