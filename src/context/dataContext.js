import { createContext, useContext, useState } from "react";

const MyContext = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const value = {
    token,
    saveToken,
    logout
  };

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useDataContext يجب أن يستخدم داخل DataProvider");
  }
  return context;
};
