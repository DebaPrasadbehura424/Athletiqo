import React, { createContext, useState } from "react";
export const userContextData = createContext(null);

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);
  return (
    <userContextData.Provider value={{ userData, setUserData }}>
      {children}
    </userContextData.Provider>
  );
}

export default UserContext;
