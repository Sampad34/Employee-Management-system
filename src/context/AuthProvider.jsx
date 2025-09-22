import React, { useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Set initial employees/admin if not in localStorage
    const localData = getLocalStorage();
    if (!localData || !localData.employees || localData.employees.length === 0) {
      setLocalStorage();
    }

    // ✅ Prefer loading from 'userData' if exists, else 'employees'
    const userDataFromStorage = JSON.parse(localStorage.getItem("userData"));
    if (userDataFromStorage && userDataFromStorage.length > 0) {
      setUserData(userDataFromStorage);
    } else {
      const { employees } = getLocalStorage();
      setUserData(employees || []);
    }
  }, []);

  useEffect(() => {
    if (userData && userData.length > 0) {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);

  return (
    <AuthContext.Provider value={[userData, setUserData]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
