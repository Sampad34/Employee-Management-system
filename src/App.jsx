import React, { useContext, useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import EmployeeDashboard from "./components/dashboard/EmployeeDashboard";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import { AuthContext } from "./context/AuthContext";
import Header from "./components/others/Header";
import Footer from "./components/others/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [userData] = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(true);

  // ✅ Load user from localStorage on mount
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const allEmployees = JSON.parse(localStorage.getItem("userData") || "[]");

    if (loggedInUser && loggedInUser !== "undefined") {
      try {
        const parsed = JSON.parse(loggedInUser);
        if (parsed.role) {
          setUser(parsed.role);
          
          if (parsed.role === "employee" && parsed.data) {
            const freshEmployee = allEmployees.find(
              (emp) => emp.email === parsed.data.email
            );
            if (freshEmployee) {
              setLoggedInUserData(freshEmployee);
            } else {
              setLoggedInUserData(parsed.data);
            }
          }
        }
      } catch (e) {
        console.error("Error parsing loggedInUser:", e);
        localStorage.setItem("loggedInUser", "");
      }
    }
  }, []);

  // ✅ Sync logged-in employee data when userData updates
  useEffect(() => {
    if (user === "employee" && loggedInUserData?.email && userData.length > 0) {
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
      return true;
    } else if (userData && userData.length > 0) {
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
        return true;
      }
    }
    return false;
  };

  // ✅ Register handler
  const handleRegister = (firstName, lastName, email, password) => {
    const existingUser = userData.find((e) => e.email === email);
    if (existingUser) {
      return false;
    }

    const newEmployee = {
      id: userData.length + 1,
      firstName,
      lastName,
      email,
      password,
      taskCounts: {
        active: 0,
        newTask: 0,
        completed: 0,
        failed: 0
      },
      tasks: []
    };

    const updatedUserData = [...userData, newEmployee];
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    
    // Auto login after registration
    setUser("employee");
    setLoggedInUserData(newEmployee);
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({ role: "employee", data: newEmployee })
    );
    
    return true;
  };

  const handleLogout = () => {
    setUser(null);
    setLoggedInUserData(null);
    localStorage.setItem("loggedInUser", "");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {!user ? (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-6xl mx-auto">
            {showLogin ? (
              <Login 
                handleLogin={handleLogin} 
                onSwitchToRegister={() => setShowLogin(false)}
              />
            ) : (
              <Register 
                handleRegister={handleRegister}
                onSwitchToLogin={() => setShowLogin(true)}
              />
            )}
          </div>
        </div>
      ) : (
        <>
          <Header
            userData={loggedInUserData}
            changeUser={handleLogout}
            role={user}
          />
          
          <main className="container mx-auto px-4 py-8">
            <Routes>
              {user === "admin" && (
                <>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/employee/:id" element={<ProfilePage />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </>
              )}
              {user === "employee" && (
                <>
                  <Route
                    path="/"
                    element={<EmployeeDashboard data={loggedInUserData} />}
                  />
                  <Route path="*" element={<Navigate to="/" />} />
                </>
              )}
            </Routes>
          </main>
          
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;