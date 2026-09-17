import { createContext, useContext, useState } from "react";
import api from "../utils/axios";

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const { data } = await api.get("/api/me");

      setUserData(data.user);

      return data.user;
    } catch (error) {
      console.error("Failed to fetch current user:", error);
      return null;
    }
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, fetchCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    console.error("useUser must be used inside UserProvider");
  }

  return context;
};
