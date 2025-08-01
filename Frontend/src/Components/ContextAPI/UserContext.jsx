import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserContextWrapper = ({ children }) => {
  const [userData, setUserData] = useState(null);
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
export default UserContextWrapper;
