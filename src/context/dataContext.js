import { createContext, useContext, useState } from "react";

const MyContext = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [displayName, setDisplayName] = useState(localStorage.getItem("displayName") || "");
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || "");
  const [userAvatar, setUserAvatar] = useState(localStorage.getItem("userAvatar") || "");

  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const saveDisplayName = (newDisplayName) => {
    setDisplayName(newDisplayName);
    localStorage.setItem("displayName", newDisplayName);
  };

  const saveUserRole = (newUserRole) => {
    const nextUserRole = newUserRole || "";
    setUserRole(nextUserRole);

    if (nextUserRole) {
      localStorage.setItem("userRole", nextUserRole);
      return;
    }

    localStorage.removeItem("userRole");
  };

  const saveUserAvatar = (newUserAvatar) => {
    const nextUserAvatar = newUserAvatar || "";
    setUserAvatar(nextUserAvatar);

    if (nextUserAvatar) {
      localStorage.setItem("userAvatar", nextUserAvatar);
      return;
    }

    localStorage.removeItem("userAvatar");
  };

  const logout = () => {
    setToken(null);
    setDisplayName("");
    setUserRole("");
    setUserAvatar("");
    localStorage.removeItem("token");
    localStorage.removeItem("displayName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userAvatar");
  };

  const value = {
    token,
    displayName,
    userRole,
    userAvatar,
    saveToken,
    saveDisplayName,
    saveUserRole,
    saveUserAvatar,
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
