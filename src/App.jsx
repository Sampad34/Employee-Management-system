import React, { useContext, useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/dashboard/EmployeeDashboard";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import { AuthContext } from "./context/AuthContext";
import Header from "./components/others/Header";
import { Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [userData] = useContext(AuthContext);

  // ✅ Load user from localStorage on mount
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const allEmployees = JSON.parse(localStorage.getItem("userData") || "[]");

    if (loggedInUser) {
      const parsed = JSON.parse(loggedInUser);
      setUser(parsed.role);

      if (parsed.role === "employee") {
        const freshEmployee = allEmployees.find(
          (emp) => emp.email === parsed.data.email
        );
        if (freshEmployee) {
          setLoggedInUserData(freshEmployee);
        }
      }
    }
  }, []);

  // ✅ Sync logged-in employee data when userData updates
  useEffect(() => {
    if (user === "employee" && loggedInUserData?.email) {
      const updatedEmployee = userData.find(
        (emp) => emp.email === loggedInUserData.email
      );
      if (updatedEmployee) {
        setLoggedInUserData(updatedEmployee);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ role: "employee", data: updatedEmployee })
        );
      }
    }
  }, [user, userData, loggedInUserData?.email]);

  // ✅ Login handler
  const handleLogin = (email, password) => {
    if (email === "admin@me.com" && password === "123") {
      setUser("admin");
      localStorage.setItem("loggedInUser", JSON.stringify({ role: "admin" }));
    } else if (userData) {
      const employee = userData.find(
        (e) => e.email === email && e.password === password
      );
      if (employee) {
        setUser("employee");
        setLoggedInUserData(employee);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ role: "employee", data: employee })
        );
      } else {
        alert("Invalid Credentials");
      }
    }
  };

  return (
    <>
      {!user ? (
        <Login handleLogin={handleLogin} />
      ) : (
        <>
          <Header
            userData={loggedInUserData}
            changeUser={setUser}
            role={user}
          />

          <Routes>
            {user === "admin" && (
              <>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/employee/:id" element={<ProfilePage />} />
              </>
            )}
            {user === "employee" && (
              <Route
                path="/"
                element={<EmployeeDashboard data={loggedInUserData} />}
              />
            )}
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
